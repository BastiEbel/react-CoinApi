import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetCoins } from "../../../hooks/useGetCoin";
import { ChartData, Point } from "chart.js";
import ChartPie from "../../UI/ChartPie";
import { formatterPrices } from "../../../util/formatter";
import Button from "../../UI/Button";

interface HighestChange {
  symbol: string;
  change: number;
  currency: string;
  id: number;
}

const nameButtons = [
  { id: 1, name: "Percentage Change" },
  { id: 2, name: "Price Change" },
  { id: 3, name: "Cheapest Price" },
];

type HighestChanges = HighestChange[];

export default function HighestCoinChart() {
  const { data } = useGetCoins();
  const [highestChanges, setHighestChanges] = useState<HighestChanges | null>(
    null
  );
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const loadSortData = useCallback(
    (id: number) => {
      if (Array.isArray(data) && data) {
        let sortedData;
        let topThree: HighestChanges;
        switch (id) {
          case 0:
            sortedData = data
              .slice()
              .sort(
                (a, b) =>
                  b.price_change_percentage_24h - a.price_change_percentage_24h
              );
            topThree = sortedData.slice(0, 3).map((item) => ({
              symbol: item.symbol,
              change: item.price_change_percentage_24h.toFixed(2),
              currency: "%",
              id: 0,
            }));
            break;
          case 1:
            sortedData = data
              .slice()
              .sort((a, b) => b.price_change_24h - a.price_change_24h);
            topThree = sortedData.slice(0, 3).map((item) => ({
              symbol: item.symbol,
              change: item.price_change_24h.toFixed(2),
              currency: "€",
              id: 1,
            }));
            break;
          case 2:
            sortedData = data
              .slice()
              .sort((a, b) => a.current_price - b.current_price);
            topThree = sortedData.slice(0, 3).map((item) => ({
              symbol: item.symbol,
              change: item.current_price,
              currency: "€",
              id: 2,
            }));

            break;
          default:
            return;
        }

        setHighestChanges(topThree);
      }
    },
    [data]
  );

  useEffect(() => {
    loadSortData(activeButtonIndex);
  }, [loadSortData, activeButtonIndex]);

  const dataset: ChartData<"pie", (number | string | Point)[], unknown> =
    useMemo(
      () => ({
        labels: highestChanges?.map((item) => item.symbol),
        datasets: [
          {
            label: "Highest Changes",
            backgroundColor: ["#B48CFF", "#8D8CFF", "#8CD3FF"],
            data:
              highestChanges?.map((highestItem) => highestItem.change) || [],
            borderWidth: 1,
          },
        ],
      }),
      [highestChanges]
    );

  return (
    <>
      {highestChanges && highestChanges.length > 0 ? (
        <div className="flex flex-col items-center ml-4 mr-8">
          <p className="my-2 bg-gradient-to-r from-gray-300 to-gray-600 text-transparent bg-clip-text">
            Highest Changes
          </p>
          <div className="flex">
            <div>
              <ChartPie data={dataset} />
            </div>
            <ul className="m-8 mr-12 flex items-start justify-around flex-col">
              {highestChanges.map((highestItem) => (
                <li
                  className="text-gray-400 flex items-center justify-between text-lg"
                  key={highestItem.symbol}
                >
                  {highestItem.symbol}:
                  <div
                    style={{
                      color: "#00dc00",
                      marginLeft: "0.25rem",
                      textAlign: "center",
                    }}
                  >
                    {highestItem.id === 2
                      ? highestItem.change
                      : formatterPrices(highestItem.change)}{" "}
                    {highestItem.currency}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-around items-center">
              {nameButtons.map((button, index) => (
                <Button
                  key={button.id}
                  disable={false}
                  onClick={() => {
                    setActiveButtonIndex(index); // Setze den aktiven Button-Index
                    loadSortData(index);
                  }}
                  style={`shadow shadow-lg py-1 px-2 text-gray-300 border rounded-2xl {screen}:text-base w-44 ${
                    activeButtonIndex === index
                      ? "bg-slate-900 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300"
                      : "bg-slate-700 cursor-default"
                  }`}
                >
                  {button.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}
