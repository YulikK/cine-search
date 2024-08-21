import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ListView } from './list-view';
import { MoviesItem } from '../../types/api';
import { createRemixStub } from '@remix-run/testing';
import { customRender } from '~/tests/custom-render';

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

describe('ListView Component', () => {
  it('renders movie cards when data is provided', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ListView data={mockData} />,
      },
    ]);
    customRender(<RemixStub initialEntries={['/']} />);
    const movieCards = screen.getAllByRole('listitem');
    expect(movieCards.length).toBe(2);
    expect(movieCards[0]).toHaveTextContent(mockData[0].name);
    expect(movieCards[1]).toHaveTextContent(mockData[1].name);
  });
  it('renders "No Results" when data is empty', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ListView data={[]} />,
      },
    ]);
    customRender(<RemixStub initialEntries={['/']} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
