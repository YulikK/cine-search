import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePopup } from './popup-favorite';
import { customRender } from '../../tests/custom-render';
import { MoviesItem } from '../../types/api';

vi.mock('../path/to/hooks', () => ({
  useBaseUrl: () => 'http://example.com',
}));

vi.mock('../path/to/actions', () => ({
  clearFavorites: vi.fn(),
}));

const favorites: MoviesItem[] = [
  {
    id: 1,
    name: 'Movie 1',
    description: 'Description 1',
    rating: 5,
    posterPath: 'path',
  },
  {
    id: 2,
    name: 'Movie 2',
    description: 'Description 2',
    rating: 4,
    posterPath: 'path',
  },
];

describe('FavoritePopup', () => {
  // let store;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    customRender(<FavoritePopup />, { preloadedState: { favorites } });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  test('generates and downloads CSV file', () => {
    customRender(<FavoritePopup />, { preloadedState: { favorites } });

    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href');
    expect(downloadLink).toHaveAttribute('download', '2_movies.csv');
  });
});
