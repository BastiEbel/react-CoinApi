import { useGetCoins } from "../../../hooks/useGetCoin";
import { useCoinSelector } from "../../../store/hooks";
import { formatterPrices } from "../../../util/formatter";

export default function CoinOverview() {
  const { data } = useGetCoins();
  const setCurrency = useCoinSelector((state) => state.coin.items[0]);

  const coins = Array.isArray(data) ? data : [data];

  return (
    <div className="overflow-scroll h-64 lg:p-2 xl:p-4">
      {coins && coins.length > 0 ? (
        coins.map((coin) => (
          <div
            key={coin.id}
            className="overflow-scroll mb-3 py-2 shadow shadow-white drop-shadow-lg bg-slate-800 border-gray-400 border rounded-3xl flex flex-col justify-center"
          >
            <div className="flex w-full justify-between lg:px-4 xl:px-8 items-center mb-2">
              <img className="h-8" src={coin.image} alt="Coin image" />
              <span className="lg:text-sm xl:text-base text-gray-400 text-wrap text-center">
                {coin.name}
              </span>
            </div>
            <div className="flex w-full justify-between lg:px-4 xl:px-8 items-center">
              <span className="lg:text-sm xl:text-base text-gray-400">
                Price:
              </span>
              <span className="lg:text-sm xl:text-base text-gray-400">
                {formatterPrices(coin.current_price)} {setCurrency?.currency}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}
