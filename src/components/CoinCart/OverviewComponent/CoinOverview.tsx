import { useGetCoins } from "../../../hooks/useGetCoin";
import { useCoinSelector } from "../../../store/hooks";
import { formatterPrices } from "../../../util/formatter";

export default function CoinOverview() {
  const { data } = useGetCoins();
  const setCurrency = useCoinSelector((state) => state.coin.currency[0]);
  const searchTerm = useCoinSelector((state) => state.coin.searchFilter);

  const coins = Array.isArray(data)
    ? data.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-2 scroll-bar xl:mt-6 md:mr-8 xl:ml-3 mb-6 glass flex flex-col items-center">
      <div className="overflow-auto w-full h-72 hover:overflow-y-scroll p-4">
        {coins && coins.length > 0 ? (
          coins.map((coin) => (
            <div
              key={coin!.id}
              className="mb-3 py-2 shadow shadow-white drop-shadow-lg bg-slate-800 border-gray-400 border rounded-3xl flex flex-col justify-center"
            >
              <div className="flex w-full justify-between px-8 items-center mb-2">
                <img className="h-8" src={coin!.image} alt="Coin image" />
                <span className="text-sm 2xl:text-base text-gray-400 text-wrap text-center">
                  {coin?.name}
                </span>
              </div>
              <div className="flex w-full justify-between px-8 items-center">
                <span className="text-sm 2xl:text-base text-gray-400">
                  Price:
                </span>
                <span className="text-sm 2xl:text-base text-gray-400">
                  {formatterPrices(coin!.current_price)}
                  {setCurrency!.currencyName}
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
