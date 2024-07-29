import ChartUI from "../UI/ChartUI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ScriptableChartContext } from "chart.js";
import { getPriceDailyCoins } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function ChartBox() {
  const { data, isLoading } = useQuery({
    queryKey: ["priceCoins"],
    queryFn: () => getPriceDailyCoins(),
  });
  const [getCoinPrice, setGetCoinPrice] = useState<number[]>([]);
  const [getTime, setGetTime] = useState<string[]>([]);
  useEffect(() => {
    const coinPrice: number[] = [];
    const coinTime: string[] = [];
    async function fetchPrices() {
      await (data as { prices: [string, number][] }).prices.map(
        (singleData) => {
          coinPrice.push(singleData[1]);
          const currentDate = new Date(singleData[0]).toLocaleTimeString();
          coinTime.push(currentDate);
        }
      );
      setGetTime(coinTime);
      setGetCoinPrice(coinPrice);
    }

    fetchPrices();
  }, [data]);

  let content;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  }

  const dataset = {
    labels: getTime,
    datasets: [
      {
        label: "Bitcoin",
        data: getCoinPrice,
        // backgroundColor: ["red", "blue"],
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
        with: "100%",
      },
    ],
    options: {
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "black",
          },
        },
      },
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

  return (
    <>
      {content}
      <div className="w-full h-full flex items-center mr-10">
        <ChartUI chartData={dataset} />
      </div>
    </>
  );
}
