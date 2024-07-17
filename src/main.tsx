import './assets/styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.tsx';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
