import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { SearchBar } from './search-bar.tsx';
import * as useRequestParamsModule from '../../hooks/use-request-params.tsx';

vi.mock('../../hooks/use-request-params', () => ({
  useRequestParams: vi.fn(() => ({
    searchParams: new URLSearchParams('query=Matrix'),
    setSearchParams: vi.fn(),
  })),
}));

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    expect(input.value).toBe('Matrix');
  });

  it('calls setSearchParams with correct parameters on form submit', () => {
    const mockSetSearchParams = vi.fn();
    vi.spyOn(useRequestParamsModule, 'useRequestParams').mockImplementation(
      () => ({
        searchParams: new URLSearchParams('query=Matrix'),
        setSearchParams: mockSetSearchParams,
      })
    );

    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.submit(input);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      query: 'Matrix',
      page: '1',
    });
  });
});
