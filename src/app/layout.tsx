import '../assets/styles/global.scss';
import React from 'react';
import { Metadata } from 'next';
import { ThemeProvider } from '../hooks/theme-provider.tsx';
import { StoreWrap } from '../components/store-wrap/store-wrap.tsx';
import { ThemeWrap } from '../components/theme-wrap/theme-wrap.tsx';

export const metadata: Metadata = {
  title: 'React Movie',
  description: 'React Movie is a movie app built with React.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.ico',
    },
  ],
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <html>
    <head>
      <link rel="icon" href="/favicon.png" />
    </head>

    <body>
      <React.StrictMode>
        <StoreWrap>
          <ThemeProvider>
            <ThemeWrap>{children}</ThemeWrap>
          </ThemeProvider>
        </StoreWrap>
      </React.StrictMode>
    </body>
  </html>
);

export default RootLayout;
