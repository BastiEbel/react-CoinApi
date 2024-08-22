import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CoinItem = {
  id: string;
  coin: string;
  days: number;
  currency: string;
  price?: number;
  image: string;
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
    selectedChartData(
      state,
      action: PayloadAction<{
        days: number;
        coin: string;
        id: string;
        currency: string;
        price: number;
        image: string;
      }>
    ) {
      state.items[0] = action.payload;
    },

    //removeFromCart(state, action: PayloadAction<string>) {
    /* const itemIndex = state.items.findIndex(
          (item) => item.id === action.payload
        );
  
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity--;
        } */
    //},
  },
});
export const { selectedChartData } = coinSlice.actions;
