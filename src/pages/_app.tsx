import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../assets/styles/global.scss';
import { ThemeProvider } from '../hooks/theme-provider';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import React, { useEffect, useState } from 'react';
import { wrapper } from '../store/store';
import { useRouter } from 'next/router';
import { Loader } from '../components/loader/loader';

const MyApp = ({ Component, ...pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const start = () => {
    setIsLoading(true);
  };

  const end = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider>
            {isLoading ? <Loader /> : <Component {...pageProps} />}
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );
};

export default MyApp;
