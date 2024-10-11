import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { customRender } from '../../tests/custom-render.tsx';
import { MovieList } from './movie-list.tsx';
import { testMovieList } from '../../tests/mocks/handlers/movies.ts';

const searchParams = {
  page: '1',
  query: 'test',
  details: '0',
};
describe('<MovieCardDetails />', () => {
  it('renders movie list correctly', async () => {
    const movieListComponent = await (async (): Promise<React.ReactElement> =>
      MovieList({ searchParams }))();

    customRender(<>{movieListComponent}</>);

    expect(
      screen.getByText(testMovieList.results[0].title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(testMovieList.results[1].title)
    ).toBeInTheDocument();
  });
});
