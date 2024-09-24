import { useEffect, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useCoinDispatch } from "../../../store/hooks";
import { loadCurrency } from "../../../store/coin-slice";

function Header() {
  const [currency, setCurrency] = useState(false);
  const dispatch = useCoinDispatch();

  useEffect(() => {
    dispatch(
      loadCurrency({
        currencyCoin: currency === true ? "usd" : "eur",
        currencyName: currency === true ? "USD" : "EUR",
      })
    );
  }, [currency, dispatch]);

  function onClickCurrencyChangeHandler() {
    setCurrency(!currency);
  }

  return (
    <>
      <div className="w-full h-24 flex justify-between items-center shadow-md shadow-slate-500">
        <div className="flex">
          <img
            className="w-9 h-9 xs:w-12 xs:h-12 mx-5"
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
            alt="Coin Api"
          />
          <h1 className="bg-gradient-to-r from-teal-300 to-teal-800 text-transparent bg-clip-text font-bold inline-block text-3xl xs:text-5xl">
            Coin App
          </h1>
        </div>
        <div className="flex flex-col justify-between items-center mr-8">
          <Input
            disable={false}
            placeholder="find Coin"
            style="h-6 xs:h-8 text-center text-base bg-transparent px-0 md:px-2 text-gray-300 mx-2 bg-gradient-to-r from-stone-500 to-stone-700 border border-gray-400 rounded-xl"
          />
          <Button
            disable={false}
            onClick={onClickCurrencyChangeHandler}
            style={`shadow shadow-sm h-6 md:h-8 mt-2 xs:mt-0 xs:ml-4 shadow-white py-1 cursor-pointer px-2 text-gray-300 border border-gray-400 rounded-2xl lg:text-sm xl:text-base min-w-24 ${
              currency
                ? "bg-slate-900 bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300"
                : "bg-slate-800"
            }`}
          >
            {currency === true ? "USD" : "EUR"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
