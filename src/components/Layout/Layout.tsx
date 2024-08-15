import CalcChartContainer from "./CalcChartContainer";
import CoinContainer from "../CoinCart/CoinContainer";
import Header from "./Header";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import { useGetCoins } from "../../hooks/useGetCoin";

function Layout() {
  const { isError, isLoading } = useGetCoins();
  let content;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="flex justify-center items-center">
        <ErrorBlock
          title="An Error has occurred"
          message="Fetching data failed"
        />
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Header />
      {content}
      <CalcChartContainer />
      <CoinContainer />
    </div>
  );
}

export default Layout;
