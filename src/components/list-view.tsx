import React from 'react';
import { useParams } from 'react-router-dom';
import { MoviesItem } from '../types/api.tsx';
import { MovieCard } from './movie-card/movie-card.tsx';
import { NoResults } from './no-results.tsx';

const DEFAULT_COLUMNS_NO_DETAILS_L = 3;
const DEFAULT_COLUMNS_NO_DETAILS_M = 2;
const DEFAULT_COLUMNS_DETAILS_L = 2;
const DEFAULT_COLUMNS_DETAILS_M = 1;
interface ListViewProps {
  data: MoviesItem[];
  onMovieClick: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data } = props;
  const { movieId } = useParams();

  return data.length ? (
    <ul
      className={`grid grid-cols-1 gap-4 md:grid-cols-${movieId ? DEFAULT_COLUMNS_DETAILS_M : DEFAULT_COLUMNS_NO_DETAILS_M} lg:grid-cols-${movieId ? DEFAULT_COLUMNS_DETAILS_L : DEFAULT_COLUMNS_NO_DETAILS_L}`}
    >
      {data.map((item, index) => (
        <MovieCard key={index} movie={item} onMovieClick={props.onMovieClick} />
      ))}
    </ul>
  ) : (
    <NoResults />
  );
};
