import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
  ChartData,
  PointElement,
  Filler,
  Point,
} from "chart.js";
//import { useEffect, useRef } from "react";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  Filler
);

type ChartUIProps = {
  data: ChartData<"pie", (number | string | Point)[], unknown>;
};

export default function ChartPie({ data }: ChartUIProps) {
  return (
    <Pie
      data={data as ChartData<"pie", (number | string | Point)[], unknown>}
      width={"5rem"}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
      }}
    />
  );
}
