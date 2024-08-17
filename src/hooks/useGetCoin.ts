import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

//https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1

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
  id?: string;
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

export function useGetPriceCoins({ ...props }: PropsType) {
  const { getDay, id } = props;

  const days: number | undefined = getDay;
  const currency: string = "eur";
  const dailyCoin: string | undefined = id;
  console.log(dailyCoin);

  return useQuery({
    queryKey: ["priceCoins", days, dailyCoin],
    queryFn: async () => {
      let url: string;
      if (days === 14 || days === 30) {
        url = `https://api.coingecko.com/api/v3/coins/${dailyCoin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;
      } else {
        url = `https://api.coingecko.com/api/v3/coins/${dailyCoin}/market_chart?vs_currency=${currency}&days=${days}`;
      }
      const { data } = await axios.get(url);
      return data;
    },
  });
}
