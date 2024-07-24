import classes from "./Header.module.css";

function Header() {
  return (
    <>
      <div className={classes.headerContainer}>
        <img
          className={classes.image}
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
          alt="Coin Api"
        />
        <h1>Coin App</h1>
      </div>
    </>
  );
}

export default Header;
