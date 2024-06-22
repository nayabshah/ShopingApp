import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducers/productReducers";

export const store = configureStore({
  reducer: { product: productReducers },
});
