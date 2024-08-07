import React, { createContext, useContext, useState } from 'react';

export interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const IS_DARK_THEME_DEFAULT = false;

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: IS_DARK_THEME_DEFAULT,
  toggleTheme: () => {},
});

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
interface ThemeProviderProps {
  children: React.ReactNode;
}

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
