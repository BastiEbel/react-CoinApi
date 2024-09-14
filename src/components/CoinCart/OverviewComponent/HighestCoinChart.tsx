import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetCoins } from "../../../hooks/useGetCoin";
import { ChartData, Point } from "chart.js";
import ChartPie from "../../UI/ChartPie";
import { formatterPrices } from "../../../util/formatter";

interface HighestChange {
  symbol: string;
  change: number;
}

type HighestChanges = HighestChange[];

export default function HighestCoinChart() {
  const { data } = useGetCoins();
  const [highestChanges, setHighestChanges] = useState<HighestChanges | null>(
    null
  );

  const loadSortData = useCallback(() => {
    if (Array.isArray(data) && data) {
      const sortedData = data
        .slice()
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );

      const topThree: HighestChanges = sortedData.slice(0, 3).map((item) => ({
        symbol: item.symbol,
        change: item.price_change_percentage_24h.toFixed(2),
      }));

      setHighestChanges(topThree);
    }
  }, [data]);

  useEffect(() => {
    loadSortData();
  }, [loadSortData]);

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
        <div className="flex mx-8">
          <div>
            <ChartPie data={dataset} />
          </div>
          <ul className="ml-8 flex items-start justify-around flex-col">
            {highestChanges.map((highestItem) => (
              <li
                className="text-gray-400 flex items-center justify-between w-32 text-lg"
                key={highestItem.symbol}
              >
                {highestItem.symbol}:{" "}
                <p style={{ color: "#00dc00" }}>
                  {formatterPrices(highestItem.change)}%
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}
