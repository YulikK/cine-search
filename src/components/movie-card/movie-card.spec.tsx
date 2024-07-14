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

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    const image: HTMLImageElement = screen.getByAltText('Test Movie');
    expect(image.src).toContain('/test-poster.jpg');
  });

  it('uses NO_POSTER_IMG when posterPath is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterPath: '' };
    render(<MovieCard movie={movieWithoutPoster} onMovieClick={() => {}} />);
    const image: HTMLImageElement = screen.getByAltText('Test Movie');
    expect(image.src).toContain('/placeholder.svg');

    expect(image.src).toContain(NO_POSTER_IMG);
  });

  it('calls onMovieClick with the correct id when clicked', () => {
    const onMovieClickMock = vi.fn();
    render(<MovieCard movie={mockMovie} onMovieClick={onMovieClickMock} />);

    fireEvent.click(screen.getByText('Test Movie'));
    expect(onMovieClickMock).toHaveBeenCalledWith('1');
  });
});
