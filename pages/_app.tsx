import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/nav/Nav";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Nav />
      <div className="min-w-5xl min-h-screen bg-bg pt-28">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
