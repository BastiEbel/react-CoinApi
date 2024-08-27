import { useCallback, useEffect, useState } from "react";

import ChartUI from "../UI/ChartUI";
import { ChartData, Point, ScriptableChartContext } from "chart.js";
import Button from "../UI/Button";
import { useGetPriceCoins } from "../../hooks/useGetCoin";
import { useCoinSelector } from "../../store/hooks";

type ChartCoinPrice = {
  price: number[];
  time: string[];
  coinName: string;
};

export default function ChartBox() {
  const [getDay, setGetDay] = useState(1);
  const { data, isFetched } = useGetPriceCoins(getDay);
  const [getCoins, setGetCoins] = useState<ChartCoinPrice>({
    price: [],
    time: [],
    coinName: "",
  });
  const selectedInfo = useCoinSelector((state) => state.coin.items[0]);

  let showDay;

  const fetchPriceData = useCallback(async () => {
    if (isFetched && data.prices) {
      const coinPrice: number[] = [];
      const coinTime: string[] = [];

      data.prices.forEach((singleData: number[]) => {
        coinPrice.push(singleData[1]);
        const currentDate = new Date(singleData[0]);
        coinTime.push(
          getDay === 1
            ? currentDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1")
            : currentDate.toLocaleDateString()
        );
      });

      if (selectedInfo) {
        setGetCoins({
          price: coinPrice,
          time: coinTime,
          coinName: selectedInfo.coin,
        });
      }
    }
  }, [getDay, data, isFetched, selectedInfo]);

  useEffect(() => {
    fetchPriceData();
  }, [fetchPriceData]);

  const dataset: ChartData<"line", (number | Point)[], unknown> = {
    labels: getCoins.time,
    datasets: [
      {
        label: getCoins.coinName,
        data: getCoins.price.length > 0 ? getCoins.price : [0],
        backgroundColor: (context: ScriptableChartContext) => {
          if (!context.chart.chartArea) {
            return;
          }
          const { ctx } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, 20, 100, 800);
          gradientBg.addColorStop(0.225, "transparent");
          gradientBg.addColorStop(1, "#13e2a4");
          return gradientBg;
        },
        fill: true,
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointRadius: 2,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };
  if (getDay === 1) {
    showDay = (
      <h3 className="text-white text-2xl mr-6">24h {selectedInfo.coin}</h3>
    );
  } else if (getDay === 14) {
    showDay = (
      <h3 className="text-white text-2xl mr-6">14 Days {selectedInfo.coin}</h3>
    );
  } else {
    showDay = (
      <h3 className="text-white text-2xl mr-6">30 Days {selectedInfo.coin}</h3>
    );
  }

  return (
    <div className="w-5/6 h-5/6 p-4 flex flex-col items-center mr-10 glass rounded-lg">
      <div className="w-5/6 flex">
        {showDay}
        <Button
          style={`${
            getDay === 1
              ? "  text-white bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300"
              : ""
          }shadow shadow-lg h-auto w-20 bg-slate-900 text-gray-400 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
          onClick={() => setGetDay(1)}
        >
          1 Day
        </Button>
        <Button
          style={`${
            getDay === 14
              ? " text-white bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300"
              : ""
          }shadow shadow-lg h-auto w-20 bg-slate-900 text-gray-400 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
          onClick={() => setGetDay(14)}
        >
          14 Days
        </Button>
        <Button
          style={`${
            getDay === 30
              ? " text-white bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300"
              : ""
          }shadow shadow-lg h-auto w-20 bg-slate-900 text-gray-400 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
          onClick={() => setGetDay(30)}
        >
          30 Days
        </Button>
      </div>
      <ChartUI data={dataset} />
    </div>
  );
}
