import "./Cart.css";
import React, { useState } from "react";

function Cart() {
  const [count, setCount] = useState(1);
  const [count1, setCount1] = useState(1);

  const price1 = 550.0;
  const price2 = 799.0;

  const increment = () => {
    if (count > 0) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment1 = () => {
    if (count1 > 0) {
      setCount1(count1 + 1);
    }
  };

  const decrement1 = () => {
    if (count1 > 1) {
      setCount1(count1 - 1);
    }
  };

  const subtotal1 = (count * price1).toFixed(2);
  const subtotal2 = (count1 * price2).toFixed(2);

  const totalSubtotal = (parseFloat(subtotal1) + parseFloat(subtotal2)).toFixed(
    2
  );

  return (
    <div className="CART">
      <div className="div">
        <img
          className="line"
          alt="Line"
          src="https://generation-sessions.s3.amazonaws.com/d8f3f3b55bc47a61845a8c094ac84ea3/img/line-2.svg"
        />

        <div className="overlap-group">
          <div className="text-wrapper-1">
            <a href="/Cart.js">CART</a>
          </div>
          <div className="rectangle-1" />
        </div>

        <div className="MY-ORDERS">
          <a href="/Orders.js">MY ORDERS</a>
        </div>

        <div className="text-wrapper-3">LOG OUT</div>
        <div className="overlap-3"></div>

        <div className="overlap-1">
          <div className="rectangle-2" />
          <div className="text-wrapper-2">
            <a href="/Checkout.js">CHECKOUT</a>
          </div>
        </div>

        <div className="text-wrapper-3">LOG OUT</div>
        <div className="text-wrapper-4">ITEM NAME</div>
        <div className="text-wrapper-5">QTY</div>
        <div className="text-wrapper-6">PRICE</div>

        {/* First Item */}
        <ul className="image-list">
          <li>
            <div className="success-circle">
              <button className="button"></button>
            </div>
          </li>
          <li>
            <img
              className="item-picture"
              alt="Item"
              src="https://generation-sessions.s3.amazonaws.com/d8f3f3b55bc47a61845a8c094ac84ea3/img/screenshot-2023-03-01-at-2-54-1@2x.png"
            />
          </li>
          <li>
            <div className="overlap-group-2">
              <p className="SIGNET-RING-US-RING">
                <span className="text-wrapper-7">
                  SIGNET RING
                  <br />
                </span>
                <span className="text-wrapper-8">
                  US RING SIZE: 3<br />
                  FONT OPTIONS: SANS SERIF
                  <br />
                  COLOR: GOLD
                  <br />
                  ENGRAVING: KING MIGUEL
                  <br />
                  PACKAGING: FREE BOX
                  <br />
                </span>
              </p>
            </div>
          </li>
          <li>
            <p className="p">PRODUCTION LEAD TIME: 7-10 BUSINESS DAYS</p>
          </li>
        </ul>

        <div className="overlap-2">
          <div className="rectangle-3">
            <button className="decrement-button" onClick={decrement}>
              -
            </button>
            <div className="count-display">{count}</div>
            <button className="increment-button" onClick={increment}>
              +
            </button>
          </div>
        </div>
        <div className="text-wrapper-10">P{price1}</div>
        <div className="text-wrapper-11">P{subtotal1}</div>

        {/* Second Item */}
        <ul className="image-list">
          <li>
            <img
              className="line-2"
              alt="Line"
              src="https://generation-sessions.s3.amazonaws.com/d8f3f3b55bc47a61845a8c094ac84ea3/img/line-4.svg"
            />
          </li>
          <li>
            <div className="success-circle-2">
              <button className="button"></button>
            </div>
          </li>
          <li>
            <img
              className="item-picture-2"
              alt="Item"
              src="https://generation-sessions.s3.amazonaws.com/d8f3f3b55bc47a61845a8c094ac84ea3/img/screenshot-2023-03-01-at-2-55-1@2x.png"
            />
          </li>
          <li>
            <p className="NAMEPLATE-NECKLACE">
              <span className="text-wrapper-7">
                NAMEPLATE NECKLACE
                <br />
              </span>
              <span className="text-wrapper-8">
                CHAIN LENGTH: 12”
                <br />
                CHAIN DESIGN: CURB CHAIN
                <br />
                FONT OPTIONS: SANS SERIF
                <br />
                COLOR: GOLD
                <br />
                ENGRAVING: ISABELLE
                <br />
                PACKAGING: FREE BOX
                <br />
              </span>
            </p>
            <p className="text-wrapper-9">
              PRODUCTION LEAD TIME: 7-10 BUSINESS DAYS
            </p>
          </li>
        </ul>
        <div className="overlap-4">
          <div className="rectangle-3">
            <button className="decrement-button" onClick={decrement1}>
              -
            </button>
            <div className="count-display">{count1}</div>
            <button className="increment-button" onClick={increment1}>
              +
            </button>
          </div>
        </div>
        <div className="text-wrapper-10">P{price2}</div>
        <div className="text-wrapper-11">P{subtotal2}</div>

        {/* Subtotal */}
        <div className="text-wrapper-12">SUBTOTAL:</div>
        <div className="text-wrapper-13">P{totalSubtotal}</div>
      </div>
    </div>
  );
}

export default Cart;

// function CartItem({ name, price, imageUrl, count, increment, decrement }) {
//   return (
//     <div className="cart-item">
//       <img className="item-picture" alt="Item" src={imageUrl} />
//       <div className="item-details">
//         <p className="item-name">{name}</p>
//         <p className="item-price">P{price.toFixed(2)}</p>
//         <div className="quantity-controls">
//           <button className="decrement-button" onClick={decrement}>-</button>
//           <div className="count-display">{count}</div>
//           <button className="increment-button" onClick={increment}>+</button>
//         </div>
//         <p className="subtotal">P{(count * price).toFixed(2)}</p>
//       </div>
//     </div>
//   );
// }

/* <div className="cart-items">
  {items.map((item, index) => (
    <CartItem
      key={index}
      name={item.name}
      price={item.price}
      imageUrl={item.imageUrl}
      count={index === 0 ? count : count1}
      increment={index === 0 ? increment : increment1}
      decrement={index === 0 ? decrement : decrement1}
    />
  ))}
</div> */
