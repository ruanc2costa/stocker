import "@/styles/globals.css";
import "@/styles/StockerHeader.css";
import "@/styles/Tickerlist.modules.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
