import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Provider } from 'react-redux';
import './tailwind.css';

import { ThemeProvider } from './utils/theme-provider';
import { makeStore } from './store/store';
import { LinksFunction } from '@remix-run/node';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
];

export default function App() {
  return (
    <Provider store={makeStore}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}
