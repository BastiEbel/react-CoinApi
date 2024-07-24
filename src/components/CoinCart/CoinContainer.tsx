import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../../util/http";
import CoinCard from "../UI/CoinCard";
import classes from "./CoinContainer.module.css";
import LoadingIndicator from "../UI/LoadingIndicator";

type Coins = {
  id: string;
  title: string;
  image: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
};

function CoinContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: () => getCoins(),
  });
  let content;

  if (isLoading) {
    content = (
      <div className={classes.loading}>
        <LoadingIndicator />
      </div>
    );
  }

  if (data) {
    content = Object.values(data).map((coin: Coins) => (
      <CoinCard
        key={coin.id}
        title={coin.title}
        price={coin.price_change_24h}
        percent={coin.price_change_percentage_24h}
        image={coin.image}
      />
    ));
  }
  return (
    <>
      <div className="md:w-full">{content}</div>
    </>
  );
}

export default CoinContainer;
