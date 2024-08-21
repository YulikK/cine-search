import { TrashIcon } from './trash-icon';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('TrashIcon', () => {
  it('renders successfully', () => {
    render(<TrashIcon />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('stroke', 'currentColor');
  });
});
