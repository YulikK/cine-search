import React, { createContext, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const IS_DARK_THEME_DEFAULT = false;

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: IS_DARK_THEME_DEFAULT,
  toggleTheme: () => {},
});

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): React.ReactElement => {
  const [isDarkTheme, setIsDarkTheme] = useState(IS_DARK_THEME_DEFAULT);

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
