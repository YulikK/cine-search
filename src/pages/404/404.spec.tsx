import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Page404 } from './404.tsx';

describe('Page404', () => {
  it('renders the 404 page correctly', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Oops, the page you are looking for could not be found.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
