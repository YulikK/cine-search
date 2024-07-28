import React, { act } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MovieDetails } from './movie-details.tsx';
import store from '../../store/store.tsx';
import { testMovieDetails } from '../../tests/mocks/handlers/movie-details.ts';

describe('<MovieDetails />', () => {
  it('should display loader while fetching movie details', async () => {
    await act(async () => {
      await Promise.resolve();
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/1']}>
            <Routes>
              <Route path="/:movieId" element={<MovieDetails />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('should display movie details after fetching', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/238']}>
          <Routes>
            <Route path="/:movieId" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(testMovieDetails.title)).toBeInTheDocument()
    );
  });

  it('should display no results if movieId is not found', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/0']}>
          <Routes>
            <Route path="/:movieId" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/No results found/i)).toBeInTheDocument()
    );
  });
});
