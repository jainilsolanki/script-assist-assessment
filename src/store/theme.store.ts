import { create } from 'zustand';
import { ColorScheme } from '@mantine/core';

interface ThemeState {
  colorScheme: ColorScheme;
  toggleColorScheme: (value?: ColorScheme) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: (localStorage.getItem('theme') as ColorScheme) || 'light',
  toggleColorScheme: (value?: ColorScheme) =>
    set((state) => {
      const newColorScheme = value || (state.colorScheme === 'dark' ? 'light' : 'dark');
      localStorage.setItem('theme', newColorScheme);
      return { colorScheme: newColorScheme };
    }),
  resetTheme: () => {
    localStorage.setItem('theme', 'light');
    set({ colorScheme: 'light' });
  },
}));
