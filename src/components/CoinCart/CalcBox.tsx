import Button from "../UI/Button";
import Input from "../UI/Input";

export default function CalcBox() {
  function onClickExchangeHandler() {}

  return (
    <div className="w-2/5 h-5/6 mx-8 flex flex-col items-center justify-evenly glass ">
      <h4>Exchange</h4>
      <div className="w-full flex justify-center w-">
        <Input
          placeholder="Mount"
          style="h-10 px-2 w-2/4 bg-gradient-to-r from-stone-700 to-stone-900 text-gray-300 border rounded-xl mx-2 outline"
        />
      </div>
      <div className="w-full flex justify-center">
        <Input
          placeholder="Coin Price"
          style="h-10 px-2 w-2/4 bg-gradient-to-r from-stone-700 to-stone-900 text-gray-300 border rounded-xl mx-2 outline"
        />
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
