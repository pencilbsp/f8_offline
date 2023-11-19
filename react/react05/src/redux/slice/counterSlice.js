import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state, action) => {
      state.count = state.count + action.payload;
    },
    decreament: (state, action) => {
      state.count = state.count - action.payload;
    },
  },
});
