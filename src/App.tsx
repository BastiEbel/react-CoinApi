import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { queryClient } from "./hooks/useGetCoin";

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
