import CalcBox from "../CoinCart/CalcBox";
import ChartBox from "../CoinCart/ChartBox";

export default function CalcChartContainer() {
  return (
    <div className="w-full max-h-96 my-8 flex items-center justify-between">
      <CalcBox />
      <ChartBox />
    </div>
  );
}
