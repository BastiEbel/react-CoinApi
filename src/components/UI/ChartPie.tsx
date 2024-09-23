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
  width: string;
  height: string;
};

export default function ChartPie({ data, width, height }: ChartUIProps) {
  console.log(height, width);

  return (
    <Pie
      data={data as ChartData<"pie", (number | string | Point)[], unknown>}
      options={{
        responsive: true,
        plugins: { legend: { display: true, position: "left" } },
      }}
      style={{ height: height, width: width }}
    />
  );
}
