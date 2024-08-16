import { useCallback, useEffect, useState } from "react";

import ChartUI from "../UI/ChartUI";
import { ScriptableChartContext } from "chart.js";
import Button from "../UI/Button";
import { useGetPriceCoins } from "../../hooks/useGetCoin";

export default function ChartBox() {
  const [getDay, setGetDay] = useState<number>(1);
  const { data, isFetched } = useGetPriceCoins(getDay);
  const [getCoinPrice, setGetCoinPrice] = useState<number[]>([]);
  const [getTime, setGetTime] = useState<string[]>([]);

  let content;
  const fetchData = useCallback(async () => {
    const coinPrice: number[] = [];
    const coinTime: string[] = [];
    let currentDate: string;

    if (isFetched) {
      await data.prices?.map((singleData: number[]) => {
        coinPrice.push(singleData[1]);
        if (getDay === 1) {
          currentDate = new Date(singleData[0]).toLocaleTimeString();
        } else {
          currentDate = new Date(singleData[0]).toLocaleDateString();
        }
        coinTime.push(currentDate);
      });
    }
    setGetTime(coinTime);
    setGetCoinPrice(coinPrice);
  }, [getDay, data, isFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function onClickOneDayHandler() {
    if (getDay === 1) {
      return;
    }
    setGetDay(1);
  }

  function onClickTwoWeeksHandler() {
    if (getDay === 14) {
      return;
    }
    setGetDay(14);
  }

  function onClickOneMonthHandler() {
    if (getDay === 30) {
      return;
    }
    setGetDay(30);
  }

  const dataset = {
    labels: getTime,
    datasets: [
      {
        label: "Bitcoin",
        data: getCoinPrice,
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
        borderColorWidth: 2,
        width: "100%",
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          ticks: {
            color: "#f5f5f5",
          },
        },
        x: {
          ticks: {
            color: "#f5f5f5",
          },
        },
      },
    },
  };

  if (data) {
    content = (
      <div className="w-full h-full flex flex-col items-center mr-10">
        <div className="w-full">
          <Button
            style="shadow shadow-lg h-auto w-20 bg-slate-900 text-gray-400 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300"
            onClick={onClickOneDayHandler}
          >
            1 Day
          </Button>
          <Button
            style="shadow shadow-lg h-auto w-20 bg-slate-900 text-gray-400 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300"
            onClick={onClickTwoWeeksHandler}
          >
            14 Days
          </Button>
          <Button
            style=" shadow shadow-lg h-auto w-20 bg-slate-900 text-gray-400 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300"
            onClick={onClickOneMonthHandler}
          >
            30 Days
          </Button>
        </div>
        <ChartUI data={dataset} />
      </div>
    );
  }

  return <>{content}</>;
}
