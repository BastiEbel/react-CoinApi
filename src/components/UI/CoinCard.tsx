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
  }, [color, percent]);

  return (
    <div className=" w-auto h-48 glass mx-2 rounded-lg">
      <div className="w-full p-4 flex justify-between items-center">
        <img alt={title} height={50} src={image} width={50} />
        <p className="text-gray-400 text-lg">{title}</p>
      </div>
      <div>
        <p>Price changes:</p>
        <p style={{ color: color }}>{percent.toFixed(2)} %</p>
      </div>
      <div>
        <p>Price:</p>
        <p> {price.toFixed(2)} €</p>
      </div>
    </div>
  );
}

export default CoinCard;
