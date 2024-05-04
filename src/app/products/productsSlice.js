import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    searchProducts: null,
    categories: [],
  },
  reducers: {
    fetchData: (state, action) => {
      const [prods, cats] = action.payload;
      const { products } = prods;
      const unq = {};
      const categories = [];

      cats.forEach((item) => {
        const name = item.split("-")[0];

        if (!unq[name]) {
          unq[name] = name;
          categories.push({
            name,
            checked: false,
          });
        }
      });

      state.products = products;
      state.filteredProducts = products;
      state.categories = categories;
    },
    addFilter: (state, action) => {
      const name = action.payload;

      const checkCategory = state.categories.find((item) => item.name === name);

      const checkedCategories = state.categories.reduce(
        (acc, item) => (acc += item.checked ? 1 : 0),
        0
      );
      checkCategory.checked = true;
      const filteredData = state.products.filter(({ category }) =>
        category.startsWith(name)
      );

      if (checkedCategories === 0) {
        state.filteredProducts = filteredData;
      } else {
        state.filteredProducts = [...state.filteredProducts, ...filteredData];
      }
    },
    removeFilter: (state, action) => {
      const name = action.payload;

      const uncheckCategory = state.categories.find(
        (item) => item.name === name
      );

      const checkedCategories = state.categories.reduce(
        (acc, item) => (acc += item.checked ? 1 : 0),
        0
      );
      uncheckCategory.checked = false;
      if (checkedCategories === 1) state.filteredProducts = state.products;
      else {
        state.filteredProducts = state.filteredProducts.filter(
          ({ category }) => !category.startsWith(name)
        );
      }
    },
    resetFilter: (state) => {
      state.filteredProducts = state.products;
      state.categories = state.categories.map(({ name }) => ({
        name,
        checked: false,
      }));
    },
    setFilter: (state, action) => {
      const checkedData = action.payload;

      state.filteredProducts = state.products.filter(({ category }) =>
        checkedData.find((name) => category.startsWith(name))
      );

      state.categories = state.categories.map((item) => {
        if (checkedData.find((name) => name === item.name))
          return { name: item.name, checked: true };
        else return { name: item.name, checked: false };
      });
    },
    search: (state, action) => {
      const query = action.payload?.toLowerCase();
      state.searchProducts = state.products.filter(
        ({ title, brand, description, category }) => {
          return (
            title.toLowerCase().includes(query) ||
            brand.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query)
          );
        }
      );
    },
    nullifySearch: (state) => {
      state.searchProducts = null;
    },
  },
});

export const {
  fetchData,
  addFilter,
  removeFilter,
  resetFilter,
  setFilter,
  search,
  nullifySearch,
} = productsSlice.actions;

export default productsSlice.reducer;
