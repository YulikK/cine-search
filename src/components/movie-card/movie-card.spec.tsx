import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoviesItem } from '../../types/api.tsx';
import { MovieCard } from './movie-card.tsx';
import { customRender } from '../../tests/custom-render.tsx';
import { NO_POSTER_IMG } from '../../common/constant.tsx';
import { testGetParams } from '../../tests/vitest.setup.ts';

const mockMovie: MoviesItem = {
  id: 1,
  name: 'Test Movie',
  posterPath: '/test-poster.jpg',
  rating: 5,
  description: 'Test Description',
};

describe('MovieCard Component', () => {
  it('renders correctly with movie data', () => {
    customRender(<MovieCard movie={mockMovie} />);

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();

    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toMatch(/test-poster\.jpg/);
  });

  it('uses NO_POSTER_IMG when posterPath is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterPath: '' };
    customRender(<MovieCard movie={movieWithoutPoster} />);
    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain('/placeholder.svg');
    expect(image.src).toContain(NO_POSTER_IMG);
  });

  it('navigates to movie page on card click', async () => {
    const user = userEvent.setup();

    customRender(<MovieCard movie={mockMovie} />);

    await user.click(screen.getByText(mockMovie.name));
    expect(testGetParams).toHaveBeenCalledWith('page');
    expect(testGetParams).toHaveBeenCalledWith('query');
  });
});
