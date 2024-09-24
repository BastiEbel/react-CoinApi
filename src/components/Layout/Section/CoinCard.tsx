import { useState, useEffect } from "react";
import { useCoinSelector } from "../../../store/hooks";

type Coin = {
  title: string;
  image: string;
  price: number;
  percent: number;
  onClick: () => void;
};

function CoinCard({ title, image, price, percent, onClick }: Coin) {
  const [color, setColor] = useState("#00dc00");
  const selectCoin = useCoinSelector((state) => state.coin.items[0]);
  const coinCurrency = useCoinSelector((state) => state.coin.currency[0]);

  useEffect(() => {
    if (percent < 0 || price < 0) {
      setColor("red");
    } else {
      setColor("#00dc00");
    }
  }, [percent, price, coinCurrency.currencyName]);

  return (
    <div
      onClick={onClick}
      className={`${
        selectCoin?.coin === title ? "selectCoin" : "glass"
      } hover:bg-gradient-to-r from-teal-800 to-teal-950 transition duration-300 border-white mx-3 rounded-lg p-4 cursor-pointer grid grid-cols-1 gap-2`}
    >
      <div className="flex items-center justify-between">
        <img
          className="text-gray-400"
          alt="Logo"
          height={50}
          src={image}
          width={50}
        />
        <p className="text-gray-400 text-sm lg:text-lg 2xl:text-base">
          {title}
        </p>
      </div>

      <div className="grid grid-cols-2 items-center">
        <p className="text-gray-400 text-sm lg:text-lg 2xl:text-base">
          Price changes:
        </p>
        <p
          className="text-right"
          style={{
            color: color,
            fontSize: "1.125rem",
          }}
        >
          {percent.toFixed(2)} %
        </p>
      </div>

      <div className="grid grid-cols-2 items-center">
        <p className="text-gray-400 text-sm lg:text-lg 2xl:text-base">Price:</p>
        <p
          className="text-right"
          style={{
            color: "#00dc00",
            fontSize: "1.125rem",
          }}
        >
          {price.toFixed(2)} <span>{coinCurrency?.currencyName}</span>
        </p>
      </div>
    </div>
  );
}

export default CoinCard;
