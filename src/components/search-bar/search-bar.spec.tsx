import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { SearchBar } from './search-bar.tsx';
import { customRender } from '../../tests/custom-render.tsx';
import { testRouterPush } from '../../tests/vitest.setup.ts';

describe('SearchBar', () => {
  beforeEach(() => {
    testRouterPush.mockClear();
  });

  it('renders correctly', () => {
    customRender(<SearchBar searchValue={''} />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    customRender(<SearchBar searchValue={''} />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    expect(input.value).toBe('Matrix');
  });

  it('calls handleQueryChange with correct parameters on form submit', () => {
    customRender(<SearchBar searchValue={''} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.submit(input);

    expect(testRouterPush).toHaveBeenCalledWith('/?page=1&query=Matrix');
  });
});
