import styled from "styled-components";
import Center from "../components/Center";
import ButtonLink from "../components/ButtonLink";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";

const StyledContainer = styled.div`
  background-color: #000;
  margin-bottom: 100px;
`;

const ColumnsWrapper = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  color: #fff;
`;

const Box = styled.div`
  padding: 2px;
  border-left: 0.01em dotted #fbff54;
`;

const BoxLeft = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the start */
  gap: 20px; /* Increase the gap between elements */
`;

const LeftContainerBox = styled.td`
  background-color: black;
  border: 2px solid #ea33f3;
  padding: 20px;
  border-radius: 4px;
  width: 100%;
`;

const TotalContainerBox = styled.td`
  display: flex;
  flex-direction: column;
  background-color: black;
  border-top: 0.01em dotted yellow;
  border-bottom: 0.01em dotted yellow;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10%;
  margin-right: auto;
  padding: 40px;
  width: 70%;
  gap: 20px;
`;

const TotalContainerBox1 = styled.td`
  display: flex;
  flex-direction: column;
  background-color: black;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 70%;

  margin-left: 10%;
  margin-right: auto;
  padding: 40px;
`;

const ContainerBox = styled.td`
  display: flex;
  margin-top: 20px;
`;

const ProductInfoCell = styled.td`
  display: flex;
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
`;

const ProductImageBox = styled.div`
  width: 200px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 10px;
  }
`;

const ProductDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  font-weight: 200;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ProductName = styled.div`
  font-weight: 600;
  text-transform: uppercase;
`;

const QuantityLabel = styled.span`
  display: inline;
  font-weight: 300;
  font-size: small;
  align-items: center;
`;

const PriceLabel = styled.span`
  font-weight: 600;å
  display: inline;
  font-size: small;
  text-align: center;
`;

const ApplyButton = styled.button`
  margin-left: 10px;
  background-color: black;
  color: yellow;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline;
`;

const LeftTitles = styled.div`
  background-color: black;
  color: yellow;
  font-weight: bold;
  font-size: small;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline;
`;

const TextInLeftContainerBox = styled.div`
  color: white;
  font-weight: 300;
  font-size: 12px;
  border: none;
  cursor: pointer;
  align-items: left;
  display: inline;
  width: 45%;
  margin-left: 10px;
`;

const TextInRightContainerBox = styled.div`
  color: white;
  font-weight: bold;
  margin-left: 45%;
  font-size: 12px;
  border: none;
  align-items: right;
  cursor: pointer;
  display: inline;
`;

const TextInCenterContainerBox = styled.div`
  color: white;
  font-weight: small;
  font-size: 12px;
  border: none;
  text-align: center;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
`;

const ProofOfPaymentText = styled.div`
  color: #ea33f3;
  display: inline;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 0px;
`;

const CheckoutInput = styled(Input)`
  margin-left: 20px;
  width: 100%;
  display: inline;
`;

const NameHolder = styled.div`
  display: flex;
  gap: 10px;
`;

const RadioHolder = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 10px;
`;

const Totals = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const TotalsHead = styled.div`
  font-size: small;
  color: grey;
`;

const TotalsPrice = styled.div`
  color: white;
  font-weight: 600;
  font-size: small;
`;

const OverallTotal = styled.div`
  color: white;
  font-weight: 700;
  font-size: medium;
`;

const InfoInput = styled(Input)`
  display: inline;
  width: 100%;
`;

const ChainRadioButton = styled.input`
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid #ea33f3;
  border-radius: 50%;
  outline: none;
  transition: 0.2s;
  display: inline;

  &:checked {
    background-color: #ea33f3;
    border: 2px solid #ea33f3;
  }
`;

const ButtonsBottom = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 100px;
`;

const ButtonBottomSyle = styled(ButtonLink)`
  font-size: small;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  display: inline;
`;

const ReturnButton = styled.div`
  border: 1px solid black;
  margin-left: 50px;
  margin-top: 10px;
`;

export default function CheckoutPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddressTwo, setStreetAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [discountcode, setDiscountCode] = useState("");

  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8082/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    try {
      const checkoutData = {
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
        grandTotal: grandTotal.toFixed(2),
      };

      // No discountcode yet

      const response = await axios.post(
        "http://localhost:8082/checkout",
        checkoutData
      );

      console.log(response.data.message);
      // Redirect to thank you page
    } catch (error) {
      console.error("Error during checkout:", error.response.data.error);
    }
  };

  function calculateTotalPrice(unitPrice, quantity) {
    return unitPrice * quantity;
  }

  function calculateSubtotal(items) {
    return items.reduce((acc, item) => {
      const quantityInCart = item.so_item_quantity;
      const totalPrice = calculateTotalPrice(
        item.product_unitPrice,
        quantityInCart
      );
      return acc + totalPrice;
    }, 0);
  }

  function getShippingFee(method) {
    switch (method) {
      case "Pickup":
        return 0;
      case "Delivery":
        return 70;
      case "Courier":
        return 160;
      default:
        return 0;
    }
  }

  function calculateGrandTotal() {
    const subtotal = calculateSubtotal(cartItems);
    const selectedShippingFee = getShippingFee(shippingMethod);
    return subtotal + selectedShippingFee;
  }

  useEffect(() => {
    const updatedGrandTotal = calculateGrandTotal();
    setGrandTotal(updatedGrandTotal);
  }, [cartItems, shippingMethod]);

  return (
    <>
      <div id="swup" className="transition-fade">
        <StyledContainer>
          <Center>
            <ColumnsWrapper>
              <BoxLeft>
                <h3>BILLING DETAILS</h3>
                {!!cartItems?.length && (
                  <form>
                    <NameHolder>
                      <LeftTitles>NAME:</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        name="firstName"
                        onChange={(ev) => setFirstName(ev.target.value)}
                      />
                      <InfoInput
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        name="lastName"
                        onChange={(ev) => setLastName(ev.target.value)}
                      />
                    </NameHolder>

                    <NameHolder>
                      <LeftTitles>EMAIL ADDRESS:</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder="@gmail.com"
                        value={email}
                        name="email"
                        onChange={(ev) => setEmail(ev.target.value)}
                      />

                      <LeftTitles>PHONE:</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder="(+63)"
                        value={contactNum}
                        name="contactNum"
                        onChange={(ev) => setContactNum(ev.target.value)}
                      />
                    </NameHolder>

                    <CityHolder>
                      <LeftTitles>STREET ADDRESS:</LeftTitles>
                      <InfoInput
                        type="textarea"
                        placeholder="House Number & Street Name"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={(ev) => setStreetAddress(ev.target.value)}
                      />
                      <InfoInput
                        type="textarea"
                        placeholder="Apartment, Suite, Unit, etc."
                        value={streetAddressTwo}
                        name="streetAddressTwo"
                        onChange={(ev) => setStreetAddressTwo(ev.target.value)}
                      />
                    </CityHolder>
                    <CityHolder>
                      <LeftTitles>CITY</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder=""
                        value={city}
                        name="city"
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <LeftTitles>PROVINCE:</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder=""
                        value={province}
                        name="province"
                        onChange={(ev) => setProvince(ev.target.value)}
                      />

                      <LeftTitles>ZIP CODE:</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder=""
                        value={zip}
                        name="zip"
                        onChange={(ev) => setZip(ev.target.value)}
                      />
                    </CityHolder>

                    <NameHolder>
                      <LeftTitles>ORDER NOTES:</LeftTitles>
                      <InfoInput
                        type="text"
                        placeholder="Notes about your order, e.g. special notes for delivery"
                        value={notes}
                        name="notes"
                        onChange={(ev) => setNotes(ev.target.value)}
                      />
                    </NameHolder>

                    <br />
                    <br />
                    <LeftTitles>DELIVERY/SHIPPING METHOD:</LeftTitles>

                    <ContainerBox>
                      <LeftContainerBox>
                        <RadioHolder>
                          <ChainRadioButton
                            type="radio"
                            value="Pickup"
                            name="shippingMethod"
                            onChange={(ev) =>
                              setShippingMethod(ev.target.value)
                            }
                          />{" "}
                          <TextInLeftContainerBox>
                            PICK-UP (AN ADDRESS WILL BE SENT TO YOU ON THE DAY
                            OF YOUR ORDER’S AVAILABILITY)
                          </TextInLeftContainerBox>
                          <TextInRightContainerBox>
                            FREE
                          </TextInRightContainerBox>
                        </RadioHolder>
                        <RadioHolder>
                          <ChainRadioButton
                            type="radio"
                            value="Delivery"
                            name="shippingMethod"
                            onChange={(ev) =>
                              setShippingMethod(ev.target.value)
                            }
                          />
                          <TextInLeftContainerBox>
                            DELIVERY (VIA GRAB)
                          </TextInLeftContainerBox>
                          <TextInRightContainerBox>
                            P70.00
                          </TextInRightContainerBox>
                        </RadioHolder>
                        <RadioHolder>
                          <ChainRadioButton
                            type="radio"
                            value="Courier"
                            name="shippingMethod"
                            onChange={(ev) =>
                              setShippingMethod(ev.target.value)
                            }
                          />
                          <TextInLeftContainerBox>
                            STANDARD SHIPPING (COURIER - OUTSIDE DAVAO CITY
                            ONLY)
                          </TextInLeftContainerBox>
                          <TextInRightContainerBox>
                            P160.00
                          </TextInRightContainerBox>
                        </RadioHolder>
                      </LeftContainerBox>
                    </ContainerBox>
                    <br />
                    <br />
                    <LeftTitles>PAYMENT OPTIONS:</LeftTitles>

                    <ContainerBox>
                      <LeftContainerBox>
                        <RadioHolder>
                          <ChainRadioButton
                            type="radio"
                            value="GCash"
                            name="paymentMethod"
                            onChange={(ev) => setPaymentMethod(ev.target.value)}
                          />{" "}
                          <TextInLeftContainerBox>GCASH</TextInLeftContainerBox>
                        </RadioHolder>
                        <TextInCenterContainerBox>
                          ONLINE TRANSFER / OVER-THE-COUNTER
                          <br />
                          AN***A M**E****Z
                          <br />
                          0923 293 7651
                          <br />
                          <br />
                          INSTRUCTIONS ON WHERE TO SEND{" "}
                          <ProofOfPaymentText>
                            PROOF OF PAYMENT
                          </ProofOfPaymentText>{" "}
                          WILL BE SENT VIA E-MAIL ONCE YOU HAVE COMPLETED THIS
                          ORDER. THANK YOU
                        </TextInCenterContainerBox>
                        <RadioHolder>
                          <ChainRadioButton
                            type="radio"
                            value="BPI"
                            name="paymentMethod"
                            onChange={(ev) => setPaymentMethod(ev.target.value)}
                          />
                          <TextInLeftContainerBox>BPI</TextInLeftContainerBox>
                        </RadioHolder>
                        <RadioHolder>
                          <ChainRadioButton
                            type="radio"
                            placeholder=""
                            value="COD"
                            name="paymentMethod"
                            onChange={(ev) => setPaymentMethod(ev.target.value)}
                          />
                          <TextInLeftContainerBox>COD</TextInLeftContainerBox>
                        </RadioHolder>
                      </LeftContainerBox>
                    </ContainerBox>
                  </form>
                )}
              </BoxLeft>
              <Box>
                {!cartItems?.length && <div>Your cart is empty</div>}
                {cartItems?.length > 0 && (
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>QTY</th>
                        <th>PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        const quantityInCart = item.so_item_quantity;
                        const totalPrice = calculateTotalPrice(
                          item.product_unitPrice,
                          quantityInCart
                        );

                        return (
                          <tr key={item.product_id}>
                            <ProductInfoCell>
                              <ProductImageBox>
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                />
                              </ProductImageBox>
                              <ProductDetails>
                                <ProductName>{item.product_name}</ProductName>
                                SIGNET RING SILVER ENGRAVING KING MIGUEL
                                PACKAGING: FREE BOX
                                {/* //product description// */}
                              </ProductDetails>
                            </ProductInfoCell>
                            <td>
                              <QuantityLabel>{quantityInCart}</QuantityLabel>
                            </td>
                            <td>
                              <PriceLabel>P{totalPrice.toFixed(2)}</PriceLabel>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
                <InputContainer>
                  <CheckoutInput
                    type="text"
                    placeholder="DISCOUNT CODE"
                    value={discountcode}
                    name="discountcode"
                    onChange={(ev) => setDiscountCode(ev.target.value)}
                  />
                  <ApplyButton>APPLY</ApplyButton>
                </InputContainer>

                <TotalContainerBox>
                  <Totals>
                    <div>
                      <TotalsHead>SUBTOTAL:</TotalsHead>
                    </div>
                    <div>
                      <TotalsPrice>
                        P{calculateSubtotal(cartItems).toFixed(2)}
                      </TotalsPrice>
                    </div>
                  </Totals>

                  <Totals>
                    <div>
                      <TotalsHead>SHIPPING:</TotalsHead>
                    </div>
                    <div></div>
                    <TotalsPrice>
                      P{getShippingFee(shippingMethod).toFixed(2)}{" "}
                    </TotalsPrice>
                  </Totals>
                </TotalContainerBox>

                <TotalContainerBox1>
                  <Totals>
                    <div>
                      <OverallTotal>TOTAL:</OverallTotal>
                    </div>
                    <div>
                      <OverallTotal>P{grandTotal.toFixed(2)}</OverallTotal>
                    </div>
                  </Totals>
                </TotalContainerBox1>

                <ButtonsBottom>
                  <ReturnButton>
                    <ButtonBottomSyle to="/cart" type="submit">
                      RETURN TO CART
                    </ButtonBottomSyle>
                  </ReturnButton>
                  <ButtonBottomSyle
                    to="/"
                    checkout
                    size={"m"}
                    type="button"
                    onClick={handleCheckout}
                  >
                    {" "}
                    CHECKOUT{" "}
                  </ButtonBottomSyle>
                </ButtonsBottom>
              </Box>
            </ColumnsWrapper>
          </Center>
        </StyledContainer>
      </div>
    </>
  );
}
