import React from 'react';
import { ListView } from '../list-view/list-view';
import { Pagination } from '../pagination/pagination';
import { FavoritePopup } from '../popup-favorite/popup-favorite';
import { DEFAULT_PAGE } from '~/common/constant';
import { MoviesItem } from '~/types/api';

interface MovieListProps {
  movieList: MoviesItem[] | [];
  totalPages: number;
  page: number;
}

export const MovieList = (props: MovieListProps): React.ReactElement => {
  const { movieList, totalPages, page } = props;

  return (
    <>
      <ListView data={movieList || []} />
      <Pagination page={page} totalPages={totalPages || DEFAULT_PAGE} />
      <FavoritePopup />
    </>
  );
};
