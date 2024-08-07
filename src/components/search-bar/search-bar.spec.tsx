import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { SearchBar } from './search-bar.tsx';
import { customRender } from '../../tests/custom-render.tsx';

const handleQueryChange = vi.fn();

describe('SearchBar', () => {
  it('renders correctly', () => {
    customRender(
      <SearchBar searchValue={''} handleQueryChange={handleQueryChange} />
    );
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    customRender(
      <SearchBar searchValue={''} handleQueryChange={handleQueryChange} />
    );
    const input: HTMLInputElement =
      screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    expect(input.value).toBe('Matrix');
  });

  it('calls handleQueryChange with correct parameters on form submit', () => {
    customRender(
      <SearchBar searchValue={''} handleQueryChange={handleQueryChange} />
    );
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.submit(input);

    expect(handleQueryChange).toHaveBeenCalledWith('Matrix');
  });
});
