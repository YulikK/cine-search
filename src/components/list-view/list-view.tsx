import React from 'react';
import classNames from 'classnames';
import { MoviesItem } from '../../types/api';
import { MovieCard } from '../movie-card/movie-card';
import { NoResults } from '../no-results/no-results';

interface ListViewProps {
  data: MoviesItem[];
  setMovieRef: (id: number, ref: HTMLLIElement | null) => void;
  handleDetailsOpen: (details: number) => void;
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data, setMovieRef, handleDetailsOpen } = props;

  const setRef =
    (movieId: number) =>
    (ref: HTMLLIElement | null): void => {
      setMovieRef(movieId, ref);
    };

  return data.length ? (
    <ul className={classNames('gap-4', 'flex', 'flex-wrap', 'justify-evenly')}>
      {data.map((item) => (
        <MovieCard
          key={item.id}
          movie={item}
          setRef={setRef(item.id)}
          handleDetailsOpen={handleDetailsOpen}
        />
      ))}
    </ul>
  ) : (
    <NoResults />
  );
};
