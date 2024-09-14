import { useEffect, useState } from "react";
import { useCoinSelector } from "../../../store/hooks";
import { useGetCoins } from "../../../hooks/useGetCoin";
import { formatterPrices } from "../../../util/formatter";

type SelectedCoinItem = {
  id: string;
  current_price: number;
  high_24h: number;
  low_24h?: number;
  name: string;
};

export default function SelectedCoinData() {
  const [color, setColor] = useState("#00dc00");
  const [item, setItem] = useState<SelectedCoinItem>();
  const { data } = useGetCoins();
  const selectedCoin = useCoinSelector((state) => state.coin.items[0]);

  useEffect(() => {
    if (Array.isArray(data) && selectedCoin) {
      const foundItem = data.find(
        (findItem: SelectedCoinItem) => findItem.id === selectedCoin.id
      );
      setItem(foundItem);

      if (selectedCoin.percent < 0 || selectedCoin.price < 0) {
        setColor("red");
      } else {
        setColor("#00dc00");
      }
    }
  }, [selectedCoin, data]);

  const { percent, price, currency, coin } = selectedCoin || {};
  const { low_24h = 0, high_24h = 0 } = item || {};

  return (
    <div className=" mx-8 flex flex-col items-center">
      <div className=" w-full px-4 py-2 flex justify-between items-center">
        <p className="text-gray-500 text-lg">Balance</p>
        <p
          style={{
            color: color,
            fontSize: "1.125rem",
          }}
        >
          {percent?.toFixed(2)} %
        </p>
      </div>
      <div className="w-full px-4 py-2 flex justify-between items-center">
        <div className="flex">
          <p
            style={{
              color: color,
              fontSize: "1.125rem",
              marginRight: "8px",
            }}
          >
            {formatterPrices(price)}
          </p>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>{currency}</p>
        </div>
        <p className="text-gray-500 text-lg">{coin}</p>
      </div>

      <div className="w-full px-4 py-2 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-lg">24h lowest price</p>
          <div className="flex">
            <p
              style={{ marginRight: "8px", fontSize: "1.125rem", color: "red" }}
            >
              {formatterPrices(low_24h)}
            </p>
            <p className="text-gray-500 text-lg"> {currency}</p>
          </div>
        </div>
        <div className="border mx-4 border-gray-500 h-12"></div>
        <div>
          <p className="text-gray-500 text-lg">24h highest price</p>
          <div className="flex">
            <p
              style={{
                marginRight: "8px",
                fontSize: "1.125rem",
                color: "#00dc00",
              }}
            >
              {formatterPrices(high_24h)}
            </p>
            <p className="text-gray-500 text-lg">{currency}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
