import HighestCoinChart from "../CoinCart/OverviewComponent/HighestCoinChart";
import SelectedCoinData from "../CoinCart/OverviewComponent/SelectedCoinData";

export default function OverviewContainer() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-3/4 h-40 mx-8 mt-8 glass flex items-center justify-center">
        <SelectedCoinData />
        <div className="border border-gray-500 h-32"></div>
        <HighestCoinChart />
      </div>
    </div>
  );
}
