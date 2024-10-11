'use client';

import { useTheme } from '../../hooks/theme-provider.tsx';

interface ThemeWrapProps {
  children: React.ReactNode;
}

export const ThemeWrap: React.FC<ThemeWrapProps> = (props) => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      data-theme={isDarkTheme ? 'dark' : 'light'}
      className="flex bg-muted w-full"
    >
      {props.children}
    </div>
  );
};
