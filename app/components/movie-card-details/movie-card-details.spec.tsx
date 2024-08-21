import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { MovieCardDetails } from './movie-card-details';
import { MoviesDetails } from '../../types/api';
import { createRemixStub } from '@remix-run/testing';
import { customRender } from '~/tests/custom-render';

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

describe('<MovieCardDetails />', () => {
  it('renders movie details correctly', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <MovieCardDetails movie={mockMovie} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);

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
