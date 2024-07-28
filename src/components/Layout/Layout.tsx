import CalcChartContainer from "./CalcChartContainer";
import CoinContainer from "./CoinContainer";
import Header from "./Header";

function Layout() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Header />
      <CalcChartContainer />
      <CoinContainer />
    </div>
  );
}

export default Layout;
