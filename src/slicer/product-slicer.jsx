import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  productCount: localStorage.getItem("cart count")
    ? JSON.parse(localStorage.getItem("cart count"))
    : 0,
};

const productSlicer = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    addAll: (state, action) => {
      let { product } = action.payload;
      state.products.push(product);
    },
  },
});

export const { addAll } = productSlicer.actions;
export default productSlicer.reducer;
