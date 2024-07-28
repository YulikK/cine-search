import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import NO_POSTER_IMG from '../../assets/img/placeholder.svg';
import { MoviesItem } from '../../types/api.tsx';
import { MovieCard } from './movie-card.tsx';
import store from '../../store/store.tsx';

const mockMovie: MoviesItem = {
  id: '1',
  name: 'Test Movie',
  posterPath: '/test-poster.jpg',
  rating: 5,
  description: 'Test Description',
};

const setRef = vi.fn();
const setSelectedMovieId = vi.fn();

describe('MovieCard Component', () => {
  it('renders correctly with movie data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieCard
            movie={mockMovie}
            setRef={setRef}
            setSelectedMovieId={setSelectedMovieId}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();

    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain(mockMovie.posterPath);
  });

  it('uses NO_POSTER_IMG when posterPath is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterPath: '' };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieCard
            movie={movieWithoutPoster}
            setRef={setRef}
            setSelectedMovieId={setSelectedMovieId}
          />
        </MemoryRouter>
      </Provider>
    );
    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain('/placeholder.svg');
    expect(image.src).toContain(NO_POSTER_IMG);
  });

  it('navigates to movie page on card click', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieCard
            movie={mockMovie}
            setRef={setRef}
            setSelectedMovieId={setSelectedMovieId}
          />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByText(mockMovie.name));
    expect(setSelectedMovieId).toHaveBeenCalledWith(mockMovie.id);
  });
});
