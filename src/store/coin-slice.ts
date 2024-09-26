import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CoinState = {
  items: Array<{
    id: string;
    coin: string;
    days: number;
    percent: number;
    price: number;
    image: string;
  }>;
  currency: Array<{
    currencyName: string;
    currencyCoin: string;
  }>;
  searchFilter: string;
};

const initialState: CoinState = {
  items: [],
  currency: [],
  searchFilter: "",
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
        percent: number;
        price: number;
        image: string;
      }>
    ) {
      state.items[0] = action.payload;
    },
    loadCurrency(
      state,
      action: PayloadAction<{ currencyName: string; currencyCoin: string }>
    ) {
      state.currency[0] = action.payload;
    },
    selectSearchTerm(state, action: PayloadAction<string>) {
      state.searchFilter = action.payload;
    },
  },
});
export const { selectedChartData, loadCurrency, selectSearchTerm } =
  coinSlice.actions;
