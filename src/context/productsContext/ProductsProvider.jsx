import { useReducer } from "react";
import { productsContext } from "./productsContext";

const initialState = {
  products: null,
  filteredProducts: null,
  searchProducts: null,
  categories: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "fetch":
      return {
        ...state,
        products: payload,
        filteredProducts: payload,
      };
    case "cat":
      return {
        ...state,
        categories: payload.map((item) => ({ name: item, checked: false })),
      };
    case "addFilter": {
      const filterData = state.filteredProducts;
      const checkCategory = state.categories.find(
        ({ name }) => name === payload
      );

      const checkedCategories = state.categories.filter(
        ({ checked }) => checked
      );

      checkCategory.checked = true;

      if (checkedCategories.length === 0) {
        return {
          ...state,
          filteredProducts: filterData.filter(
            ({ category }) => category === payload
          ),
        };
      }

      const filteredData = state.products.filter(
        ({ category }) => category === payload
      );
      return {
        ...state,
        filteredProducts: [...filterData, ...filteredData],
      };
    }
    case "removeFilter": {
      const filteredData = state.filteredProducts;
      const checkCategory = state.categories.find(
        ({ name }) => name === payload
      );

      const checkedCategories = state.categories.filter(
        ({ checked }) => checked
      );

      checkCategory.checked = false;

      if (checkedCategories.length === 1) {
        return { ...state, filteredProducts: state.products };
      }
      return {
        ...state,
        filteredProducts: filteredData.filter(
          ({ category }) => category !== payload
        ),
      };
    }
    case "clearFilter": {
      return {
        ...state,
        filteredProducts: state.products,
        categories: state.categories.map(({ name }) => ({
          name,
          checked: false,
        })),
      };
    }
    case "setFilter": {
      const filterData = state.products;
      const checkCategories = state.categories;

      return {
        ...state,
        filteredProducts: filterData.filter(({ category }) =>
          payload.find((name) => name === category)
        ),
        categories: checkCategories.map(({ name }) => {
          if (payload.find((item) => item === name))
            return { name, checked: true };
          else return { name, checked: false };
        }),
      };
    }
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
