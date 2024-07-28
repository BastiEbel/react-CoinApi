import { ChartData } from "chart.js";
import ChartUI from "../UI/ChartUI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPriceDailyCoins } from "../../util/http";

export default function ChartBox() {
  const { data, isLoading } = useQuery({
    queryKey: ["priceCoins"],
    queryFn: () => getPriceDailyCoins(),
  });
  const [getCoinPrice, setGetCoinPrice] = useState<number[]>([]);
  const [getTime, setGetTime] = useState<string[]>([]);

  /* data.prices.map((res) => {
    console.log(res);
  }); */
  useEffect(() => {
    const coinPrice: number[] = [];
    const coinTime: string[] = [];
    data.prices.map((singleData) => {
      coinPrice.push(singleData[1]);
      const timeFormat = {
        formatMatcher: "basic",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h24",
      };
      const currentDate = new Date(singleData[0]).toLocaleString();
      coinTime.push(currentDate);
    });
    setGetTime(coinTime);
    setGetCoinPrice(coinPrice);
  }, [data]);

  const dataset = {
    labels: getTime,
    datasets: [
      {
        data: getCoinPrice,
        // backgroundColor: ["red", "blue"],
        backgroundColor: (context) => {
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, 20, 100, 800);
          gradientBg.addColorStop(0.225, "transparent");
          gradientBg.addColorStop(1, "#13e2a4");
          return gradientBg;
        },
        fill: true,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "#f5f5f5",
          },
        },
      },
    },
  };

  return (
    <div className="w-3/4">
      <ChartUI chartData={dataset} />
    </div>
  );
}
