import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Movies } from './movies.tsx';
import { MovieAdaptResponse, MoviesItem } from '../../types/api.tsx';

const mockData: MoviesItem[] = [
  {
    id: '1',
    name: 'Movie 1',
    description: 'Description 1',
    posterPath: 'path1',
    rating: 5,
  },
  {
    id: '2',
    name: 'Movie 2',
    description: 'Description 2',
    posterPath: 'path2',
    rating: 4,
  },
];

const serverAnswer: MovieAdaptResponse = {
  totalPages: 1,
  results: mockData,
};

describe('Movies Page Component', () => {
  vi.mock('../../services/api', () => ({
    ApiService: {
      fetchMovie: vi.fn((id) => {
        if (id === '2') {
          return Promise.resolve(undefined);
        }
        return Promise.resolve(serverAnswer);
      }),
    },
  }));

  it('renders loading state initially', async () => {
    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders movies after loading', async () => {
    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>
    );
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    fireEvent.click(screen.getByRole('button', { name: /1/i }));
  });

  it('navigates to movie detail page on movie click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/" element={<Movies />}>
            <Route path="/:movieId" element={<div>Movie Detail Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Movie 1'));
    expect(container.innerHTML).toContain('Movie Detail Page');
  });
});
