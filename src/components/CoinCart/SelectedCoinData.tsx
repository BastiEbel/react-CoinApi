import { useEffect, useState } from "react";
import { useCoinSelector } from "../../store/hooks";

export default function SelectedCoinData() {
  const [color, setColor] = useState("#00dc00");
  const selectedCoin = useCoinSelector((state) => state.coin.items[0]);

  useEffect(() => {
    if (selectedCoin?.percent < 0) {
      setColor("red");
    }
    if (selectedCoin?.price < 0) {
      setColor("red");
    }
  }, [color, selectedCoin?.percent, selectedCoin?.price]);

  return (
    <div className="w-1/4 mx-8 flex flex-col items-center">
      <div className="w-full px-4 py-2 flex justify-between items-center">
        <img
          className="text-gray-400"
          alt="Logo"
          height={30}
          src={selectedCoin?.image}
          width={30}
        />
        <p className="text-gray-400 text-lg">{selectedCoin?.coin}</p>
      </div>
      <div className=" w-full px-4 py-2 flex justify-between items-center">
        <p className="text-gray-400 text-lg">Price changes:</p>
        <p
          style={{
            color: color,
            fontSize: "1.125rem",
          }}
        >
          {selectedCoin?.percent.toFixed(2)} %
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
          {selectedCoin?.price.toFixed(2)} €
        </p>
      </div>
    </div>
  );
}
