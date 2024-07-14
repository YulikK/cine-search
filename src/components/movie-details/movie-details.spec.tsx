import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MovieDetails } from './movie-details.tsx';

describe('<MovieDetails />', () => {
  beforeEach(() => {
    vi.mock('../../services/api', () => ({
      ApiService: {
        fetchMovieByID: vi.fn((id) => {
          if (id === '2') {
            return Promise.resolve(undefined);
          }
          return Promise.resolve({
            id: '1',
            title: 'Sample Movie',
            overview: 'This is a sample overview of the movie.',
            backdropPath: '/sample-backdrop.jpg',
            posterPath: '/sample-poster.jpg',
            genres: ['Drama', 'Comedy'],
            originalLanguage: 'en',
            releaseDate: '2022-01-01',
            adult: false,
            budget: 1000000,
            revenue: 5000000,
            runtime: '120',
            status: 'Released',
            tagline: 'This is a sample tagline.',
            voteAverage: 8.5,
          });
        }),
      },
    }));
  });

  it('should display loader while fetching movie details', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display movie details after fetching', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Sample Movie')).toBeInTheDocument()
    );
  });

  it('should display no results if movieId is not found', async () => {
    render(
      <MemoryRouter initialEntries={['/2']}>
        <Routes>
          <Route path="/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/No results found/i)).toBeInTheDocument()
    );
  });
});
