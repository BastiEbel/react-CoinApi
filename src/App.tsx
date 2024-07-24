import { QueryClientProvider } from "@tanstack/react-query";
import CoinContainer from "./components/CoinCart/CoinContainer";
import Layout from "./components/Layout/Layout";
import { queryClient } from "./util/http";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout />
        <CoinContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
