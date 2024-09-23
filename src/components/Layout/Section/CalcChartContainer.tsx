import CalcBox from "../../CoinCart/CalcChartComponent/CalcBox";
import ChartBox from "../../CoinCart/CalcChartComponent/ChartBox";

export default function CalcChartContainer() {
  return (
    <div className="w-full max-h-96 px-8 lg:my-6 lg:flex flex-col items-center lg:justify-between">
      <CalcBox />
      <ChartBox />
    </div>
  );
}
