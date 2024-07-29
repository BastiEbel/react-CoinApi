import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getCoins } from "../../util/http";
import CoinCard from "../CoinCart/CoinCard";
import LoadingIndicator from "../UI/LoadingIndicator";

type Coins = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

function CoinContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["allCoins"],
    queryFn: () => getCoins(),
  });
  let content;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (data) {
    content = Object.values(data).map((coin: Coins) => (
      <CoinCard
        key={coin.id}
        title={coin.name}
        price={coin.current_price}
        percent={coin.price_change_percentage_24h}
        image={coin.image}
      />
    ));
  }
  return (
    <div className="w-11/12 m-auto h-52 slider-bg">
      <div className="mb-5">
        <Slider {...settings}>{content}</Slider>
      </div>
    </div>
  );
}

export default CoinContainer;
