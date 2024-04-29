import { useReducer } from "react";
import { productsContext } from "./productsContext";

const initialState = {
  products: null,
  filteredProducts: null,
  searchProducts: null,
  total: 0,
  categories: [],
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "fetch":
      return {
        ...state,
        products: payload,
        filteredProducts: payload,
        total: payload.length,
      };
    case "filter":
      return {};
    case "search": {
      const searchQuery = payload.toLowerCase().replace("%20", " ");
      let queries = searchQuery.split(" ");

      const products = state.products;

      if (products) {
        return {
          ...state,
          searchProducts: state.products.filter(
            ({ title, description, category }) =>
              queries.reduce(
                (acc, query) =>
                  title.toLowerCase().includes(query) ||
                  description.toLowerCase().includes(query) ||
                  category.toLowerCase().includes(query) ||
                  title.toLowerCase().includes(searchQuery) ||
                  description.toLowerCase().includes(searchQuery) ||
                  category.toLowerCase().includes(searchQuery) ||
                  acc,
                false
              )
          ),
        };
      } else {
        return { ...state, searchProducts: null };
      }
    }

    case "nullify-search": {
      return { ...state, searchProducts: null };
    }
  }
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <productsContext.Provider value={{ state, dispatch }}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductsProvider;
