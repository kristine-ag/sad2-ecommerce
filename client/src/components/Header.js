import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const StyledHeader = styled.header`
  background-color: #000;
  margin: 0 auto;
  padding: 0 100px;
  border-bottom: 1px solid #fbff54;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space between;
  padding: 20px 10px;
  background-color: #000;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    color: yellow;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

const LeftLinks = styled.div`
  display: flex;
  gap: 80px;
`;

const RightLinks = styled.div`
  display: flex;
  gap: 80px;
`;

function Header() {
  const { cartProducts } = useContext(CartContext);
  const location = useLocation();

  const isCurrentPage = (path) => location.pathname === path;

  return (
    <StyledHeader>
      <Wrapper>
        <StyledNav>
          <LeftLinks>
            <NavLink to="/" data-swup>
              HOME
              {isCurrentPage("/") && <BiDotsHorizontalRounded />}
            </NavLink>
            <NavLink to="/shop" data-swup>
              SHOP
              {(isCurrentPage("/shop") ||
                location.pathname.startsWith("/product/")) && (
                <BiDotsHorizontalRounded />
              )}
            </NavLink>
          </LeftLinks>
          <RightLinks>
            <NavLink to="/account" data-swup>
              ACCOUNT
              {isCurrentPage("/account") && <BiDotsHorizontalRounded />}
            </NavLink>
            <NavLink to="/cart" data-swup>
              CART
              {(isCurrentPage("/cart") ||
                isCurrentPage("/checkout") ||
                isCurrentPage("/myorders") ||
                isCurrentPage("/logout")) && <BiDotsHorizontalRounded />}
            </NavLink>
          </RightLinks>
        </StyledNav>
      </Wrapper>
    </StyledHeader>
  );
}

export default Header;
