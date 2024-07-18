import React from 'react';
import classNames from 'classnames';
import { MoviesItem } from '../../types/api.tsx';
import { MovieCard } from '../movie-card/movie-card.tsx';
import { NoResults } from '../no-results/no-results.tsx';

interface ListViewProps {
  data: MoviesItem[];
  // onMovieClick: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data } = props;

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
