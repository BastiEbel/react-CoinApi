import CalcBox from "../../CoinCart/CalcChartComponent/CalcBox";
import ChartBox from "../../CoinCart/CalcChartComponent/ChartBox";

export default function CalcChartContainer() {
  return (
    <div className="w-full max-h-96 my-6 flex items-center justify-between">
      <CalcBox />
      <ChartBox />
    </div>
  );
}
