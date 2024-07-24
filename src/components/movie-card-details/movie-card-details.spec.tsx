import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieCardDetails } from './movie-card-details.tsx';
import { MoviesDetails } from '../../types/api.tsx';

const mockMovie: MoviesDetails = {
  id: '1',
  title: 'Test Movie',
  backdropPath: '/testBackdrop.jpg',
  posterPath: '/testPoster.jpg',
  voteAverage: 8.5,
  adult: false,
  releaseDate: '2021-07-09',
  runtime: '137 min',
  tagline: 'Test Tagline',
  overview: 'Test Overview',
  genres: ['Action', 'Adventure'],
  originalLanguage: 'en',
  status: 'Released',
  budget: 200000000,
  revenue: 850000000,
};

vi.mock('../../hooks/use-request-params', () => ({
  useRequestParams: (): {
    searchParams: URLSearchParams;
    setSearchParams: () => void;
  } => ({
    searchParams: new URLSearchParams(),
    setSearchParams: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async (importOriginal): Promise<object> => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: (): void => {
      vi.fn();
    },
  };
});

describe('<MovieCardDetails />', () => {
  it('renders movie details correctly', () => {
    render(
      <MemoryRouter>
        <MovieCardDetails movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.voteAverage)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres[0])).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres[1])).toBeInTheDocument();
    expect(
      screen.getByText(mockMovie.originalLanguage.toUpperCase())
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.status)).toBeInTheDocument();
  });
});
