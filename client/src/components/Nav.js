import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Nav({ show, toggleNav }) {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = inactiveLink + " text-highlight rounded-sm";

  const location = useLocation();

  return (
    <div>
      {/* Side drawer navigation */}
      <aside
        className={`top-0 text-lg text-black font-semibold p-8 fixed w-full bg-white h-full md:static md:w-auto ${
          show ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div className="mb-4 mr-4">
          <Logo />
        </div>

        {/* Close button inside the drawer when it's open */}
        {show && (
          <button onClick={toggleNav} className="md:hidden">
            Close Navigation
          </button>
        )}

        <nav className="md:flex md:flex-col md:gap-6 md:items-center md:text-center">
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
          <div>PURCHASE </div>
          ORDERS
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

          <div className="flex flex-col">
            <div className="flex flex-col flex-grow">
            </div>
          </div>

          <button
            className={`${inactiveLink} bg-black text-white text-sm font-normal rounded-md py-3 px-6 text-right whitespace-pre md:whitespace-normal`}
          >
            LOGOUT
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default Nav;
