import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { MoviesItem } from '../types/api.tsx';
import { MovieCard } from './movie-card/movie-card.tsx';
import { NoResults } from './no-results.tsx';

interface ListViewProps {
  data: MoviesItem[];
  onMovieClick: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data } = props;
  const { movieId } = useParams();

  return data.length ? (
    <ul
      className={classNames(
        'grid',
        'grid-cols-1',
        'gap-4',
        'md:grid-cols-2',
        {
          'md:grid-cols-1': movieId,
          'md:grid-cols-2': !movieId,
        },
        {
          'lg:grid-cols-2': movieId,
          'lg:grid-cols-3': !movieId,
        }
      )}
    >
      {data.map((item, index) => (
        <MovieCard key={index} movie={item} onMovieClick={props.onMovieClick} />
      ))}
    </ul>
  ) : (
    <NoResults />
  );
};
