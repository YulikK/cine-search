import { describe, it, expect } from 'vitest';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Router } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Movies, { getServerSideProps } from '../../pages';
import { customRender } from '../custom-render';
import { testMovieList } from '../mocks/handlers/movies';

vi.mock('../services/moviesApi', () => ({
  useGetMovieQuery: vi.fn(),
  useGetMovieByIDQuery: vi.fn(),
}));

const mockContext: Partial<GetServerSidePropsContext> = {
  query: {
    query: 'some-query',
    page: '1',
    details: 'some-details',
  },
};

describe('Movies Page Component', () => {
  it('renders loading and movies', async () => {
    await getServerSideProps(mockContext as GetServerSidePropsContext);

    customRender(<Movies />);

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
