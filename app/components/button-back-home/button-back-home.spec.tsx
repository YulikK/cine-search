import { render, screen } from '@testing-library/react';
import { ButtonBackHome } from './button-back-home';
import { describe, expect, test } from 'vitest';
import { DEFAULT_PAGE } from '~/common/constant';
import { createRemixStub } from '@remix-run/testing';

describe('ButtonBackHome', () => {
  test('renders correctly', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ButtonBackHome />,
      },
    ]);

    render(<RemixStub />);

    expect(screen.getByText('Back to Homepage')).toBeInTheDocument();
  });

  test('navigates to the homepage on click', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ButtonBackHome />,
      },
    ]);

    render(<RemixStub />);

    const link = screen.getByRole('link', { name: /back to homepage/i });
    expect(link).toHaveAttribute('href', `/?page=${DEFAULT_PAGE}`);
  });
});
