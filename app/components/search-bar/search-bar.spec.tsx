import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './search-bar';

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

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar searchValue={''} />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar searchValue={''} />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    expect(input.value).toBe('Matrix');
  });

  it('calls handleQueryChange with correct parameters on form submit', () => {
    render(<SearchBar searchValue={''} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.submit(input);

    expect(testSetSearchParams).toHaveBeenCalledWith('page=1&query=Matrix');
  });
});
