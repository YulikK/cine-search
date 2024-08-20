import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SunIcon } from './sun-icon';

describe('SunIcon', () => {
  it('renders successfully', () => {
    render(<SunIcon />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('stroke', 'currentColor');
  });
});