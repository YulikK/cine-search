import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { NO_POSTER_IMG } from '../../common/constant';
import { MoviesItem } from '../../types/api';
import { MovieCard } from './movie-card';
import { customRender } from '~/tests/custom-render';
import { createRemixStub } from '@remix-run/testing';
import * as userEvent from '@testing-library/user-event';

const mockMovie: MoviesItem = {
  id: 1,
  name: 'Test Movie',
  posterPath: '/test-poster.jpg',
  rating: 5,
  description: 'Test Description',
};

const testNavigate = vi.fn();
const testLocation = { pathname: '/' };
const testParams = {};
const testSearchParams = new URLSearchParams();
const testSetSearchParams = vi.fn();

vi.mock('@remix-run/react', () => ({
  ...vi.importActual('@remix-run/react'),
  useNavigate: () => testNavigate,
  useLocation: () => testLocation,
  useParams: () => testParams,
  useSearchParams: () => [testSearchParams, testSetSearchParams],
}));

describe('MovieCard Component', () => {
  it('renders correctly with movie data', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <MovieCard movie={mockMovie} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();

    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toMatch(/test-poster\.jpg/);
  });

  it('uses NO_POSTER_IMG when posterPath is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, posterPath: '' };
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <MovieCard movie={movieWithoutPoster} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);
    const image: HTMLImageElement = screen.getByAltText(mockMovie.name);
    expect(image.src).toContain('/images/placeholder.svg');
    expect(image.src).toContain(NO_POSTER_IMG);
  });

  it('navigates to movie page on card click', async () => {
    const user = userEvent.userEvent.setup();

    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <MovieCard movie={mockMovie} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);

    await user.click(screen.getByText(mockMovie.name));

    expect(testSetSearchParams).toHaveBeenCalledWith('page=1&details=1');
  });
});
