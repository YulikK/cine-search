import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchIcon } from './search-icon';

describe('SearchIcon', () => {
  it('renders successfully', () => {
    render(<SearchIcon />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('stroke', 'currentColor');
  });
});
