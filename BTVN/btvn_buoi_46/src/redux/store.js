import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slice/product";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
