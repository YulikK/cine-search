import React from 'react';
import { SearchIcon } from '../icons/search-icon/search-icon';
import { ButtonBackHome } from '../button-back-home/button-back-home';

export const NoResults: React.FC = () => (
  <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-md text-center">
      <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        No results found
      </h1>
      <p className="mt-4 text-muted-foreground">
        Sorry, we couldn&apos;t find any results matching your search. Please
        try a different search query.
      </p>
      <ButtonBackHome />
    </div>
  </div>
);
