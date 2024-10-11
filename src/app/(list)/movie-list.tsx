import React from 'react';
import { MoviesItem, QueryParams } from '../../types/api.tsx';
import { ApiService } from '../../services/api.tsx';
import { getParams } from '../../utils/params.tsx';
import { ListView } from '../../components/list-view/list-view.tsx';
import { Pagination } from '../../components/pagination/pagination.tsx';
import { FavoritePopup } from '../../components/popup-favorite/popup-favorite.tsx';
import { DEFAULT_PAGE } from '../../common/constant.tsx';

interface DataType {
  movieList: MoviesItem[] | undefined;
  totalPages: number | undefined;
}
export const getData = async (params: QueryParams): Promise<DataType> => {
  const movieData = await ApiService.fetchMovie(params);
  const { results: movieList, totalPages } = movieData || {};
  return {
    movieList,
    totalPages,
  };
};

export const MovieList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<React.ReactElement> => {
  const { details, page, query } = searchParams;
  const params = getParams(page, query, details);
  const { movieList, totalPages } = await getData(params);

  return (
    <>
      <ListView data={movieList || []} />
      <Pagination page={params.page} totalPages={totalPages || DEFAULT_PAGE} />
      <FavoritePopup />
    </>
  );
};
