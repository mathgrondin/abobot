import '../styles/globals.scss';
import type { AppProps } from 'next/app';

export default function Abobot({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
