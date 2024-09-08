import SelectedCoinData from "../CoinCart/SelectedCoinData";

export default function OverviewContainer() {
  return (
    <div className="w-full flex items-center">
      <div className="w-3/4 h-40 mx-8 mt-8 glass flex items-center justify-center">
        <SelectedCoinData />
        <div className="border h-32"></div>
      </div>
    </div>
  );
}
