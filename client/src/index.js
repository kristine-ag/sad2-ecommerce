import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Swup from "swup";

const swup = new Swup();
document.querySelectorAll("[data-swup]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    swup.loadPage({ url: link.getAttribute("/") });
  });
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
