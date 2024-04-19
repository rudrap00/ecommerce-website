import { useReducer } from "react";
import { cartContext } from "./cartContext";

const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  const { type, payload, data } = action;
  const { id } = data;
  let cartData = state.cart;
  let filteredItem = {};
  if (cartData) {
    filteredItem = cartData.find((item) => item.id === id);
  } else {
    cartData = [];
  }

  switch (type) {
    case "increment":
      if (filteredItem) {
        filteredItem.count += payload;

        return { cart: cartData };
      } else {
        cartData.push({ ...data, count: 1 });
        return { cart: [...cartData] };
      }
    case "decrement":
      filteredItem.count -= payload;

      if (filteredItem.count === 0) {
        return { cart: cartData.filter((item) => item.count > 0) };
      }

      return { cart: cartData };
    default:
      return { cart: ["check"] };
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
