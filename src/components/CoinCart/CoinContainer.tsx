import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CoinCard from "../Layout/CoinCard";
import { settings } from "../../util/constantOptions";
import {
  CoinData,
  useGetCoins,
  useGetPriceCoins,
} from "../../hooks/useGetCoin";
import { useState } from "react";

function CoinContainer() {
  const [id, setId] = useState<string>("bitcoin");
  const { data, isError } = useGetCoins();
  useGetPriceCoins({ id });

  let content;

  function onClickHandler(id: string) {
    setId(id);
  }

  if (isError) {
    content = (
      <CoinCard
        onClick={() => onClickHandler}
        title={"Fetching failed"}
        price={1}
        percent={1}
        image={"Image"}
      />
    );
  }

  if (Array.isArray(data)) {
    content = data.map((coin: CoinData) => (
      <CoinCard
        onClick={() => onClickHandler(coin.id)}
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
