import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-bottom: 100px;
`;

const ColumnsWrapper = styled.div`
  gap: 20px;
  margin-top: 40px;
  text-align: center;
`;

const Box = styled.div`
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #fbff54;
  background-color: #fff;
  text-transform: uppercase;
  color: #000;
  width: 800px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductImageBox = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 130px;
    max-height: 130px;
    border-radius: 10px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const QuantityDetail = styled.div`
  display: flex;
  align-items: center;
`;

const Subtotal = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
`;

const CheckoutButton = styled(ButtonLink)`
  margin: 20px auto;
  display: block;
`;

const CustomDetail = styled.p`
  margin: 5px 0;
  font-size: 0.8em;
`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/cart`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      console.log("Removing item with itemId:", itemId);
      await axios.delete(`http://localhost:8082/removefromcart/${itemId}`);
      await axios.put("http://localhost:8082/updatecarttotal");
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const addQtyToCart = async (itemId) => {
    try {
      console.log("Incrementing quantity for item with itemId:", itemId);
      await axios.put(`http://localhost:8082/addquantitytocart/${itemId}`);
      await axios.put("http://localhost:8082/updatecarttotal");
      fetchCartItems();
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };
  function calculateTotalPrice(unitPrice, quantity) {
    return unitPrice * quantity;
  }

  function calculateSubtotal(items) {
    return items.reduce((acc, item) => {
      const totalPrice = calculateTotalPrice(
        item.product_unitPrice,
        item.so_item_quantity
      );
      return acc + totalPrice;
    }, 0);
  }

  return (
    <PageContainer>
      <ColumnsWrapper>
        <h1> Cart</h1>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <Box key={item.product_id} className="cart-item">
                  <ProductImageBox>
                    <img src={item.product_image} alt={item.product_name} />
                  </ProductImageBox>
                  <ProductInfo>
                    <h2>{item.product_name}</h2>
                    <CustomDetail>
                      Price: P{item.product_unitPrice}
                    </CustomDetail>
                    <CustomDetail>
                      Quantity: {item.so_item_quantity}
                    </CustomDetail>
                    <CustomDetail>
                      Chain: {item.so_item_jewelryChain}
                    </CustomDetail>
                    <CustomDetail>
                      Length: {item.so_item_jewelryLength}
                    </CustomDetail>
                    <CustomDetail>
                      Front Text: {item.so_item_jewelryTextFront}
                    </CustomDetail>
                    <CustomDetail>
                      Back Text: {item.so_item_jewelryTextBack}
                    </CustomDetail>
                    <CustomDetail>
                      Font: {item.so_item_jewelryFont}
                    </CustomDetail>
                  </ProductInfo>
                  <QuantityDetail>
                    <Button onClick={() => removeFromCart(item.so_item_id)}>
                      -
                    </Button>
                    <QuantityLabel>{item.so_item_quantity}</QuantityLabel>
                    <Button onClick={() => addQtyToCart(item.so_item_id)}>
                      +
                    </Button>
                  </QuantityDetail>
                  <p>
                    P
                    {calculateTotalPrice(
                      item.product_unitPrice,
                      item.so_item_quantity
                    ).toFixed(2)}
                  </p>
                </Box>
              ))}
              <Subtotal>
                SUBTOTAL: P{calculateSubtotal(cartItems).toFixed(2)}
              </Subtotal>{" "}
              <CheckoutButton
                to="/checkout"
                block
                primary
                size="l"
                type="submit"
              >
                Proceed to Checkout{" "}
              </CheckoutButton>
            </>
          )}
        </div>
      </ColumnsWrapper>
    </PageContainer>
  );
}
