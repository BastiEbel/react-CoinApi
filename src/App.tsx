import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import { queryClient } from "./util/http";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </>
  );
}

export default App;
