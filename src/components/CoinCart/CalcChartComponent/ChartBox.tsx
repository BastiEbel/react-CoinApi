import { useCallback, useEffect, useState } from "react";

import ChartLine from "../../UI/ChartLine";
import { ChartData, Point, ScriptableChartContext } from "chart.js";
import Button from "../../UI/Button";
import { useGetPriceCoins } from "../../../hooks/useGetCoin";
import { useCoinSelector } from "../../../store/hooks";

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

  let showDay: JSX.Element;

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
          const gradientBg = ctx.createLinearGradient(0, 20, 150, 650);
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

  switch (getDay) {
    case 1:
      showDay = (
        <div className="max-sm:text-lg sm:text-base mx-8 bg-gradient-to-r from-gray-200 to-gray-500 text-transparent bg-clip-text">
          24h {selectedInfo?.coin}
        </div>
      );
      break;
    case 14:
      showDay = (
        <div className="max-sm:text-lg sm:text-base mr-8 bg-gradient-to-r from-gray-200 to-gray-500 text-transparent bg-clip-text">
          14 Days {selectedInfo.coin}
        </div>
      );
      break;
    default:
      showDay = (
        <div className="max-sm:text-lg sm:text-base mr-8 bg-gradient-to-r from-gray-200 to-gray-500 text-transparent bg-clip-text">
          30 Days {selectedInfo.coin}
        </div>
      );
  }

  return (
    <div className=" col-span-1 md:col-span-3 lg:col-span-4 md:mx-0 xl:ml-6 max-h-96 max-sm:px-0 max-sm:pb-16 max-sm:pt-4 px-4 pt-4 pb-8 flex flex-col items-center xl:mr-8 glass rounded-lg">
      <div className="w-full flex">
        {showDay}
        <Button
          style={`${
            getDay === 1
              ? "text-white bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300"
              : ""
          }max-sm:text-sm sm:text-base shadow-lg sm:h-auto max-sm:w-16 sm:w-20 bg-slate-900 text-gray-400 border border-gray-400 rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
          onClick={() => setGetDay(1)}
          disable={false}
        >
          1 Day
        </Button>
        <Button
          style={`${
            getDay === 14
              ? "text-white bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300"
              : ""
          }max-sm:text-sm sm:text-base shadow-lg sm:h-auto max-sm:w-16 sm:w-20 bg-slate-900 text-gray-400 border border-gray-400 rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
          onClick={() => setGetDay(14)}
          disable={false}
        >
          14 Days
        </Button>
        <Button
          style={`${
            getDay === 30
              ? "text-white bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300"
              : ""
          }max-sm:text-sm sm:text-base shadow-lg sm:h-auto max-sm:w-16 sm:w-20 bg-slate-900 text-gray-400 border border-gray-400 rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
          onClick={() => setGetDay(30)}
          disable={false}
        >
          30 Days
        </Button>
      </div>
      <ChartLine data={dataset} />
    </div>
  );
}
