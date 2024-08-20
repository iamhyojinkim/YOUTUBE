import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import YoutubeApiProvider from "./Context/YoutubeApi";

const queryCient = new QueryClient();
function App() {
  return (
    <>
      <YoutubeApiProvider>
        <QueryClientProvider client={queryCient}>
          <Navbar />
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}

export default App;
