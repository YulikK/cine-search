import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import Index, { loader } from '~/routes/_index';
import { createRemixStub } from '@remix-run/testing';
import { customRender } from '../custom-render';
import { LoaderFunctionArgs } from '@remix-run/node';
import { isResponse } from '@remix-run/react/dist/data';
import { testMovieList } from '../mocks/handlers/movies';
import { testMovieDetails } from '../mocks/handlers/movie-details';

const request: Request = new Request('http://localhost/?page=1&details=238');
const arg: LoaderFunctionArgs = {
  request,
  params: {},
  context: {},
};
const loaderResult = await loader(arg);
const data =
  loaderResult !== null && isResponse(loaderResult)
    ? await loaderResult.json()
    : {};

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: () => data,
  };
});

describe('Movies Page Component', () => {
  it('renders search bar and movie list', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Index />,
      },
    ]);
    customRender(<RemixStub />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(testMovieList.results[0].title)
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: testMovieDetails.title })
      ).toBeInTheDocument();
    });
  });
});
