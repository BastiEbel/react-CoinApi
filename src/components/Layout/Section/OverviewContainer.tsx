import CoinOverview from "../../CoinCart/OverviewComponent/CoinOverview";
import HighestCoinChart from "../../CoinCart/OverviewComponent/HighestCoinChart";
import SelectedCoinData from "../../CoinCart/OverviewComponent/SelectedCoinData";

export default function OverviewContainer() {
  return (
    <div className="w-full flex items-center">
      <div className="mx-8 w-3/4 mt-6 glass flex items-center justify-center">
        <SelectedCoinData />
        <div className="border border-gray-500 min-h-52"></div>
        <HighestCoinChart />
      </div>
      <div className="mr-8 w-1/4 mt-6 glass flex-col items-center">
        <CoinOverview />
      </div>
    </div>
  );
}
