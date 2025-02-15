import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // products: localStorage.getItem("carts")
  //   ? JSON.parse(localStorage.getItem("carts"))
  //   : [],
  products: [],
  productCount: 0,
};
const productCart = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let { product, quantity } = action.payload;

      const existingProductIndex = state.products.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity += quantity;
      } else {
        state.products.push({ ...product, quantity });
      }
      state.productCount = state.products.length;
      // localStorage.setItem("carts", JSON.stringify(state.products));
    },
    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.products.findIndex(
        (item) => item._id === productId
      );
      if (quantity > 0) {
        state.products[indexProductId].quantity = quantity;
      } else {
        state.products = state.products.filter(
          (item) => item._id !== productId
        );
      }
      // localStorage.setItem("carts", JSON.stringify(state.products));
    },
  },
});

export const { addToCart, changeQuantity } = productCart.actions;
export default productCart.reducer;
