import "./Checkout.css";
import React from "react";

function Checkout() {
  return (
    <div className="CHECKOUT">
      <div className="div">
        <img
          className="line"
          alt="Line"
          src="https://generation-sessions.s3.amazonaws.com/d8f3f3b55bc47a61845a8c094ac84ea3/img/line-2.svg"
        />

        <div className="overlap">
          <div className="rectangle" />
          <div className="text-1">
            {" "}
            <a href="/Cart.js">CART</a>{" "}
          </div>
        </div>
        <div className="text-2">
          <a href="/Orders.js">MY ORDERS</a>
        </div>
        <div className="text-3">LOG OUT</div>

        <div className="text-12">CONTACT:</div>
        <div className="overlap-group">
          <div className="rectangle-2" />
          <div className="text-4">0962 273 1233</div>
          <div className="change-button-1">CHANGE</div>
        </div>

        <div className="text-13">SHIP TO:</div>
        <div className="overlap-2">
          <div className="rectangle-3" />
          <p className="p">
            #8 SUNRISE STREET MONTERITZ MAA DAVAO DAVAO DEL SUR, 8000
          </p>
          <div className="change-button-2">CHANGE</div>
        </div>

        <div className="text-14">DELIVERY/ SHIPPING METHOD:</div>

        <div className="overlap-3">
          <p className="text-6">
            PICK-UP (AN ADDRESS WILL BE SENT TO YOU ON THE DAY OF YOUR ORDER’S
            AVAILABILITY)
          </p>
          <div className="text-7">FREE</div>
          <div className="text-8">P70.00</div>
          <div className="text-9">P90.00</div>
          <div className="text-10">DELIVERY (VIA GRAB)</div>
          <p className="text-11">SHIPPING (OUTSIDE DAVAO CITY ONLY)</p>
        </div>

        <div className="text-15">PAYMENT</div>

        <div className="overlap-4">
          <div className="mdi-success-circle-3">
            <button className="buttonpink"></button>
          </div>
          <div className="mdi-success-circle-4">
            <button className="button"></button>
          </div>
          <div className="mdi-success-circle-5">
            <button className="button"></button>
          </div>

          <p className="ONLINE-TRANSFER-OVER">
            <span className="span">
              ONLINE TRANSFER / OVER-THE-COUNTER
              <br />
              AN***A M**E****Z
              <br />
              0923 293 7651
              <br />
              <br />
              INSTRUCTIONS ON WHERE TO SEND
            </span>
            <span className="text-17"> PROOF OF PAYMENT </span>
            <span className="span">
              WILL BE SENT VIA E-MAIL ONCE YOU HAVE COMPLETED THIS ORDER. THANK
              YOU
            </span>
          </p>
          <div className="text-18">GCASH</div>
          <div className="text-16">BPI</div>
          <div className="text-26">COD</div>
        </div>

        <div className="overlap-6">
          <div className="text-22">QTY</div>
          <div className="text-23">PRICE</div>
        </div>

        <img
          className="image-1"
          alt="jewelry"
          src="https://generation-sessions.s3.amazonaws.com/543e713fa21a677d3cb47ec9f0bb1c57/img/screenshot-2023-03-01-at-2-54-2@2x.png"
        />
        <div className="overlap-5">
          <p className="div-2">
            <span className="order-1">
              SIGNET RING
              <br />
            </span>
            <span className="text-20">
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
          <div className="text-19">01</div>
        </div>

        <img
          className="image-2"
          alt="jewelry"
          src="https://generation-sessions.s3.amazonaws.com/543e713fa21a677d3cb47ec9f0bb1c57/img/screenshot-2023-03-01-at-2-55-2@2x.png"
        />
        <div className="overlap-7">
          <p className="div-2">
            <span className="order-2">
              NAMEPLATE NECKLACE
              <br />
            </span>
            <span className="text-28">
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
          <div className="text-21">01</div>
        </div>
        <div className="text-25">P550.00</div>
        <div className="text-27">P799.00</div>

        <div className="div-wrapper">
          <div className="text-5">DISCOUNT CODE</div>
        </div>
        <div className="text-24">APPLY</div>

        <div className="text-36">P1349.00</div>
        <div className="text-29">P90.00</div>
        <div className="text-30">P1439.00</div>
        <div className="text-31">SUBTOTAL:</div>
        <div className="text-32">TOTAL:</div>
        <div className="text-33">SHIPPING</div>

        <img
          className="line-2"
          alt="Line"
          src="https://generation-sessions.s3.amazonaws.com/543e713fa21a677d3cb47ec9f0bb1c57/img/line-5.svg"
        />
        <img
          className="line-3"
          alt="Line"
          src="https://generation-sessions.s3.amazonaws.com/543e713fa21a677d3cb47ec9f0bb1c57/img/line-4.svg"
        />

        <div className="rectangle-6" />
        <div className="text-34">
          <a href="/Orders.js">CONTINUE TO PAYMENT</a>
        </div>
        <div className="text-35">RETURN TO CART</div>
      </div>
    </div>
  );
}

export default Checkout;
