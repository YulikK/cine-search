import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from '../app.tsx';

describe('App component', () => {
  test('renders Movies component as the default route', () => {
    render(<App />);
    expect(screen.getByText(/generate error/i)).toBeInTheDocument();
  });
});
