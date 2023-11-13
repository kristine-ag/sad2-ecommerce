import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Center from "../components/Center";
import { PRODUCTS } from "../components/ChainProducts.js";
import neckGuide from "../components/assets/chains/NecklaceGuide.jpeg";
import Input from "../components/Input";
import Button from "../components/Button";
import CartIcon from "../components/CartIcon";
import { CartContext } from "../components/CartContext";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  padding: 50px;
`;

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    border-radius: 8px;
  }
`;

const ProductCardContainerRight = styled.div`
  background-color: black;
  display: flex;
  color: white;
  flex-direction: column;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
`;

const ChainDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 150px 150px 150px 150px;
  gap: 20px;
  padding: 1px;
`;

const GuideDisplay = styled.div`
  align-items: center;
  margin-left: 50px;
  margin-top: 40px;
`;

const ChainCard = styled.p`
  img {
    max-height: 100px;
    border-radius: 8px;
  }
`;

const ChainImg = styled.p`
  img {
    width: 100%;
    height: 250px;
    border-radius: 8px;
  }
`;

const ChainName = styled.p`
  text-align: left;
  margin-top: -30px;
  margin-bottom: -50px;
  font-size: small;
  font-weight: 300;
`;

const ChainRadioButton = styled.input`
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ea33f3;
  border-radius: 50%;
  outline: none;
  transition: 0.2s;

  &:checked {
    background-color: #ea33f3;
    border: 2px solid #ea33f3;
  }
`;

const ProductCard = styled.p`
  img {
    max-width: 100%;
    max-height: 500px;
  }
`;

const ProductDetails = styled.div`
  text-align: left;
  font-size: small;
`;

const ProductName = styled.h3`
  color: white;
  font-size: 25px;
  font-family: "Kish", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
`;

const ProductPrice = styled.p`
  font-weight: 200;
`;

const ChainLengthSelect = styled.select`
  display: flex;
  width: auto; /* Adjust the width as needed */
  border: 1px solid #ea33f3;
  border-radius: 4px;
  background-color: black;
  color: white;
  padding: 8px;
`;

const ChainLengthOption = styled.option`
  background-color: black;
  color: white;
`;

const CustomHeader = styled.div`
  text-align: left;
  font-size: medium;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CustomName = styled.div`
  text-align: left;
  font-size: small;
  font-weight: 300;
`;

const SubCustomName = styled.div`
  text-align: left;
  font-size: small;
  font-weight: 300;
  color: #bbbfbd;
  margin-bottom: 20px;
`;

const QuantityInput = styled.input`
  display: flex;
  width: auto;
  background-color: black;
  border: 1px solid #ea33f3;
  padding: 8px;
  margin-left: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
`;

const CartButton = styled(Button)`
  margin-top: 40px;
  font-weight: bold;
  height: 8%;
`;

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customTextFront, setCustomTextFront] = useState("");
  const [customTextBack, setCustomTextBack] = useState("");

  const [selectedChain, setSelectedChain] = useState("");
  const [selectedChainLength, setSelectedChainLength] = useState("");
  const [selectedFont, setSelectedFont] = useState("");

  const { productId } = useParams();
  const { addProduct } = useContext(CartContext);

  const addToCart = async (productId) => {
    try {
      const data = {
        quantity,
        selectedChain,
        selectedChainLength,
        customTextFront,
        customTextBack,
        selectedFont,
      };

      await axios.post(`http://localhost:8082/addtocart/${productId}`, data);

      addProduct(productId);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/product/${productId}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [productId]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <Center>
      <ColumnsWrapper>
        <ProductCardContainer key={product.product_id}>
          <ProductCard>
            <img src={product.product_image} alt={product.product_name} />
          </ProductCard>
        </ProductCardContainer>

        <ProductCardContainerRight>
          <ProductName>{product.product_name}</ProductName>
          <ProductDetails>
            <ProductPrice>Price: P{product.product_unitPrice}</ProductPrice>
            <i>*PRICE INCLUDES LASER ENGRAVING</i>
            <br />
            <br />
            MATERIAL: STAINLESS STEEL (HYPOALLERGENIC, WATER-RESISTANT)
            <br />
            14K GOLD-PLATED
          </ProductDetails>

          <ProductsGrid>
            <ProductCardContainerRight>
              <ChainDisplay>
                {PRODUCTS.map((chainProduct) => (
                  <div key={chainProduct.Cid}>
                    <label>
                      <br />
                      <ChainCard>
                        <img
                          src={chainProduct.chainImage}
                          alt={chainProduct.chainName}
                        />
                      </ChainCard>
                      <br />
                      <ChainName>
                        <ChainRadioButton
                          type="radio"
                          name="chain"
                          as={ChainRadioButton}
                          value={chainProduct.chainName}
                          checked={selectedChain === chainProduct.chainName}
                          onChange={(ev) => setSelectedChain(ev.target.value)}
                        />
                        {chainProduct.chainName.toUpperCase()}
                      </ChainName>
                    </label>
                  </div>
                ))}
                <br />
              </ChainDisplay>

              <CartButton
                onClick={() => addToCart(product.product_id)}
                block
                primary
              >
                <CartIcon /> ADD TO CART
              </CartButton>
            </ProductCardContainerRight>

            <GuideDisplay>
              <CustomHeader>CUSTOM OPTIONS:</CustomHeader>
              <CustomName>CUSTOM TEXT:</CustomName>
              <SubCustomName>
                FOR ENGRAVED BAR NECKLACE OR BRACELET
              </SubCustomName>

              <ProductCardContainerRight>
                <SubCustomName> Front </SubCustomName>
                <Input
                  type="text"
                  value={customTextFront}
                  onChange={(ev) => setCustomTextFront(ev.target.value)}
                  required
                />
                <SubCustomName> Back </SubCustomName>
                <Input
                  type="text"
                  value={customTextBack}
                  onChange={(ev) => setCustomTextBack(ev.target.value)}
                  required
                />

                <CustomName>FONT OF CHOICE:</CustomName>
                <SubCustomName>
                  OPTION 1: YOU MAY VISIT DAFONT.COM FOR FREE FONTS AND 'PASTE'
                  THE URL BELOW.
                </SubCustomName>
                <Input
                  type="text"
                  value={selectedFont}
                  onChange={(ev) => setSelectedFont(ev.target.value)}
                  required
                />
              </ProductCardContainerRight>

              <br />
              <ChainImg>
                <img src={neckGuide} alt="guide" />
              </ChainImg>
              <ProductsGrid>
                <ProductDetails for="Neck Guide">
                  CHAIN LENGTH:
                  <br /> (IN INCHES)
                </ProductDetails>
                <ChainLengthSelect
                  id="chainsize"
                  required
                  value={selectedChainLength}
                  onChange={(ev) => setSelectedChainLength(ev.target.value)}
                >
                  <ChainLengthOption value="Not Selected">
                    Select Chain Length
                  </ChainLengthOption>
                  <ChainLengthOption value="14 inches">
                    14 inches
                  </ChainLengthOption>
                  <ChainLengthOption value="16 inches">
                    16 inches
                  </ChainLengthOption>
                  <ChainLengthOption value="20 inches">
                    20 inches
                  </ChainLengthOption>
                  <ChainLengthOption value="24 inches">
                    24 inches
                  </ChainLengthOption>
                  <ChainLengthOption value="30 inches">
                    30 inches
                  </ChainLengthOption>
                  <ChainLengthOption value="36 inches">
                    36 inches
                  </ChainLengthOption>
                </ChainLengthSelect>
              </ProductsGrid>
              <br />

              <ProductsGrid>
                <ProductDetails>QUANTITY:</ProductDetails>
                <QuantityInput
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(ev) => setQuantity(parseInt(ev.target.value))}
                  required
                />
              </ProductsGrid>
            </GuideDisplay>
          </ProductsGrid>
        </ProductCardContainerRight>
      </ColumnsWrapper>
    </Center>
  );
}

export default ProductPage;
