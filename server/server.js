const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const { dbConnection } = require("./db.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// PRODUCTS
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM product";
  dbConnection.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/products/add/upload", upload.array("file", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const uploadedImages = req.files.map((file) => file.filename);
  return res.json({ message: "Images uploaded", images: uploadedImages });
});

app.post("/products", (req, res) => {
  const {
    product_name,
    product_description,
    product_category_id_fk,
    product_unitPrice,
    product_stockQuantity,
    product_status,
    productImages,
    product_createdAt,
  } = req.body;

  const sql = `
    INSERT INTO product (
      product_name,
      product_description,
      product_category_id_fk,
      product_unitPrice,
      product_stockQuantity,
      product_status,
      product_image,
      product_createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    product_name,
    product_description,
    product_category_id_fk,
    product_unitPrice,
    product_stockQuantity,
    product_status,
    productImages,
    product_createdAt,
  ];

  dbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting product into the database:", err);
      return res.status(500).json({ message: "Error" });
    }

    return res.json({ message: "Product and images added successfully" });
  });
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM product WHERE `product_id` = ?";
  dbConnection.query(sql, [productId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been deleted successfully.");
  });
});

app.delete("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "public/images", filename);

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json({ message: "Image deleted successfully" });
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "SELECT * FROM product WHERE `product_id` = ?";

  dbConnection.query(sql, [productId], (err, data) => {
    if (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(data[0]);
  });
});

app.put("/products/update/:id", (req, res) => {
  const productId = req.params.id;
  const {
    productName,
    productImages,
    productDescription,
    productUnitPrice,
    productStockQuantity,
    productStatus,
    productCategoryId,
    productCreatedAt,
  } = req.body;

  const sql = `
      UPDATE product
      SET
        product_name = ?,
        product_image = ?,
        product_category_id_fk = ?,
        product_description = ?,
        product_unitPrice = ?,
        product_stockQuantity = ?,
        product_status = ?,
        product_createdAt = ?
      WHERE product_id = ?
    `;

  const values = [
    productName,
    productImages,
    productCategoryId,
    productDescription,
    productUnitPrice,
    productStockQuantity,
    productStatus,
    productCreatedAt,
    productId,
  ];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json("Product has been updated successfully.");
  });
});

// SUPPLIERS
app.get("/suppliers", (req, res) => {
  const sql = "SELECT * FROM supplier";
  dbConnection.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/suppliers", (req, res) => {
  const sql =
    "INSERT INTO supplier (`supplier_name`, `supplier_contactPerson`, `supplier_contactNumber`, `supplier_emailAddress`, `supplier_shippingAddress`) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.supplier_name,
    req.body.supplier_contactPerson,
    req.body.supplier_contactNumber,
    req.body.supplier_contactNumber,
    req.body.supplier_shippingAddress,
  ];
  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.delete("/suppliers/:id", (req, res) => {
  const supplierId = req.params.id;
  const sql = "DELETE FROM supplier WHERE `supplier_id` = ?";
  dbConnection.query(sql, [supplierId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Supplier has been deleted successfully.");
  });
});

app.get("/suppliers/:id", (req, res) => {
  const supplierId = req.params.id;
  const sql = "SELECT * FROM supplier WHERE `supplier_id` = ?";

  dbConnection.query(sql, [supplierId], (err, data) => {
    if (err) {
      console.error("Error fetching supplier:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(data[0]);
  });
});

app.put("/suppliers/update/:id", (req, res) => {
  const supplierId = req.params.id;
  const {
    supplierName,
    supplierContactPerson,
    supplierContactNumber,
    supplierEmailAddress,
    supplierShippingAddress,
  } = req.body;

  const sql = `
      UPDATE supplier
      SET
      supplier_name = ?,
      supplier_contactPerson = ?,
      supplier_contactNumber = ?,
      supplier_emailAddress = ?,
      supplier_shippingAddress = ?
      WHERE supplier_id = ?
    `;
  const values = [
    supplierName,
    supplierContactPerson,
    supplierContactNumber,
    supplierEmailAddress,
    supplierShippingAddress,
    supplierId,
  ];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating supplier:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json("Supplier has been updated successfully.");
  });
});

// CATEGORIES
app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM product_category";
  dbConnection.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

app.post("/categories", (req, res) => {
  const { product_category_name } = req.body;
  const sql =
    "INSERT INTO product_category (`product_category_name`) VALUES (?)";
  const values = [product_category_name];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

app.put("/categories/:id", (req, res) => {
  const categoryId = req.params.id;
  const { product_category_name } = req.body;
  const sql =
    "UPDATE product_category SET `product_category_name` = ? WHERE `product_category_id` = ?";
  const values = [product_category_name, categoryId];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating category:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

app.delete("/categories/:id", (req, res) => {
  const categoryId = req.params.id;
  const sql = "DELETE FROM product_category WHERE `product_category_id` = ?";

  dbConnection.query(sql, [categoryId], (err, data) => {
    if (err) {
      console.error("Error deleting category:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

// PURCHASE ORDERS
app.get("/purchaseorders", (req, res) => {
  const sql = `
    SELECT
      po.po_id,
      po.po_orderDate,
      po.po_deliveryDate,
      po.po_totalAmount,
      s.supplier_name
    FROM purchase_order AS po
    LEFT JOIN supplier AS s ON po.supplier_id_fk = s.supplier_id
  `;
  dbConnection.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/purchaseorders", (req, res) => {
  const sql =
    "INSERT INTO purchase_order (`po_orderDate`, `po_deliveryDate`, `po_totalAmount`, `supplier_id_fk`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.po_orderDate,
    req.body.po_deliveryDate,
    req.body.po_totalAmount,
    req.body.supplier_id_fk, // Include supplier_id_fk
  ];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.delete("/purchaseorders/:id", (req, res) => {
  const purchaseOrderId = req.params.id;
  const sql = "DELETE FROM purchase_order WHERE `po_id` = ?";
  dbConnection.query(sql, [purchaseOrderId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Purchase Order has been deleted successfully.");
  });
});

app.get("/purchaseorders/:id", (req, res) => {
  const purchaseOrderId = req.params.id;
  const sql = "SELECT * FROM purchase_order WHERE `po_id` = ?";

  dbConnection.query(sql, [purchaseOrderId], (err, data) => {
    if (err) {
      console.error("Error fetching purchase order:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Purchase Order not found" });
    }
    res.json(data[0]);
  });
});

app.put("/purchaseorders/update/:id", (req, res) => {
  const purchaseOrderId = req.params.id;
  const {
    purchaseOrderDate,
    purchaseOrderDeliveryDate,
    purchaseOrderTotalAmount,
  } = req.body;

  const sql = `
  UPDATE purchase_order
  SET
  po_orderDate = ?,
  po_deliveryDate = ?,
  po_totalAmount = ?
  WHERE po_id = ?
`;
  const values = [
    purchaseOrderDate,
    purchaseOrderDeliveryDate,
    purchaseOrderTotalAmount,
    purchaseOrderId,
  ];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating purchase order:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json("Purchase Order has been updated successfully.");
  });
});

// REWARDS
app.get("/rewards", (req, res) => {
  const sql = "SELECT * FROM rewards";
  dbConnection.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/rewards", (req, res) => {
  const sql =
    "INSERT INTO rewards (`rewards_name`, `rewards_type`, `rewards_validFrom`, `rewards_validUntil`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.rewards_name,
    req.body.rewards_type,
    req.body.rewards_validFrom,
    req.body.rewards_validUntil,
  ];
  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.delete("/rewards/:id", (req, res) => {
  const rewardsId = req.params.id;
  const sql = "DELETE FROM rewards WHERE `rewards_id` = ?";
  dbConnection.query(sql, [rewardsId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Reward has been deleted successfully.");
  });
});

app.get("/rewards/:id", (req, res) => {
  const rewardsId = req.params.id;
  const sql = "SELECT * FROM rewards WHERE `rewards_id` = ?";

  dbConnection.query(sql, [rewardsId], (err, data) => {
    if (err) {
      console.error("Error fetching rewards:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Rewards not found" });
    }
    res.json(data[0]);
  });
});

app.put("/rewards/update/:id", (req, res) => {
  const rewardsId = req.params.id;
  const { rewardsName, rewardsType, rewardsValidFrom, rewardsValidUntil } =
    req.body;

  const sql = `
    UPDATE rewards
    SET
    rewards_name = ?,
    rewards_type = ?,
    rewards_validFrom = ?,
    rewards_validUntil = ?
    WHERE rewards_id = ?
  `;
  const values = [
    rewardsName,
    rewardsType,
    rewardsValidFrom,
    rewardsValidUntil,
    rewardsId,
  ];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating reward:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json("Reward has been updated successfully.");
  });
});

// CUSTOMERS
app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customer_account";
  dbConnection.query(sql, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/customers", (req, res) => {
  const sql =
    "INSERT INTO customer_account (`customer_account_firstName`, `customer_account_lastName`, `customer_account_emailAddress`, `customer_account_username`, `customer_account_password`) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.customer_account_firstName,
    req.body.customer_account_lastName,
    req.body.customer_account_emailAddress,
    req.body.customer_account_username,
    req.body.customer_account_password,
  ];
  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.delete("/customers/:id", (req, res) => {
  const customersId = req.params.id;
  const sql = "DELETE FROM customer_account WHERE `customer_account_id` = ?";
  dbConnection.query(sql, [customersId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Customer has been deleted successfully.");
  });
});

app.get("/customers/:id", (req, res) => {
  const customersId = req.params.id;
  const sql = "SELECT * FROM customer_account WHERE `customer_account_id` = ?";

  dbConnection.query(sql, [customersId], (err, data) => {
    if (err) {
      console.error("Error fetching customers:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Customers not found" });
    }
    res.json(data[0]);
  });
});

app.put("/customers/update/:id", (req, res) => {
  const customersId = req.params.id;
  const {
    customerFirstName,
    customerLastName,
    customerEmailAddress,
    customerUsername,
    customerPassword,
  } = req.body;

  const sql = `
    UPDATE customer_account
    SET
    customer_account_firstName = ?,
    customer_account_lastName = ?,
    customer_account_emailAddress = ?,
    customer_account_username = ?,
    customer_account_password = ?
    WHERE customer_account_id = ?
  `;
  const values = [
    customerFirstName,
    customerLastName,
    customerEmailAddress,
    customerUsername,
    customerPassword,
    customersId,
  ];

  dbConnection.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating customer:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json("Customer has been updated successfully.");
  });
});

//ORDERS
app.get("/orders", (req, res) => {
  const query = `
    SELECT
      so.*,
      soi.*,
      p.*,
      sh.*,
      sa.*
    FROM sales_order AS so
    JOIN sales_order_item AS soi ON so.so_id = soi.so_id_fk
    JOIN product AS p ON soi.product_id_fk = p.product_id
    JOIN shipping AS sh ON so.shipping_id_fk = sh.shipping_id
    JOIN shipping_address AS sa ON sh.shipping_address_id_fk = sa.shipping_address_id;
  `;

  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/orders/:id", (req, res) => {
  const salesOrderId = req.params.id;

  const query = `
    SELECT
      so.*,
      soi.*,
      p.*,
      sh.*,
      sa.*
    FROM sales_order AS so
    JOIN sales_order_item AS soi ON so.so_id = soi.so_id_fk
    JOIN product AS p ON soi.product_id_fk = p.product_id
    JOIN shipping AS sh ON so.shipping_id_fk = sh.shipping_id
    JOIN shipping_address AS sa ON sh.shipping_address_id_fk = sa.shipping_address_id
    WHERE so.so_id = ?;
  `;

  dbConnection.query(query, [salesOrderId], (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/orders/:id", (req, res) => {
  const ordersId = req.params.id;
  const sql = "SELECT * FROM sales_order WHERE `so_id` = ?";

  dbConnection.query(sql, [ordersId], (err, data) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Customers not found" });
    }
    res.json(data[0]);
  });
});

app.listen(8081, () => {
  console.log("Listening");
});
