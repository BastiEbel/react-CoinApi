import HighestCoinChart from "../../CoinCart/OverviewComponent/HighestCoinChart";
import SelectedCoinData from "../../CoinCart/OverviewComponent/SelectedCoinData";

export default function OverviewContainer() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="mx-8 mt-6 glass flex items-center justify-center">
        <SelectedCoinData />
        <div className="border border-gray-500 min-h-52"></div>
        <HighestCoinChart />
      </div>
    </div>
  );
}
