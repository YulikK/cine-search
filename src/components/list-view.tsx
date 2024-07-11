import React from 'react';
import { MoviesItem } from '../types/api.tsx';
import { MovieCard } from './movie-card/movie-card.tsx';
import { NoResults } from './no-results.tsx';

interface ListViewProps {
  data: MoviesItem[];
}

export const ListView: React.FC<ListViewProps> = (props) => {
  const { data } = props;

  return data.length ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <MovieCard key={index} movie={item} />
      ))}
    </ul>
  ) : (
    <NoResults />
  );
};
