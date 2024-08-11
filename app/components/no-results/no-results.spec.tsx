import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoResults } from './no-results';
import { describe, expect, it } from 'vitest';
import { customRender } from '~/tests/custom-render';
import { createRemixStub } from '@remix-run/testing';

describe('NoResults component', () => {
  it('renders correctly', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <NoResults />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Sorry, we couldn't find any results matching your search. Please try a different search query./i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to homepage/i })
    ).toBeInTheDocument();
  });
});
