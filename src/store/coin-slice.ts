import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CoinItem = {
  id: string;
  coin: string;
  days?: string;
  currency: string;
  price?: number;
};

type CoinState = {
  items: CoinItem[];
};

const initialState: CoinState = {
  items: [],
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    selectedDays(state, action: PayloadAction<{ id: string; days: string }>) {
      /* const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
  
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity++;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        } */
    },
    removeFromCart(state, action: PayloadAction<string>) {
      /* const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload
        );
  
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity--;
        } */
    },
  },
});
