'use client'
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
};

export default ThemeSwitcher;