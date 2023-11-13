import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Nav({ show }) {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " text-highlight rounded-sm";

  const location = useLocation();

  return (
    <aside
      className={
        (show ? "left-0" : "-left-full") +
        " top-0 text-lg text-black font-semibold p-8 fixed w-full bg-white h-full md:static md:w-auto transition-all"
      }
    >
      <div className="mb-4 mr-4">
        <Logo />
      </div>

      <nav className="flex flex-col gap-5 items-center text-left">
        <Link
          to="/"
          className={location.pathname === "/" ? activeLink : inactiveLink}
        >
          DASHBOARD
        </Link>

        <Link
          to="/customers"
          className={
            location.pathname === "/customers" ? activeLink : inactiveLink
          }
        >
          CUSTOMERS
        </Link>

        <Link
          to="/rewards"
          className={
            location.pathname.startsWith("/rewards") ? activeLink : inactiveLink
          }
        >
          REWARDS
        </Link>

        <Link
          to="/suppliers"
          className={
            location.pathname.startsWith("/suppliers")
              ? activeLink
              : inactiveLink
          }
        >
          SUPPLIERS
        </Link>

        <Link
          to="/purchaseorders"
          className={
            location.pathname.startsWith("/purchaseorders")
              ? activeLink
              : inactiveLink
          }
        >
          PURCHASE ORDERS
        </Link>

        <Link
          to="/products"
          className={
            location.pathname.startsWith("/products")
              ? activeLink
              : inactiveLink
          }
        >
          PRODUCTS
        </Link>

        <Link
          to="/categories"
          className={
            location.pathname === "/categories" ? activeLink : inactiveLink
          }
        >
          CATEGORIES
        </Link>

        <Link
          to="/orders"
          className={
            location.pathname === "/orders" ? activeLink : inactiveLink
          }
        >
          ORDERS
        </Link>

        <button
          className={`${inactiveLink} bg-black text-white text-sm font-normal rounded-md py-3 px-6 text-right whitespace-pre`}
        >
          LOGOUT
        </button>
      </nav>
    </aside>
  );
}

export default Nav;
