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

  useEffect(() => {
    if (percent < 0) {
      setColor("red");
    }
    if (price < 0) {
      setColor("red");
    }
  }, [color, percent, price]);

  return (
    <div
      onClick={onClick}
      className={`${
        selectCoin?.coin === title ? "selectCoin" : "glass"
      } hover:bg-gradient-to-r from-teal-800 to-teal-950 transition duration-300 w-auto border-white mx-3 rounded-lg flex flex-col justify-center cursor-pointer`}
    >
      <div className="w-full p-4 flex justify-between items-center">
        <img
          className="text-gray-400"
          alt="Logo"
          height={50}
          src={image}
          width={50}
        />
        <p className="text-gray-400 text-lg">{title}</p>
      </div>
      <div className=" w-full px-4 py-2 flex justify-between items-center">
        <p className="text-gray-400 text-lg">Price changes:</p>
        <p
          style={{
            color: color,
            fontSize: "1.125rem",
          }}
        >
          {percent.toFixed(2)} %
        </p>
      </div>
      <div className="w-full px-4 py-2 flex justify-between items-center">
        <p className="text-gray-400 text-lg">Price:</p>
        <p
          style={{
            color: color,
            fontSize: "1.125rem",
          }}
        >
          {price.toFixed(2)} €
        </p>
      </div>
    </div>
  );
}

export default CoinCard;
