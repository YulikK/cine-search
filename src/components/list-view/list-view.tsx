import React from 'react';
import classNames from 'classnames';
import { MoviesItem } from '../../types/api.tsx';
import { MovieCard } from '../movie-card/movie-card.tsx';
import { NoResults } from '../no-results/no-results.tsx';

interface ListViewProps {
  data: MoviesItem[];
  setMovieRef: (id: string, ref: HTMLLIElement | null) => void;
  setSelectedMovieId: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data } = props;

  const setRef =
    (movieId: string) =>
    (ref: HTMLLIElement | null): void => {
      props.setMovieRef(movieId, ref);
    };

  return data.length ? (
    <ul className={classNames('gap-4', 'flex', 'flex-wrap', 'justify-evenly')}>
      {data.map((item, index) => (
        <MovieCard
          key={index}
          movie={item}
          setRef={setRef(item.id)}
          setSelectedMovieId={props.setSelectedMovieId}
        />
      ))}
    </ul>
  ) : (
    <NoResults />
  );
};
