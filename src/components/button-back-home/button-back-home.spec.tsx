import React from 'react';
import { screen } from '@testing-library/react';
import { ButtonBackHome } from './button-back-home';
import { DEFAULT_PAGE } from '../../common/constant';
import { customRender } from '../../tests/custom-render';

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ButtonBackHome', () => {
  test('renders correctly', () => {
    customRender(<ButtonBackHome />);

    expect(
      screen.getByRole('link', { name: /back to homepage/i })
    ).toBeInTheDocument();
  });

  test('navigates to the homepage on click', async () => {
    customRender(<ButtonBackHome />);

    const link = screen.getByRole('link', { name: /back to homepage/i });
    expect(link).toHaveAttribute('href', `/?page=${DEFAULT_PAGE}`);
  });
});
