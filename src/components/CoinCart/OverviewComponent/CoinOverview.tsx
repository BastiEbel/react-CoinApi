import { useGetCoins } from "../../../hooks/useGetCoin";
import { useCoinSelector } from "../../../store/hooks";
import { formatterPrices } from "../../../util/formatter";

export default function CoinOverview() {
  const { data } = useGetCoins();
  const setCurrency = useCoinSelector((state) => state.coin.currency[0]);

  const coins = Array.isArray(data) ? data : [data];

  return (
    <div className="col-span-2 scroll-bar xl:mr-8 lg:mr-3 lg:mb-6 xl:my-6 glass flex flex-col items-center">
      <div className="overflow-auto lg:h-72 hover:overflow-y-scroll h-64 p-4">
        {coins && coins.length > 0 ? (
          coins.map((coin) => (
            <div
              key={coin!.id}
              className="mb-3 py-2 shadow shadow-white drop-shadow-lg bg-slate-800 border-gray-400 border rounded-3xl flex flex-col justify-center"
            >
              <div className="flex w-full justify-between px-8 items-center mb-2">
                <img className="h-8" src={coin?.image} alt="Coin image" />
                <span className="text-base text-gray-400 text-wrap text-center">
                  {coin?.name}
                </span>
              </div>
              <div className="flex w-full justify-between px-8 items-center">
                <span className="text-base text-gray-400">Price:</span>
                <span className="text-base text-gray-400">
                  {formatterPrices(coin?.current_price)}{" "}
                  {setCurrency?.currencyName}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
}
