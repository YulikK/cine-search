import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlertIcon } from './alert-icon';

describe('AlertIcon', () => {
  it('renders successfully', () => {
    render(<AlertIcon />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('stroke', 'currentColor');
  });
});