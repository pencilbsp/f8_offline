import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import request from "../../utils/request";
import { ACTION_STATE, PRODUCT_PAGE_LIMIT } from "../../utils/config";

const initialState = {
  error: null,
  totalPage: 0,
  products: [],
  status: ACTION_STATE.IDLE,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = ACTION_STATE.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.totalPage = action.payload.totalPage;
        state.products = action.payload.listProduct;
        state.status = ACTION_STATE.SUCCEEDED;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = ACTION_STATE.FAILED;
      });
  },
});

const defaultParams = { limit: PRODUCT_PAGE_LIMIT, page: 1 };
//
export const fetchProducts = createAsyncThunk("fetchProducts", async (params = defaultParams) => {
  if (!params.limit) params.limit = PRODUCT_PAGE_LIMIT;
  const response = await request.get("/products", { params });
  return response.data.data;
});

export default productSlice.reducer;
