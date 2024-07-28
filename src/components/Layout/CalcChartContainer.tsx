import CalcBox from "../CoinCart/CalcBox";
import ChartBox from "../CoinCart/ChartBox";

export default function CalcChartContainer() {
  return (
    <div className="w-full h-screen flex items-center">
      <CalcBox />
      <ChartBox />
    </div>
  );
}
