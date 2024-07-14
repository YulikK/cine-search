import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ListView } from './list-view.tsx';
import { MoviesItem } from '../../types/api.tsx';

vi.mock('./movie-card/movie-card.tsx', () => ({
  MovieCard: ({ movie }: { movie: MoviesItem }): JSX.Element => (
    <div data-tested="movie-card">{movie.name}</div>
  ),
}));
vi.mock('./no-results.tsx', () => ({
  NoResults: (): React.ReactElement => <div>No Results Found</div>,
}));

const mockData: MoviesItem[] = [
  {
    id: '1',
    name: 'Movie 1',
    description: 'Description 1',
    posterPath: 'path1',
    rating: 5,
  },
  {
    id: '2',
    name: 'Movie 2',
    description: 'Description 2',
    posterPath: 'path2',
    rating: 4,
  },
];

describe('ListView Component', () => {
  it('renders movie cards when data is provided', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ListView data={mockData} onMovieClick={() => {}} />
      </MemoryRouter>
    );

    const movieCards = screen.getAllByRole('listitem');
    expect(movieCards.length).toBe(2);
    expect(movieCards[0]).toHaveTextContent('Movie 1');
    expect(movieCards[1]).toHaveTextContent('Movie 2');
  });

  it('renders "No Results" when data is empty', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ListView data={[]} onMovieClick={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('adjusts grid columns based on the presence of a movieId param', () => {
    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route
            path="movies/:movieId"
            element={<ListView data={mockData} onMovieClick={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toHaveClass('md:grid-cols-1 lg:grid-cols-2');
  });
});
