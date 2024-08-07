import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument(): React.ReactElement {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="React Movie is a movie app built with React."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
