import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NO_POSTER_IMG from '../../assets/img/placeholder.svg';
import { MoviesItem } from '../../types/api.tsx';
import { MovieCard } from './movie-card.tsx';

const mockMovie: MoviesItem = {
  id: '1',
  name: 'Test Movie',
  posterPath: '/test-poster.jpg',
  rating: 5,
  description: 'Test Description',
};

describe('MovieCard Component', () => {
  it('renders correctly with movie data', () => {
    render(<MovieCard movie={mockMovie} onMovieClick={() => {}} />);

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();

    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain(mockMovie.posterPath);
  });

  it('uses NO_POSTER_IMG when posterPath is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterPath: '' };
    render(<MovieCard movie={movieWithoutPoster} onMovieClick={() => {}} />);
    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain('/placeholder.svg');
    expect(image.src).toContain(NO_POSTER_IMG);
  });

  it('calls onMovieClick with the correct id when clicked', () => {
    const onMovieClickMock = vi.fn();
    render(<MovieCard movie={mockMovie} onMovieClick={onMovieClickMock} />);
    fireEvent.click(screen.getByText(mockMovie.name));
    expect(onMovieClickMock).toHaveBeenCalledWith('1');
  });
});
