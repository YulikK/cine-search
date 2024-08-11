import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page404 } from '../../routes/pages/404/404.js';
import { createRemixStub } from '@remix-run/testing';

describe('Page404', () => {
  it('renders the 404 page correctly', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Page404 />,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('Oops, the page you are looking for could not be found.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
