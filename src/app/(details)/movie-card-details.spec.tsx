import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { MovieCardDetails } from './movie-card-details.tsx';
import { customRender } from '../../tests/custom-render.tsx';
import { testMovieDetails } from '../../tests/mocks/handlers/movie-details.ts';

const detailsProps = {
  details: testMovieDetails.id,
};
describe('<MovieCardDetails />', () => {
  it('renders movie details correctly', async () => {
    const movieDetailsComponent =
      await (async (): Promise<React.ReactElement> =>
        MovieCardDetails(detailsProps))();

    customRender(<>{movieDetailsComponent}</>);

    expect(screen.getByText(testMovieDetails.title)).toBeInTheDocument();
    expect(screen.getByText(testMovieDetails.vote_average)).toBeInTheDocument();
    expect(screen.getByText(testMovieDetails.overview)).toBeInTheDocument();
    expect(
      screen.getByText(testMovieDetails.genres[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(testMovieDetails.genres[1].name)
    ).toBeInTheDocument();
  });
});
