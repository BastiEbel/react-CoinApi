import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CoinCard from "../../Layout/Section/CoinCard";
import { settings } from "../../../util/constantOptions";
import { CoinData, useGetCoins } from "../../../hooks/useGetCoin";
import { useCoinDispatch } from "../../../store/hooks";
import { selectedChartData } from "../../../store/coin-slice";

function CoinContainer() {
  const { data } = useGetCoins();
  const dispatch = useCoinDispatch();

  let content;

  function onClickHandler(
    id: string,
    coin: string,
    percent: number,
    price: number,
    image: string
  ) {
    dispatch(
      selectedChartData({
        id,
        coin,
        days: 1,
        percent,
        price,
        image,
      })
    );
  }

  if (Array.isArray(data)) {
    content = data.map((coin: CoinData) => (
      <CoinCard
        onClick={() =>
          onClickHandler(
            coin.id,
            coin.name,
            coin.price_change_percentage_24h,
            coin.current_price,
            coin.image
          )
        }
        key={coin.id}
        title={coin.name}
        price={coin.current_price}
        percent={coin.price_change_percentage_24h}
        image={coin.image}
      />
    ));
  }

  return (
    <div className="px-2 w-11/12 slider-bg">
      <div className="max-[1280px]:my-6 min-[1281px]:my-0">
        <Slider {...settings}>{content}</Slider>
      </div>
    </div>
  );
}

export default CoinContainer;
