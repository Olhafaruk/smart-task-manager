import { useState, useEffect, ReactNode } from 'react';
import { ThemeContext, Theme } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeStyle, setThemeStyle] = useState<Theme>(() => {
    const saved = localStorage.getItem('themeStyle');
    return (saved as Theme) || 'minimal';
  });

  useEffect(() => {
    localStorage.setItem('themeStyle', themeStyle);
  }, [themeStyle]);

  return (
    <ThemeContext.Provider value={{ themeStyle, setThemeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}
