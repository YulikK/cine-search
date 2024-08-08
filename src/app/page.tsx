import React from 'react';
import { ApiService } from '../services/api.tsx';
import { ListView } from '../components/list-view/list-view.tsx';
import { Pagination } from '../components/pagination/pagination.tsx';
import { DEFAULT_PAGE } from '../common/constant.tsx';
import { FavoritePopup } from '../components/popup-favorite/popup-favorite.tsx';
import { SearchBar } from '../components/search-bar/search-bar.tsx';
import { getParams } from '../utils/params.tsx';
import { MovieCardDetails } from '../components/movie-card-details/movie-card-details.tsx';
import { MoviesDetails, MoviesItem, QueryParams } from '../types/api.tsx';
import { ThemeWrap } from '../components/theme-wrap/theme-wrap.tsx';

interface DataType {
  movieList: MoviesItem[] | undefined;
  movieDetails: MoviesDetails | null;
  totalPages: number | undefined;
}
export const getData = async (params: QueryParams): Promise<DataType> => {
  const movieData = await ApiService.fetchMovie(params);
  const { results: movieList, totalPages } = movieData || {};
  const movieDetails = params.details
    ? await ApiService.fetchMovieByID(params.details)
    : null;
  return {
    movieList,
    movieDetails,
    totalPages,
  };
};

const Movies = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<React.ReactElement> => {
  const { details, page, query } = searchParams;
  const params = getParams(page, query, details);
  const { movieList, movieDetails, totalPages } = await getData(params);

  const renderContent = (): React.ReactElement => (
    <>
      <ListView data={movieList || []} />
      <Pagination page={params.page} totalPages={totalPages || DEFAULT_PAGE} />
      <FavoritePopup />
    </>
  );

  const renderMovieDetails = (): React.ReactElement | null => {
    if (movieDetails) {
      return <MovieCardDetails movie={movieDetails} />;
    }
    return null;
  };

  return (
    <ThemeWrap>
      <div className="flex-1 flex">
        <div className="flex-1 border-r p-4 overflow-y-auto">
          <SearchBar searchValue={params.query} />
          {renderContent()}
        </div>
        {renderMovieDetails()}
      </div>
    </ThemeWrap>
  );
};

export default Movies;
