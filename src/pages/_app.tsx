import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../assets/styles/global.scss';
import { ThemeProvider } from '../hooks/theme-provider';
import store from '../store/store';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { RequestParamsProvider } from '../hooks/params-provider';
import React from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider>
            <RequestParamsProvider>
              <Component {...pageProps} />
            </RequestParamsProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>
  );
};

export default MyApp;
