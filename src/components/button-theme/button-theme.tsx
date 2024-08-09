import React from 'react';
import { MoonIcon } from '../icons/moon-icon/moon-icon';
import { SunIcon } from '../icons/sun-icon/sun-icon';
import { useTheme } from '../../hooks/theme-provider';

export const ThemeToggle: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-ring h-10 px-4 py-2"
      onClick={toggleTheme}
      type="button"
      aria-label="toggle theme mode"
    >
      {isDarkTheme ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
};
