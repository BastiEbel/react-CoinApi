import { useQuery } from "@tanstack/react-query";
import { CoinData, getCoins } from "../../util/http";
import CoinCard from "../UI/CoinCard";
import classes from "./CoinContainer.module.css";
import LoadingIndicator from "../UI/LoadingIndicator";

function CoinContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: () => getCoins(),
  });
  let content;
  console.log(data);

  if (isLoading) {
    content = (
      <div className={classes.loading}>
        <LoadingIndicator />
      </div>
    );
  }

  if (data instanceof Array) {
    content = data.map((coin: CoinData) => (
      <CoinCard
        key={coin.id}
        title={coin.title}
        price={coin.current_price}
        percent={coin.price_change_percentage_24h}
        image={coin.image}
      />
    ));
  }
  return (
    <>
      <div className={classes.content}>{content}</div>
    </>
  );
}

export default CoinContainer;
