import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../store/store.tsx';
import { testMovieList } from '../../tests/mocks/handlers/movies.ts';

import { testMovieDetails } from '../../tests/mocks/handlers/movie-details.ts';
import Movies from '../index.tsx';
import { MovieDetails } from '../../components/movie-details/movie-details.tsx';

describe('Movies Page Component', () => {
  it('renders loading state initially', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Movies />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders movies after loading', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Movies />
        </MemoryRouter>
      </Provider>
    );
    expect(
      await screen.findByText(testMovieList.results[0].title)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    fireEvent.click(screen.getByRole('button', { name: /1/i }));
  });

  it('navigates to movie detail page', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/238']}>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route
              path="/:movieId"
              element={<MovieDetails movieId={testMovieDetails.id} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(container.innerHTML).toContain(testMovieDetails.title);
    });
  });
});
