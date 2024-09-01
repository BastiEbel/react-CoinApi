import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CoinCard from "../Layout/CoinCard";
import { settings } from "../../util/constantOptions";
import { CoinData, useGetCoins } from "../../hooks/useGetCoin";
import { useCoinDispatch } from "../../store/hooks";
import { selectedChartData } from "../../store/coin-slice";
import { useCallback, useEffect } from "react";

function CoinContainer() {
  const { data, isError } = useGetCoins();
  const dispatch = useCoinDispatch();

  let content;
  const id = "bitcoin";

  const fetchCoinData = useCallback(async () => {
    if (Array.isArray(data)) {
      const getData = await data[0];

      dispatch(
        selectedChartData({
          id: getData.id,
          coin: getData.name,
          days: 1,
          price: getData.current_price,
          image: getData.image,
          currency: "EUR",
        })
      );
    }
  }, [dispatch, data]);

  useEffect(() => {
    fetchCoinData();
  }, [fetchCoinData, dispatch]);

  function onClickHandler(
    id: string,
    coin: string,
    price: number,
    image: string
  ) {
    dispatch(
      selectedChartData({ id, coin, days: 1, price, image, currency: "EUR" })
    );
  }

  if (isError) {
    content = (
      <CoinCard
        onClick={() => id}
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
        onClick={() =>
          onClickHandler(coin.id, coin.name, coin.current_price, coin.image)
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
    <div className="w-11/12 m-auto h-52 slider-bg">
      <div className="mb-5">
        <Slider {...settings}>{content}</Slider>
      </div>
    </div>
  );
}

export default CoinContainer;
