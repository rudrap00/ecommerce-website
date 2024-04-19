import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProductsProvider from "./context/productsContext/ProductsProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <App />
  </ProductsProvider>
);
