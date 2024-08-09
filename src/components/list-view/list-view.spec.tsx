import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ListView } from './list-view';
import { MoviesItem } from '../../types/api';
import { customRender } from '../../tests/custom-render';

vi.mock('./movie-card/movie-card', () => ({
  MovieCard: ({ movie }: { movie: MoviesItem }): JSX.Element => (
    <div data-tested="movie-card">{movie.name}</div>
  ),
}));
vi.mock('./no-results', () => ({
  NoResults: (): React.ReactElement => <div>No Results Found</div>,
}));

const setRef = vi.fn();
const handleDetailsOpen = vi.fn();

const mockData: MoviesItem[] = [
  {
    id: 1,
    name: 'Movie 1',
    description: 'Description 1',
    posterPath: 'path1',
    rating: 5,
  },
  {
    id: 2,
    name: 'Movie 2',
    description: 'Description 2',
    posterPath: 'path2',
    rating: 4,
  },
];

describe('ListView Component', () => {
  it('renders movie cards when data is provided', () => {
    customRender(
      <ListView
        data={mockData}
        setMovieRef={setRef}
        handleDetailsOpen={handleDetailsOpen}
      />
    );
    const movieCards = screen.getAllByRole('listitem');
    expect(movieCards.length).toBe(2);
    expect(movieCards[0]).toHaveTextContent(mockData[0].name);
    expect(movieCards[1]).toHaveTextContent(mockData[1].name);
  });
  it('renders "No Results" when data is empty', () => {
    customRender(
      <ListView
        data={[]}
        setMovieRef={setRef}
        handleDetailsOpen={handleDetailsOpen}
      />
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
