import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

const lightColors = {
  background: '#ffffff',
  surface: '#f1f5f9',
  text: '#0f172a',
  secondaryText: '#475569',
  primary: '#1d4ed8',
  border: '#cbd5e1',
};

const darkColors = {
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f8fafc',
  secondaryText: '#cbd5e1',
  primary: '#93c5fd',
  border: '#64748b',
};

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');
  const isDark = themeMode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  function toggleTheme() {
    setThemeMode((previousMode) => previousMode === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
