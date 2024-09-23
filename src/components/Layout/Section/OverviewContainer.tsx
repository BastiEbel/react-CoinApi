import CoinOverview from "../../CoinCart/OverviewComponent/CoinOverview";
import HighestCoinChart from "../../CoinCart/OverviewComponent/HighestCoinChart";
import SelectedCoinData from "../../CoinCart/OverviewComponent/SelectedCoinData";

export default function OverviewContainer() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center my-6 px-8">
      <div className="mx-4 lg:mx-8 w-full lg:w-3/4 lg:mt-6 glass flex items-center md:justify-around justify-center">
        <SelectedCoinData />
        <div className="border border-gray-500 min-h-52"></div>
        <HighestCoinChart />
      </div>
      <div className="scroll-bar xl:mx-4 lg:mr-8 w-full lg:w-1/4 mt-6 glass flex flex-col items-center">
        <CoinOverview />
      </div>
    </div>
  );
}
