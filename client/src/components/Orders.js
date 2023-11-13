import "./Orders.css";
import React from "react";

function Orders() {
  return (
    <div className="ORDERS">
      <div className="div">
        <img
          className="line"
          alt="Line"
          src="https://generation-sessions.s3.amazonaws.com/a44b97107316eb89fee6ffdaa927b3f5/img/line-2.svg"
        />

        <div className="CART">
          <a href="/Cart.js">CART</a>
        </div>
        <div className="overlap-group">
          <div className="MY-ORDERS">
            <a href="/Orders.js">MY ORDERS</a>
          </div>
          <div className="rectangle" />
        </div>
        <div className="LOGOUT">LOG OUT</div>

        <div className="text-wrapper-1">ITEM NAME</div>
        <div className="text-wrapper-2">STATUS</div>
        <div className="text-wrapper-3">QTY</div>
        <div className="text-wrapper-4">ORDER ID</div>
        <div className="text-wrapper-5">PRICE</div>

        <img
          className="image"
          alt="image of jewelry"
          src="https://generation-sessions.s3.amazonaws.com/a44b97107316eb89fee6ffdaa927b3f5/img/screenshot-2023-03-01-at-2-54-1@2x.png"
        />
        <img
          className="image-2"
          alt="image of jewelry"
          src="https://generation-sessions.s3.amazonaws.com/a44b97107316eb89fee6ffdaa927b3f5/img/screenshot-2023-03-01-at-2-55-1@2x.png"
        />

        <p className="order-1">
          <span className="text-wrapper-6">
            SIGNET RING
            <br />
          </span>
          <span className="text-wrapper-7">
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

        <p className="order-2">
          <span className="text-wrapper-16">
            NAMEPLATE NECKLACE
            <br />
          </span>
          <span className="text-wrapper-17">
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

        <div className="text-wrapper-8">01</div>
        <div className="text-wrapper-9">567</div>
        <div className="text-wrapper-10">P550.00</div>
        <div className="text-wrapper-11">P799.00</div>
        <div className="text-wrapper-12">827</div>
        <div className="text-wrapper-13">01</div>

        <div className="OPEN">
          <div className="overlap-2">
            <div className="text-wrapper-15">SHIPPING</div>
          </div>
        </div>
        <div className="CONFIRMED">
          <div className="div-wrapper">
            <div className="text-wrapper-14">SHIPPING</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

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
