import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const data = action.payload;

      const filteredItem = state.value.find((item) => item.id === data.id);

      if (filteredItem) filteredItem.count++;
      else state.value.push({ ...data, count: 1 });
    },
    increment: (state, action) => {
      const id = action.payload;
      const filteredItem = state.value.find((item) => item.id === id);

      filteredItem.count += 1;
    },
    decrement: (state, action) => {
      const id = action.payload;
      const filteredItem = state.value.find((item) => item.id === id);

      if (filteredItem.count === 1)
        state.value = state.value.filter((item) => item.id !== id);
      else filteredItem.count -= 1;
    },
  },
});

export const { increment, decrement, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
