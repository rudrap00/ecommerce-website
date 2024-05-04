import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productsReducer from "./products/productsSlice";

// const store = configureStore({}) ... export default store;

export default configureStore({
  reducer: { cart: cartReducer, products: productsReducer },
});
