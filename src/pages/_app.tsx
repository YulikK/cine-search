import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../assets/styles/global.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../hooks/theme-provider.tsx';
import { ErrorBoundary } from '../components/error-boundary/error-boundary.tsx';
import { wrapper } from '../store/store.tsx';
import { Loader } from '../components/loader/loader.tsx';

const MyApp = ({ Component, ...pageProps }: AppProps): React.ReactElement => {
  const { store } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const start = (): void => {
    setIsLoading(true);
  };

  const end = (): void => {
    setIsLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return (): void => {
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
