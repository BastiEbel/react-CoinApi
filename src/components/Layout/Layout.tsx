import { useCallback, useEffect } from "react";

import CalcChartContainer from "./CalcChartContainer";
import CoinContainer from "../CoinCart/CoinContainer";
import Header from "./Header";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import { useGetCoins } from "../../hooks/useGetCoin";
import OverviewContainer from "./OverviewContainer";
import { selectedChartData } from "../../store/coin-slice";
import { useCoinDispatch } from "../../store/hooks";

function Layout() {
  const { data, isError, isLoading } = useGetCoins();
  let content;

  const dispatch = useCoinDispatch();

  const fetchCoinData = useCallback(() => {
    if (Array.isArray(data) && data.length > 0) {
      const getData = data[0];

      dispatch(
        selectedChartData({
          id: getData.id,
          coin: getData.name,
          days: 1,
          percent: getData.price_change_percentage_24h,
          price: getData.current_price,
          image: getData.image,
          currency: "EUR",
        })
      );
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (!isLoading && !isError) {
      // Only fetch data if not loading or error
      fetchCoinData();
    }
  }, [fetchCoinData, isLoading, isError]);

  if (isLoading) {
    content = (
      <div className="h-screen flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="h-screen flex justify-center items-center">
        <ErrorBlock
          title="An Error has occurred"
          message="Fetching data failed"
        />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <OverviewContainer />
        <CalcChartContainer />
        <CoinContainer />
      </>
    );
  }
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      {content}
    </div>
  );
}

export default Layout;
