import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "../slicer/slicer";

export default configureStore({
  reducer: {
    productCart: productSlicer,
  },
});
