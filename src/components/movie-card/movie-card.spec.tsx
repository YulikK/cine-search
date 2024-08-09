import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoviesItem } from '../../types/api';
import { MovieCard } from './movie-card';
import { customRender } from '../../tests/custom-render';
import { NO_POSTER_IMG } from '../../common/constant';

const mockMovie: MoviesItem = {
  id: 1,
  name: 'Test Movie',
  posterPath: '/test-poster.jpg',
  rating: 5,
  description: 'Test Description',
};

const setRef = vi.fn();
const handleDetailsOpen = vi.fn();

describe('MovieCard Component', () => {
  it('renders correctly with movie data', () => {
    customRender(
      <MovieCard
        movie={mockMovie}
        setRef={setRef}
        handleDetailsOpen={handleDetailsOpen}
      />
    );

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();

    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toMatch(/test-poster\.jpg/);
  });

  it('uses NO_POSTER_IMG when posterPath is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterPath: '' };
    customRender(
      <MovieCard
        movie={movieWithoutPoster}
        setRef={setRef}
        handleDetailsOpen={handleDetailsOpen}
      />
    );
    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain('/placeholder.svg');
    expect(image.src).toContain(NO_POSTER_IMG);
  });

  it('navigates to movie page on card click', async () => {
    const user = userEvent.setup();
    customRender(
      <MovieCard
        movie={mockMovie}
        setRef={setRef}
        handleDetailsOpen={handleDetailsOpen}
      />
    );

    await user.click(screen.getByText(mockMovie.name));
    expect(handleDetailsOpen).toHaveBeenCalledWith(mockMovie.id);
  });
});
