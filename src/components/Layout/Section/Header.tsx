import Input from "../../UI/Input";

function Header() {
  return (
    <>
      <div className="w-full h-24 flex justify-between items-center shadow-md shadow-slate-500">
        <div className="flex">
          <img
            className="w-12 h-12 mx-5"
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
            alt="Coin Api"
          />
          <h1 className="bg-gradient-to-r from-teal-300 to-teal-800 text-transparent bg-clip-text font-bold inline-block text-5xl">
            Coin App
          </h1>
        </div>
        <div>
          <Input
            disable={false}
            placeholder="find Coin"
            style="h-8 text-center text-base bg-transparent px-2 text-gray-300 mx-2 bg-gradient-to-r from-stone-500 to-stone-700 border border-gray-400 rounded-xl"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
