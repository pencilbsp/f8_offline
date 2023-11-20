import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slice/cart";
import productReducer from "./slice/product";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});
