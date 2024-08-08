import React from 'react';
import { useTheme } from '../../hooks/theme-provider.tsx';
import { ButtonBackHome } from '../../components/button-back-home/button-back-home.tsx';

const Page404: React.FC = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      data-theme={isDarkTheme ? 'dark' : 'light'}
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
          404
        </h1>
        <p className="mt-4 text-muted-foreground">
          Oops, the page you are looking for could not be found.
        </p>
        <ButtonBackHome />
      </div>
    </div>
  );
};

export default Page404;
