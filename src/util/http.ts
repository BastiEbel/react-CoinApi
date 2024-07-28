import { QueryClient } from "@tanstack/react-query";

export type CoinData = {
  id: string;
  symbol: string;
  title: string;
  image: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  last_updated: string;
};

export const queryClient = new QueryClient();

export async function getCoins() {
  const currency: string = "eur";
  const url: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=1&per_page=49&order=market_cap_desc`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = response.json() as unknown;

  return data;
}

export async function getPriceDailyCoins() {
  const currency: string = "eur";
  const dailyCoin: string = "bitcoin";
  const url: string = `https://api.coingecko.com/api/v3/coins/${dailyCoin}/market_chart?vs_currency=${currency}&days=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = response.json() as unknown;

  return data;
}

export async function getPriceWeeklyCoins() {
  const days: string = "14";
  const currency: string = "eur";
  const dailyCoin: string = "bitcoin";
  const url: string = `https://api.coingecko.com/api/v3/coins/${dailyCoin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = response.json() as unknown;

  return data;
}
