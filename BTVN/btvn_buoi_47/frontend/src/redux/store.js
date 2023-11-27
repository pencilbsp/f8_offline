import { configureStore } from "@reduxjs/toolkit";
import { useSelector as useAppSelector, useDispatch as useAppDispatch } from "react-redux";

// slices
import kanbanReducer from "./slices/kanban";

// ----------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});

export const { dispatch } = store;

export const useSelector = useAppSelector;

export const useDispatch = () => useAppDispatch();
