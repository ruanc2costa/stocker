import '@/styles/globals.css'
import '@/styles/StockerHeader.css'
import '@/styles/TickerList.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
