import React from 'react';
import { render } from '@testing-library/react';
import { ThemeWrap } from './theme-wrap.tsx';
import { ThemeContextType } from '../../hooks/theme-provider.tsx';

const theme = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};
vi.mock('../../hooks/theme-provider.tsx', () => ({
  useTheme: (): ThemeContextType => theme,
}));

describe('ThemeWrap', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeWrap>
        <div>Test Child</div>
      </ThemeWrap>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('sets data-theme to light when isDarkTheme is false', () => {
    const { container } = render(
      <ThemeWrap>
        <div>Test Child</div>
      </ThemeWrap>
    );

    expect(container.firstChild).toHaveAttribute('data-theme', 'light');
  });

  it('sets data-theme to dark when isDarkTheme is true', () => {
    theme.isDarkTheme = true;
    const { container } = render(
      <ThemeWrap>
        <div>Test Child</div>
      </ThemeWrap>
    );

    expect(container.firstChild).toHaveAttribute('data-theme', 'dark');
  });
});
