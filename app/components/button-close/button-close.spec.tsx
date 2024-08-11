import { fireEvent, screen } from '@testing-library/react';

import { DEFAULT_PAGE } from '../../common/constant';

import { CloseButton } from './button-close';

import { describe, expect, test, vi } from 'vitest';
import { customRender } from '~/tests/custom-render';

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

describe('ButtonClose', () => {
  test('renders correctly', () => {
    customRender(<CloseButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('close details on click', () => {
    customRender(<CloseButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(testSetSearchParams).toHaveBeenCalledWith(`page=${DEFAULT_PAGE}`);
  });
});
