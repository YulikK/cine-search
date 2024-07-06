import React from 'react';
import { MoviesItem } from '../types/api';
import { MovieCard } from './movie-card';

interface ListViewProps {
  data: MoviesItem[];
}

export class ListView extends React.Component<ListViewProps> {
  render() {
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
