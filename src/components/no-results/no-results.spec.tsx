import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoResults } from './no-results';
import { customRender } from '../../tests/custom-render';

describe('NoResults component', () => {
  it('renders correctly', () => {
    customRender(<NoResults />);
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
