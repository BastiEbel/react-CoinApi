import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCoinSelector } from "../store/hooks";
//import { useCoinSelector } from "../store/hooks";

export type CoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  last_updated: string;
};

export type PropsType = {
  getDay?: number;
  getId?: string;
};

export const queryClient = new QueryClient();

export function useGetCoins() {
  const currency: string = "eur";
  const url: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=1&per_page=49&order=market_cap_desc`;

  return useQuery({
    queryKey: ["allCoins"],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data as CoinData;
    },
  });
}

export function useGetPriceCoins(getDay: number) {
  const currency: string = "eur";
  const selectedInfo = useCoinSelector((state) => state.coin.items[0]);

  return useQuery({
    queryKey: ["priceCoin"],
    refetchOnWindowFocus: false,
    enabled: getDay !== undefined || selectedInfo.id !== undefined,
    queryFn: async () => {
      let url = `https://api.coingecko.com/api/v3/coins/${selectedInfo.id}/market_chart?vs_currency=${currency}&days=${getDay}`;
      if (getDay === 14 || getDay === 30) {
        url = `https://api.coingecko.com/api/v3/coins/${selectedInfo.id}/market_chart?vs_currency=${currency}&days=${getDay}&interval=daily`;
      }
      const { data } = await axios.get(url);

      return data;
    },
  });
}
