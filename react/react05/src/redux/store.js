/**
 * slice => Tổng hợp mọi thứ liên quan đến một chức năng
 * - state
 * - reducers
 * - actions
 */

import { configureStore } from "@reduxjs/toolkit";

import { counterSlice } from "./slice/counterSlice";
import { todoSlice } from "./slice/todoSlice";

const rootReducer = {
  counter: counterSlice.reducer,
  todo: todoSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
