import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useCoinDispatch } from "../../../store/hooks";
import { loadCurrency, selectSearchTerm } from "../../../store/coin-slice";

function Header() {
  const [currency, setCurrency] = useState(false);
  const dispatch = useCoinDispatch();

  useEffect(() => {
    dispatch(
      loadCurrency({
        currencyCoin: currency ? "usd" : "eur",
        currencyName: currency ? "USD" : "EUR",
      })
    );
  }, [currency, dispatch]);

  function onClickCurrencyChangeHandler() {
    setCurrency(!currency);
  }

  function onChangeSearchHandler(event: ChangeEvent<HTMLInputElement>) {
    dispatch(selectSearchTerm(event.target.value));
  }

  return (
    <>
      <div className="w-full py-4 flex justify-between items-center shadow-md shadow-slate-500">
        <div className="flex items-center justify-between">
          <img
            className="w-9 h-9 sm:w-12 sm:h-12 mx-5"
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
            alt="Coin Api"
          />
          <h1 className="bg-gradient-to-r from-teal-300 to-teal-800 text-transparent bg-clip-text font-bold inline-block text-3xl sm:text-5xl">
            Coin App
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mr-2 sm:mr-8">
          <Input
            onChange={onChangeSearchHandler}
            disable={false}
            type="text"
            placeholder="find Coin"
            style="h-6 sm:h-8 text-center text-base bg-transparent px-0 md:px-2 text-gray-300 mx-2 bg-gradient-to-r from-stone-500 to-stone-700 border border-gray-400 rounded-xl"
          />
          <Button
            disable={false}
            onClick={onClickCurrencyChangeHandler}
            style={`shadow shadow-sm h-6 md:h-8 mt-2 sm:mt-0 sm:ml-4 shadow-white py-1 cursor-pointer px-2 text-gray-300 border border-gray-400 rounded-2xl flex justify-center items-center text-sm xl:text-base min-w-24 ${
              currency
                ? "bg-slate-900 bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300"
                : "bg-slate-800"
            }`}
          >
            {currency ? "USD" : "EUR"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
