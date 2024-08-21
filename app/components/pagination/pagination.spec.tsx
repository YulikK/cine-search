import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';
import * as userEvent from '@testing-library/user-event';
import { customRender } from '~/tests/custom-render';
import { createRemixStub } from '@remix-run/testing';

const user = userEvent.userEvent.setup();
const testNavigate = vi.fn();
const testLocation = { pathname: '/' };
const testParams = {};
const testSearchParams = new URLSearchParams();
const testSetSearchParams = vi.fn();

vi.mock('@remix-run/react', () => ({
  ...vi.importActual('@remix-run/react'),
  useNavigate: () => testNavigate,
  useLocation: () => testLocation,
  useParams: () => testParams,
  useSearchParams: () => [testSearchParams, testSetSearchParams],
}));

describe('Pagination', () => {
  it('renders correctly with middle page selected', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination page={1} totalPages={5} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);

    const page1Button = screen.getByRole('button', { name: '1' });
    expect(page1Button).toHaveClass('bg-primary text-primary-foreground');
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('navigates to the previous page when the previous button is clicked', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination page={2} totalPages={5} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);

    await user.click(screen.getByRole('button', { name: /previous page/i }));
    expect(testSetSearchParams).toHaveBeenCalledWith('page=1');
  });

  it('navigates to the next page when the next button is clicked', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination page={3} totalPages={5} />,
      },
    ]);

    customRender(<RemixStub initialEntries={['/']} />);
    await user.click(screen.getByRole('button', { name: /next page/i }));
    expect(testSetSearchParams).toHaveBeenCalledWith('page=4');
  });

  it('navigates to the selected page when a page number is clicked', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination page={3} totalPages={5} />,
      },
    ]);
    customRender(<RemixStub initialEntries={['/']} />);

    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(testSetSearchParams).toHaveBeenCalledWith('page=3');
  });

  it('disables the previous button on the first page', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination page={1} totalPages={5} />,
      },
    ]);
    customRender(<RemixStub initialEntries={['/']} />);

    expect(
      screen.getByRole('button', { name: /previous page/i })
    ).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination page={5} totalPages={5} />,
      },
    ]);
    customRender(<RemixStub initialEntries={['/']} />);

    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });
});
