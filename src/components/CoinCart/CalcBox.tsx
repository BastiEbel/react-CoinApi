import { useCoinSelector } from "../../store/hooks";
import Button from "../UI/Button";
import Input from "../UI/Input";

export default function CalcBox() {
  const selectInfo = useCoinSelector((state) => state.coin.items[0]);
  function onClickExchangeHandler() {}

  return (
    <div className="w-2/5 h-5/6 mx-8 flex flex-col items-center justify-evenly glass ">
      <span className="text-2xl w-3/4 bg-gradient-to-r from-gray-300 to-gray-800 text-transparent bg-clip-text">
        Exchange
      </span>
      <div className="w-full flex flex-col items-center ">
        <p className="w-3/4 flex justify-start mb-2 text-gray-300">Amount:</p>
        <div className="w-3/4 bg-gradient-to-r from-stone-500 to-stone-700 border rounded-2xl flex items-center">
          <Input
            disable={false}
            value={1}
            placeholder="Amount"
            style="w-5/6 h-10 text-center text-xl bg-transparent px-2 text-gray-200 mx-2"
          />
          <div className="border border-l-0 h-6"></div>
          <div className="w-1/6 b flex justify-center">
            <img className=" h-8" src={selectInfo?.image} alt="Coin Picture" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center ">
        <p className="w-3/4 flex justify-start mb-2 text-gray-200">Price:</p>
        <div className="w-3/4 bg-gradient-to-r from-stone-500 to-stone-700 border rounded-2xl flex items-center">
          <Input
            disable={true}
            value={selectInfo?.price}
            placeholder="Coin Price"
            style="w-5/6 h-10 text-center text-xl bg-transparent px-2 text-gray-300 mx-2"
          />
          <div className="border border-l-0 h-6"></div>
          <div className="w-1/6 b flex justify-center">
            <div className="text-gray-300 flex items-center">
              {selectInfo?.currency}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={onClickExchangeHandler}
        style={`shadow shadow-lg h-10 w-48 bg-slate-900 text-gray-300 border rounded-xl mx-2 cursor-pointer hover:bg-gradient-to-r from-teal-700 to-teal-900 transition duration-300 hover:text-white hover:shadow-teal-200/20 transition duration-300`}
      >
        Exchange
      </Button>
    </div>
  );
}
