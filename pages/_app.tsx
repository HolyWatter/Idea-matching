import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/nav/Nav";
import { RecoilRoot } from "recoil";
import Footer from "../components/footer/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Nav />
        <div className="min-w-5xl min-h-screen bg-bg pt-28">
          <Component {...pageProps} />
        </div>
        <Footer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
