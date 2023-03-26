import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../pages/slices/basketSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
    