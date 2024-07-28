import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ButtonBackHome } from '../../components/button-back-home/button-back-home.tsx';
import { useTheme } from '../../hooks/use-theme.tsx';

export const Page404: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    setSearchParams({});
  }, [setSearchParams]);

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
