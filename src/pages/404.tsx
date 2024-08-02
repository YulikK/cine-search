import React, { useEffect } from 'react';

import { ButtonBackHome } from '../components/button-back-home/button-back-home';
import { useRequestParamsContext } from '../hooks/params-provider';
import { useTheme } from '../hooks/theme-provider';

const Page404: React.FC = () => {
  const { setParams } = useRequestParamsContext();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    console.log('setParams');
    setParams({ page: 0, query: '', details: 0 });
  }, []);

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
