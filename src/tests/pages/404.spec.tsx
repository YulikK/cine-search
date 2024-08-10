import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import React from 'react';
import Page404 from '../../pages/404';
import { customRender } from '../custom-render';

describe('Page404', () => {
  it('renders the 404 page correctly', () => {
    customRender(<Page404 />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Oops, the page you are looking for could not be found.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
