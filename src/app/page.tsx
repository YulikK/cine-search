import React from 'react';
import { SearchBar } from '../components/search-bar/search-bar.tsx';
import { MovieCardDetails } from './(details)/movie-card-details.tsx';

import { MovieList } from './(list)/movie-list.tsx';
import { LoaderWrap } from '../components/loader-wrapper/loader-wrapper.tsx';
import { getParams } from '../utils/params.tsx';

const Movies = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): React.ReactElement => {
  const { query, details, page } = searchParams;

  const params = getParams(page, query, details);

  const renderContent = (): React.ReactElement => (
    <LoaderWrap>
      <MovieList searchParams={searchParams} />
    </LoaderWrap>
  );

  const renderMovieDetails = (): React.ReactElement | null => {
    if (params.details) {
      return (
        <LoaderWrap>
          <MovieCardDetails details={params.details} />
        </LoaderWrap>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 flex">
      <div className="flex-1 border-r p-4 overflow-y-auto">
        <SearchBar searchValue={params.query} />
        {renderContent()}
      </div>
      {renderMovieDetails()}
    </div>
  );
};

export default Movies;
