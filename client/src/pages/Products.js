import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import { Link } from "react-router-dom";

const Title = styled.h1`
  font-size: 1.5em;
  color: #fff;
`;

const StyledContainer = styled.div`
  background-color: #000;
  margin-bottom: 100px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const UpdatedButtonLink = styled(ButtonLink)`
  color: black;
  border: 1px solid black;
  border-outline: none;
`;

const ProductCardContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border: 1px solid #fbff54;
  border-radius: 8px;

  &:hover {
    background-color: #ea33f3;
    transition: background-color 0.7s;
  }
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const ProductDetails = styled.div`
  text-align: center;
`;

const ProductName = styled.h3`
  color: #000;
  font-family: "Kish", sans-serif;
  font-weight: 500;
`;

const ProductPrice = styled.p`
  color: #000;
  margin-top: 0;
  font-weight: 300;
`;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/shop");
        setAllProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <StyledContainer>
      <Center>
        <div>
          <Title>All Products</Title>
          {allProducts?.length > 0 ? ( // Use optional chaining operator to check if allProducts is defined
            <ProductsGrid>
              {allProducts.map((product) => (
                <ProductCardContainer key={product.product_id}>
                  <ProductCard to={`/product/${product.product_id}`}>
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                    />
                    <ProductName>{product.product_name}</ProductName>
                  </ProductCard>
                  <ProductDetails>
                    <ProductPrice>
                      Price: P{product.product_unitPrice}
                    </ProductPrice>
                    <UpdatedButtonLink
                      to={`/product/${product.product_id}`}
                      outline
                      white
                      size="m"
                    >
                      Read More
                    </UpdatedButtonLink>
                  </ProductDetails>
                </ProductCardContainer>
              ))}
            </ProductsGrid>
          ) : (
            <div>Loading products...</div>
          )}
        </div>
      </Center>
    </StyledContainer>
  );
}
