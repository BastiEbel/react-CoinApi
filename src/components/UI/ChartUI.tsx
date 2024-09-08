import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  ChartData,
  Point,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

type ChartUIProps = {
  data:
    | ChartData<"line", (number | Point)[], unknown>
    | ChartData<"pie", number[], unknown>;
  chartType: "line" | "pie";
};

export default function ChartUI({ data, chartType }: ChartUIProps) {
  return (
    <>
      {chartType === "line" ? (
        <Line
          data={data as ChartData<"line", (number | Point)[], unknown>} // Type assertion for line chart
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: { legend: { display: false } },
          }}
          style={{ height: "20rem", width: "100%" }}
        />
      ) : (
        <Pie
          data={data as ChartData<"pie", number[], unknown>} // Type assertion for pie chart
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: { legend: { display: true } },
          }}
          style={{ height: "20rem", width: "100%" }}
        />
      )}
    </>
  );
}
