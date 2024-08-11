import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { MoviesItem } from '~/types/api';
import { MovieCard } from '../movie-card/movie-card';
import { NoResults } from '../no-results/no-results';
import { setMoviesList } from '~/store/reducers/movies';
import classNames from 'classnames';

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
    if (data && JSON.stringify(currentMoviesList) !== JSON.stringify(data)) {
      dispatch(setMoviesList(data));
    }
  }, [data, currentMoviesList, dispatch]);

  return data.length ? (
    <ul className={classNames('gap-4', 'flex', 'flex-wrap', 'justify-evenly')}>
      {data.map((item, index) => (
        <MovieCard key={index} movie={item} />
      ))}
    </ul>
  ) : (
    <NoResults />
  );
};
