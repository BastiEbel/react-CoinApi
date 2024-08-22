import { configureStore } from "@reduxjs/toolkit";
import { coinSlice } from "./coin-slice";

export const store = configureStore({
  reducer: {
    coin: coinSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
