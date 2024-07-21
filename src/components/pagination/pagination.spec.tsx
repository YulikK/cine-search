import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination.tsx';
import * as useRequestParamsModule from '../../hooks/use-request-params.tsx';

vi.mock('../../hooks/use-request-params', () => ({
  useRequestParams: vi.fn(),
}));

describe('Pagination', () => {
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useRequestParamsModule, 'useRequestParams').mockImplementation(
      () => ({
        searchParams: new URLSearchParams({ page: '2' }),
        setSearchParams: mockSetSearchParams,
      })
    );
  });

  it('renders correctly with middle page selected', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const page2Button = screen.getByRole('button', { name: '2' });
    expect(page2Button).toHaveClass('bg-primary text-primary-foreground');
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('navigates to the previous page when the previous button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });
  });

  it('navigates to the next page when the next button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' });
  });

  it('navigates to the selected page when a page number is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' });
  });

  it('disables the previous button on the first page', () => {
    vi.spyOn(useRequestParamsModule, 'useRequestParams').mockImplementation(
      () => ({
        searchParams: new URLSearchParams({ page: '1' }),
        setSearchParams: mockSetSearchParams,
      })
    );
    render(<Pagination currentPage={1} totalPages={5} />);
    expect(
      screen.getByRole('button', { name: /previous page/i })
    ).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    vi.spyOn(useRequestParamsModule, 'useRequestParams').mockImplementation(
      () => ({
        searchParams: new URLSearchParams({ page: '5' }),
        setSearchParams: mockSetSearchParams,
      })
    );
    render(<Pagination currentPage={5} totalPages={5} />);
    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });
});
