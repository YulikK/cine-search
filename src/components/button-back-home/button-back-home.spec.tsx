import React from 'react';
import { screen } from '@testing-library/react';
import { ButtonBackHome } from './button-back-home.tsx';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { customRender } from '../../tests/custom-render.tsx';

describe('ButtonBackHome', () => {
  test('renders correctly', () => {
    customRender(<ButtonBackHome />);

    expect(
      screen.getByRole('link', { name: /back to homepage/i })
    ).toBeInTheDocument();
  });

  test('navigates to the homepage on click', () => {
    customRender(<ButtonBackHome />);

    const link = screen.getByRole('link', { name: /back to homepage/i });
    expect(link).toHaveAttribute('href', `?page=${DEFAULT_PAGE}`);
  });
});
