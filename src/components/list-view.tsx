import React, { ReactNode } from 'react';
import { MoviesItem } from '../types/api.tsx';
import { MovieCard } from './movie-card/movie-card.tsx';

interface ListViewProps {
  data: MoviesItem[];
}

export class ListView extends React.Component<ListViewProps> {
  render(): ReactNode {
    const { data } = this.props;

    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <MovieCard key={index} movie={item} />
        ))}
      </ul>
    );
  }
}
