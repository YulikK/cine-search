import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../assets/styles/global.scss';
import { ThemeProvider } from '../hooks/theme-provider';
import store from '../store/store';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { RequestParamsProvider } from '../hooks/params-provider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <RequestParamsProvider>
            <Component {...pageProps} />
          </RequestParamsProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default MyApp;
