import { Line } from "react-chartjs-2";
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
  data: ChartData<"line">;
};

export default function ChartUI({ data }: ChartUIProps) {
  return <Line data={data} redraw={true} />;
}
