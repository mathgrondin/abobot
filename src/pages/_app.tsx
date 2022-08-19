import '../styles/globals.scss';
import store from '../app/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function Abobot({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  );
}
