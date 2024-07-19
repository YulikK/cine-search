import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../utils/theme-provider.tsx';

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
