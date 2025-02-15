import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
  productCount: 0,
  TotalPrice: 0,
};

const productSlicer = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let { product, quantity } = action.payload;
      const existingProduct = state.products.find(
        (item) => item.productId === product.Id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({ product, quantity });
      }
      state.productCount = state.product.reduce(
        (count, item) => count + item.quantity,
        0
      );
      state.TotalPrice = state.product.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart } = productSlicer.actions;
export default productSlicer.reducer;
