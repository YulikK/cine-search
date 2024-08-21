import { render, screen } from '@testing-library/react';
import { Loader } from './loader';
import { expect, test } from 'vitest';

test('renders Loader correctly', () => {
  render(<Loader />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
