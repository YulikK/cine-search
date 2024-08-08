'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { MoviesItem } from '../../types/api.tsx';
import { MovieCard } from '../movie-card/movie-card.tsx';
import { NoResults } from '../no-results/no-results.tsx';
import { setMoviesList } from '../../store/reducers/movies.tsx';
import { RootState } from '../../store/store.tsx';
// import { LoaderWrap } from '../loader-wrapper/loader-wrapper.tsx';

interface ListViewProps {
  data: MoviesItem[];
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const currentMoviesList = useSelector(
    (state: RootState) => state.movies.list
  );

  useEffect(() => {
    if (JSON.stringify(currentMoviesList) !== JSON.stringify(data)) {
      dispatch(setMoviesList(data));
    }
  }, [data, currentMoviesList, dispatch]);

  return data.length ? (
    // <LoaderWrap>
    <ul className={classNames('gap-4', 'flex', 'flex-wrap', 'justify-evenly')}>
      {data.map((item, index) => (
        <MovieCard key={index} movie={item} />
      ))}
    </ul>
  ) : (
    // </LoaderWrap>
    <NoResults />
  );
};
