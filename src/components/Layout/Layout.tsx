import { useCallback, useEffect } from "react";

import CoinContainer from "../CoinCart/ListCoinsComponent/CoinContainer";
import Header from "./Section/Header";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import { useGetCoins } from "../../hooks/useGetCoin";
import { selectedChartData } from "../../store/coin-slice";
import { useCoinDispatch } from "../../store/hooks";
import SelectedCoinData from "../CoinCart/OverviewComponent/SelectedCoinData";
import HighestCoinChart from "../CoinCart/OverviewComponent/HighestCoinChart";
import CoinOverview from "../CoinCart/OverviewComponent/CoinOverview";
import CalcBox from "../CoinCart/CalcChartComponent/CalcBox";
import ChartBox from "../CoinCart/CalcChartComponent/ChartBox";

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
        })
      );
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (!isLoading && !isError) {
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
        <div className="grid lg:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-4 lg:h-72 xl:mx-8 my-6 glass flex items-center justify-around">
            <SelectedCoinData />
            <div className="border border-gray-500 min-h-52"></div>
            <HighestCoinChart />
          </div>
          <CoinOverview />
          <CalcBox />
          <ChartBox />
        </div>
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
