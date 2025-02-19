import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  productCount: localStorage.getItem("cart count")
    ? JSON.parse(localStorage.getItem("cart count"))
    : 0,
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
      localStorage.setItem("carts", JSON.stringify(state.products));
      localStorage.setItem("cart count", JSON.stringify(state.productCount));
    },

    changeQuantity(state, action) {
      const { product, quantity } = action.payload;
      const indexProductId = state.products.findIndex(
        (item) => item._id === product._id
      );
      if (indexProductId >= 0) {
        if (quantity > 0) {
          state.products[indexProductId].quantity = quantity;
        } else {
          state.products = state.products.filter(
            (item) => item._id !== product._id
          );
        }
      }
      localStorage.setItem("carts", JSON.stringify(state.products));
    },
  },
});

export const { addToCart, changeQuantity } = productCart.actions;
export default productCart.reducer;
