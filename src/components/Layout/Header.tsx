function Header() {
  return (
    <>
      <div className="w-full h-24 flex justify-start items-center shadow-md shadow-slate-500">
        <img
          className="w-12 h-12 mx-5"
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
          alt="Coin Api"
        />
        <h1 className="bg-gradient-to-r from-teal-300 to-teal-800 text-transparent bg-clip-text font-bold inline-block text-5xl">
          Coin App
        </h1>
      </div>
    </>
  );
}

export default Header;
