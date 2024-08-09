import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

test('renders Loader correctly', () => {
  render(<Loader />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
