import { useState, useEffect } from "react";

type Coin = {
  title: string;
  image: string;
  price: number;
  percent: number;
};

function CoinCard({ title, image, price, percent }: Coin) {
  const [color, setColor] = useState("#00dc00");

  useEffect(() => {
    if (percent < 0) {
      setColor("red");
    }
    if (price < 0) {
      setColor("red");
    }
  }, [color, percent, price]);

  return (
    <div className="w-auto h-48 border-white glass mx-2 rounded-lg flex flex-col justify-center">
      <div className="w-full px-4 py-2 flex justify-between items-center">
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
