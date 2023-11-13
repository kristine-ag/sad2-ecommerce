const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const salt = 10;
const { dbConnection } = require("./db.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
});

app.use(express.static("public"));
app.use(
  session({
    name: "customerAccountId",
    secret: "N4EMAKGIL",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

function checkAuthentication(req, res, next) {
  if (req.session.customerAccountId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

//PRODUCTS
app.get("/featuredproduct", async (req, res) => {
  try {
    const featuredProductId = "100";

    const query = "SELECT * FROM product WHERE product_id = ?";
    const [rows] = await dbConnection
      .promise()
      .execute(query, [featuredProductId]);

    const featuredProduct = rows[0];

    res.json(featuredProduct);
  } catch (error) {
    console.error("Error fetching featured product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/newproducts", async (req, res) => {
  try {
    const query = `
      SELECT * FROM product
      ORDER BY product_createdAt DESC
      LIMIT 3;
    `;

    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching products from MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ newProducts: results });
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/shop", async (req, res) => {
  try {
    const query = `
      SELECT * FROM product;
    `;

    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching products from MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ allProducts: results });
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const query = `
      SELECT * FROM product
      WHERE product_id = ?;
    `;

    dbConnection.query(query, [productId], (err, results) => {
      if (err) {
        console.error("Error fetching product from MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json({ product: results[0] });
      }
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//CART
app.post("/addtocart/:product_id", checkAuthentication, async (req, res) => {
  try {
    console.log("Received data from the frontend:", req.body);

    const productId = req.params.product_id;
    console.log("Received product from the frontend:", req.params.product_id);

    const customerAccountId = req.session.customerAccountId;
    console.log("Received customer from the frontend:", customerAccountId);

    const {
      quantity,
      selectedChain,
      selectedChainLength,
      customTextFront,
      customTextBack,
      selectedFont,
    } = req.body;

    if (
      quantity !== undefined &&
      selectedChain !== undefined &&
      selectedChainLength !== undefined &&
      customTextFront !== undefined &&
      customTextBack !== undefined &&
      selectedFont !== undefined
    ) {
      const salesOrderId = req.session.customerSalesOrderId;

      const getProductQuery =
        "SELECT product_unitPrice FROM product WHERE product_id = ?";
      const [productRows] = await dbConnection
        .promise()
        .execute(getProductQuery, [productId]);
      const unitPrice = productRows[0].product_unitPrice;

      const checkIfProductInCartQuery = `
        SELECT so_item_id, so_item_quantity
        FROM sales_order_item
        WHERE so_id_fk = ? AND product_id_fk = ?;
      `;

      const [cartRows] = await dbConnection
        .promise()
        .execute(checkIfProductInCartQuery, [salesOrderId, productId]);

      if (cartRows.length === 0) {
        const insertItemQuery = `
          INSERT INTO sales_order_item (so_item_quantity, so_item_unitPrice, so_item_jewelryChain, so_item_jewelryLength, so_item_jewelryTextFront, so_item_jewelryTextBack, so_item_jewelryFont, so_id_fk, product_id_fk)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        await dbConnection
          .promise()
          .execute(insertItemQuery, [
            quantity,
            unitPrice,
            selectedChain,
            selectedChainLength,
            customTextFront,
            customTextBack,
            selectedFont,
            salesOrderId,
            productId,
          ]);

        const updateTotalAmountQuery = `
          UPDATE sales_order
          SET so_totalAmount = (
            SELECT SUM(so_item_quantity * so_item_unitPrice) 
            FROM sales_order_item 
            WHERE so_id_fk = ?
          )
          WHERE so_id = ?;
        `;

        await dbConnection
          .promise()
          .execute(updateTotalAmountQuery, [salesOrderId, salesOrderId]);

        const updateOrderDateQuery = `
          UPDATE sales_order
          SET so_orderDate = NOW()
          WHERE so_id = ?;
        `;

        await dbConnection
          .promise()
          .execute(updateOrderDateQuery, [salesOrderId]);
      } else {
        const currentQuantity = cartRows[0].so_item_quantity;
        const updateItemQuery = `
          UPDATE sales_order_item
          SET so_item_quantity = ?
          WHERE so_item_id = ?;
        `;

        await dbConnection
          .promise()
          .execute(updateItemQuery, [
            currentQuantity + 1,
            cartRows[0].so_item_id,
          ]);

        const updateTotalAmountQuery = `
          UPDATE sales_order
          SET so_totalAmount = (
            SELECT SUM(so_item_quantity * so_item_unitPrice) 
            FROM sales_order_item 
            WHERE so_id_fk = ?
          )
          WHERE so_id = ?;
        `;

        await dbConnection
          .promise()
          .execute(updateTotalAmountQuery, [salesOrderId, salesOrderId]);

        const updateOrderDateQuery = `
          UPDATE sales_order
          SET so_orderDate = NOW()
          WHERE so_id = ?;
        `;

        await dbConnection
          .promise()
          .execute(updateOrderDateQuery, [salesOrderId]);
      }

      res.status(200).json({ message: "Product added to cart successfully" });
    } else {
      console.error("One or more values are undefined.");
      res.status(400).json({ error: "One or more values are missing." });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete(
  "/removefromcart/:so_item_id",
  checkAuthentication,
  async (req, res) => {
    try {
      const itemId = req.params.so_item_id;
      console.log(
        "Received request to remove item with itemId:",
        req.params.so_item_id
      );

      const checkIfItemInCartQuery = `
      SELECT so_item_id, so_item_quantity
      FROM sales_order_item
      WHERE so_item_id = ?;
    `;

      const [cartRows] = await dbConnection
        .promise()
        .execute(checkIfItemInCartQuery, [itemId]);

      if (cartRows.length === 0) {
        // Item not found in the cart
        console.log("Item not found in the cart:", itemId);
        res.status(404).json({ error: "Item not found in the cart." });
      } else {
        const currentQuantity = cartRows[0].so_item_quantity;

        if (currentQuantity === 1) {
          // If the quantity is 1, remove the item from the cart
          const removeItemQuery = `
          DELETE FROM sales_order_item
          WHERE so_item_id = ?;
        `;

          await dbConnection.promise().execute(removeItemQuery, [itemId]);
        } else {
          // If the quantity is more than 1, decrement the quantity
          const updateItemQuery = `
          UPDATE sales_order_item
          SET so_item_quantity = ?
          WHERE so_item_id = ?;
        `;

          await dbConnection
            .promise()
            .execute(updateItemQuery, [currentQuantity - 1, itemId]);
        }

        res
          .status(200)
          .json({ message: "Item removed from cart successfully" });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);

app.put(
  "/addquantitytocart/:so_item_id",
  checkAuthentication,
  async (req, res) => {
    try {
      const itemId = req.params.so_item_id;
      console.log(
        "Received request to increment quantity for item with itemId:",
        itemId
      );

      const incrementQuantityQuery = `
      UPDATE sales_order_item
      SET so_item_quantity = so_item_quantity + 1
      WHERE so_item_id = ?;
    `;

      await dbConnection.promise().execute(incrementQuantityQuery, [itemId]);

      res.status(200).json({ message: "Quantity incremented successfully" });
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);

app.get("/cart", async (req, res) => {
  try {
    const customerId = req.session.customerAccountId || null;

    const getCartDetailsQuery = `
    SELECT 
      p.product_id, 
      p.product_name, 
      p.product_image, 
      p.product_unitPrice,
      soi.so_item_id,
      soi.so_item_quantity, 
      soi.so_item_jewelryChain, 
      soi.so_item_jewelryLength, 
      soi.so_item_jewelryTextFront,
      soi.so_item_jewelryTextBack,
      soi.so_item_jewelryFont
    FROM product AS p
    JOIN sales_order_item AS soi ON p.product_id = soi.product_id_fk
    JOIN sales_order AS so ON soi.so_id_fk = so.so_id
    WHERE so.customer_account_id_fk = ? AND so.so_orderStatus = 'In Progress';
  `;

    const [cartRows] = await dbConnection
      .promise()
      .execute(getCartDetailsQuery, [customerId]);

    if (cartRows.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(cartRows);
    console.log("Fetched cart details from MySQL:", cartRows);
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cart", async (req, res) => {
  const { ids } = req.body;

  try {
    const productDetailsPromises = ids.map(async (productId) => {
      const getProductQuery = `
        SELECT 
          p.product_id, 
          p.product_name, 
          p.product_image, 
          p.product_unitPrice,
          soi.so_item_id,
          soi.so_item_quantity, 
          soi.so_item_jewelryChain, 
          soi.so_item_jewelryLength, 
          soi.so_item_jewelryTextFront,
          soi.so_item_jewelryTextBack,
          soi.so_item_jewelryFont
        FROM product AS p
        JOIN sales_order_item AS soi ON p.product_id = soi.product_id_fk
        WHERE p.product_id = ?;
      `;

      const [productRows] = await dbConnection
        .promise()
        .execute(getProductQuery, [productId]);

      return productRows[0];
    });

    const products = await Promise.all(productDetailsPromises);

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    const updateTotalAmountQuery = `
    UPDATE sales_order
    SET so_totalAmount = (
      SELECT SUM(so_item_quantity * so_item_unitPrice) 
      FROM sales_order_item 
      WHERE so_id_fk = ?
    )
    WHERE so_id = ? AND so_orderStatus = 'In Progress';
  `;

    const salesOrderId = req.session.customerSalesOrderId;
    await dbConnection
      .promise()
      .execute(updateTotalAmountQuery, [salesOrderId, salesOrderId]);

    console.log("Fetched cart details from MySQL:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updatecarttotal", checkAuthentication, async (req, res) => {
  try {
    const salesOrderId = req.session.customerSalesOrderId;

    const getCartDetailsQuery = `
      SELECT so_item_quantity, so_item_unitPrice
      FROM sales_order_item
      WHERE so_id_fk = ?;
    `;
    const [cartRows] = await dbConnection
      .promise()
      .execute(getCartDetailsQuery, [salesOrderId]);

    const totalAmount = cartRows.reduce((acc, item) => {
      return acc + item.so_item_quantity * item.so_item_unitPrice;
    }, 0);

    const updateTotalAmountQuery = `
      UPDATE sales_order
      SET so_totalAmount = ?
      WHERE so_id = ?;
    `;
    await dbConnection
      .promise()
      .execute(updateTotalAmountQuery, [totalAmount, salesOrderId]);

    res.status(200).json({ message: "Cart total updated successfully" });
  } catch (error) {
    console.error("Error updating cart total:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

//CHECKOUT
app.post("/checkout", checkAuthentication, async (req, res) => {
  try {
    console.log("Received data from the frontend:", req.body);

    const customerAccountId = req.session.customerAccountId;
    console.log("Received customer from the frontend:", customerAccountId);

    const {
      firstName,
      lastName,
      email,
      contactNum,
      streetAddress,
      streetAddressTwo,
      city,
      province,
      zip,
      notes,
      shippingMethod,
      paymentMethod,
      grandTotal,
    } = req.body;

    // No discount code yet

    await dbConnection.promise().beginTransaction();

    const insertAddressQuery = `
      INSERT INTO shipping_address (
        shipping_address_firstName,
        shipping_address_lastName,
        shipping_address_emailAddress,
        shipping_address_contactNum,
        shipping_address_streetOne,
        shipping_address_streetTwo,
        shipping_address_city,
        shipping_address_province,
        shipping_address_zipCode,
        customer_account_id_fk
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [shippingAddressRows] = await dbConnection
      .promise()
      .execute(insertAddressQuery, [
        firstName,
        lastName,
        email,
        contactNum,
        streetAddress,
        streetAddressTwo,
        city,
        province,
        zip,
        customerAccountId,
      ]);

    const shippingAddressId = shippingAddressRows.insertId;

    const checkOrderQuery = `
      SELECT so_id
      FROM sales_order
      WHERE customer_account_id_fk = ?
        AND so_orderStatus = 'In Progress';
    `;

    const [existingOrderRows] = await dbConnection
      .promise()
      .execute(checkOrderQuery, [customerAccountId]);

    let salesOrderId;

    if (existingOrderRows.length > 0) {
      salesOrderId = existingOrderRows[0].so_id;
    } else {
      const createOrderQuery = `
      INSERT INTO sales_order (
        so_orderDate,
        so_totalAmount,
        so_paymentMethod,
        so_paymentStatus,
        so_orderStatus,
        so_orderNotes,
        customer_account_id_fk
      ) VALUES (NOW(), 0, NULL, NULL, 'In Progress', NULL, ?);
    `;

      const [createResult] = await dbConnection
        .promise()
        .execute(createOrderQuery, [customerAccountId]);

      salesOrderId = createResult.insertId;
    }

    const insertShippingQuery = `
      INSERT INTO shipping (
        shipping_method,
        shipping_address_id_fk,
        so_id_fk
      ) VALUES (?, ?, ?);
    `;

    const [shippingRows] = await dbConnection
      .promise()
      .execute(insertShippingQuery, [
        shippingMethod,
        shippingAddressId,
        salesOrderId,
      ]);

    const shippingId = shippingRows.insertId;

    const updateOrderQuery = `
    UPDATE sales_order
    SET
      so_totalAmount = ?,
      so_paymentMethod = ?,
      so_paymentStatus = 'Pending',
      so_orderNotes = ?,
      shipping_id_fk = ?
    WHERE so_id = ?;
  `;

    await dbConnection
      .promise()
      .execute(updateOrderQuery, [
        grandTotal,
        paymentMethod,
        notes,
        shippingId,
        salesOrderId,
      ]);

    const updateStatusQuery = `
      UPDATE sales_order
      SET so_orderStatus = 'Processing'
      WHERE so_id = ?;
    `;

    await dbConnection.promise().execute(updateStatusQuery, [salesOrderId]);

    const updateOrderDateQuery = `
    UPDATE sales_order
    SET so_orderDate = NOW()
    WHERE so_id = ?;
  `;

    await dbConnection.promise().execute(updateOrderDateQuery, [salesOrderId]);

    // Commit the transaction
    await dbConnection.promise().commit();

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    // Rollback the transaction in case of an error
    await dbConnection.promise().rollback();

    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//CUSTOMERS
app.post("/register", (req, res) => {
  const query =
    "INSERT into customer_account (`customer_account_firstName`, `customer_account_lastName`, `customer_account_emailAddress`, `customer_account_username`, `customer_account_password`) VALUES (?)";
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.username,
      hash,
    ];

    dbConnection.query(query, [values], (err, results) => {
      if (err) {
        console.error("Error inserting customer account in MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Customer added successfully:");
        res.status(200).json(results);
      }
    });
  });
});

app.get("/login", (req, res) => {
  if (req.session.customerAccountId) {
    res.send({ loggedIn: true, customerId: req.session.customerAccountId });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const query =
    "SELECT * FROM customer_account WHERE customer_account_emailAddress = ?";
  dbConnection.query(query, [req.body.email], (err, results) => {
    if (err) {
      console.error("Error fetching customer account in MySQL:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        results[0].customer_account_password,
        (err, response) => {
          if (err) {
            return res.status(500).json({ error: "Error in Password" });
          }
          if (response) {
            // Check if there is an open sales order with status 'In Progress'
            const checkSalesOrderQuery = `
              SELECT so_id
              FROM sales_order
              WHERE customer_account_id_fk = ?
                AND so_orderStatus = 'In Progress';
            `;

            dbConnection.query(
              checkSalesOrderQuery,
              [results[0].customer_account_id],
              (err, orderRows) => {
                if (err) {
                  console.error("Error checking open sales order:", err);
                  return res
                    .status(500)
                    .json({ error: "Internal server error" });
                }

                if (orderRows.length > 0) {
                  // If an open sales order exists, use its ID
                  req.session.customerSalesOrderId = orderRows[0].so_id;
                  // Continue with the login process and return a success response
                  req.session.customerAccountId =
                    results[0].customer_account_id;
                  res.json({
                    Login: true,
                    customerId: results[0].customer_account_id,
                  });
                } else {
                  // If no open sales order exists, create a new one
                  const createOrderQuery = `
                    INSERT INTO sales_order (so_orderDate, so_totalAmount, so_paymentMethod, so_paymentStatus, so_orderStatus, so_orderNotes, customer_account_id_fk)
                    VALUES (NOW(), ?, NULL, NULL, 'In Progress', NULL, ?);
                  `;

                  dbConnection.query(
                    createOrderQuery,
                    [0, results[0].customer_account_id],
                    (err, createResult) => {
                      if (err) {
                        console.error("Error creating a new sales order:", err);
                        return res
                          .status(500)
                          .json({ error: "Internal server error" });
                      }

                      // Set the new sales order ID in the session for this customer
                      req.session.customerSalesOrderId = createResult.insertId;

                      // Continue with the login process and return a success response
                      req.session.customerAccountId =
                        results[0].customer_account_id;
                      res.json({
                        Login: true,
                        customerId: results[0].customer_account_id,
                      });
                    }
                  );
                }
              }
            );
          } else {
            return res.json({ Login: false });
          }
        }
      );
    } else {
      return res.status(404).json({ error: "No matching records found" });
    }
  });
});

app.get("/account", (req, res) => {
  console.log(req.session.customerAccountId);

  if (req.session.customerAccountId) {
    const query = `
      SELECT customer_account_firstName, customer_account_lastName, customer_account_emailAddress, 
      customer_account_username,
      customer_account_password
      FROM customer_account
      WHERE customer_account_id = ?; 
    `;

    dbConnection.query(
      query,
      [req.session.customerAccountId],
      (err, results) => {
        if (err) {
          console.error("Error fetching user data in MySQL:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length > 0) {
          const userData = results[0];
          return res.json({ valid: true, ...userData });
        } else {
          return res.json({ valid: false });
        }
      }
    );
  } else {
    return res.json({ valid: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ error: "Error logging out" });
    }
    return res.json({ loggedOut: true });
  });
});

app.listen(8082, () => {
  console.log("Listening on port 8082");
});
