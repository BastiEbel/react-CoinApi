import Layout from "./components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./hooks/useGetCoin";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
