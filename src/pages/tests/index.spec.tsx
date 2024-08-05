import { describe, it, expect } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import store from '../../store/store.tsx';
import { testMovieList } from '../../tests/mocks/handlers/movies.ts';
import Movies, { getServerSideProps, MoviesProps } from '../index.tsx';
import { MovieAdaptResponse, MoviesItem } from '../../types/api.tsx';
import { RequestParamsProvider } from '../../hooks/params-provider.tsx';
import { Router } from 'next/router';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

const mockData: MoviesItem[] = [
  {
    id: 1,
    name: 'Movie 1',
    description: 'Description 1',
    posterPath: 'path1',
    rating: 5,
  },
  {
    id: 2,
    name: 'Movie 2',
    description: 'Description 2',
    posterPath: 'path2',
    rating: 4,
  },
];
const mockAnswer: MovieAdaptResponse = {
  totalPages: 1,
  results: mockData,
};

const mockRouter = {
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  query: {},
  push: vi.fn(),
  replace: vi.fn(),
  pathname: '',
  route: '',
  asPath: '',
  basePath: '',
  isLocaleDomain: false,
  isReady: true,
};

const mockContext: Partial<GetServerSidePropsContext> = {
  query: {
    query: 'some-query',
    page: '1',
    details: 'some-details',
  },
};

vi.mock('next/router', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useRouter: () => mockRouter,
  };
});

describe('Movies Page Component', () => {
  it('renders loading state initially', async () => {
    render(
      <Provider store={store}>
        <RequestParamsProvider>
          <Movies initialDataList={mockAnswer} />
        </RequestParamsProvider>
      </Provider>
    );
    act(() => {
      Router.events.emit('routeChangeStart');
    });
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('renders movies after loading', async () => {
    const result: GetServerSidePropsResult<MoviesProps> =
      await getServerSideProps(mockContext as GetServerSidePropsContext);

    if ('props' in result && 'initialDataList' in result.props) {
      const { props } = result;

      render(
        <Provider store={store}>
          <RequestParamsProvider>
            <Movies initialDataList={props.initialDataList} />
          </RequestParamsProvider>
        </Provider>
      );
      act(() => {
        Router.events.emit('routeChangeStart');
      });
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
    } else {
      console.error('getServerSideProps did not return props');
    }
  });
});
