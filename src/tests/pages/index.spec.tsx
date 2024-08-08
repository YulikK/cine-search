import { describe, it, expect } from 'vitest';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Router } from 'next/router';
import { testMovieList } from '../mocks/handlers/movies.ts';

// import { GetServerSidePropsContext } from 'next';
import { customRender } from '../custom-render.tsx';
import Movies from '../../app/page.tsx';

vi.mock('../services/moviesApi', () => ({
  useGetMovieQuery: vi.fn(),
  useGetMovieByIDQuery: vi.fn(),
}));

const mockContext = {
  query: 'some-query',
  page: '1',
  details: 'some-details',
};

describe('Movies Page Component', () => {
  it('renders loading and movies', async () => {
    // await getServerSideProps(mockContext as GetServerSidePropsContext);

    customRender(<Movies searchParams={mockContext} />);

    act(() => {
      Router.events.emit('routeChangeComplete');
    });
    await waitFor(() => {
      expect(
        screen.getByText(testMovieList.results[0].title)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    fireEvent.click(screen.getByRole('button', { name: /1/i }));
  });
});
