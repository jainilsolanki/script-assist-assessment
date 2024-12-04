import { create } from 'zustand';
import { ColorScheme } from '@mantine/core';

/**
 * Theme state and actions interface
 * Defines the structure of the theme store
 */
interface ThemeState {
  colorScheme: ColorScheme;
  toggleColorScheme: (value?: ColorScheme) => void;
  resetTheme: () => void;
}

/**
 * Zustand store for managing theme state
 * Handles color scheme persistence and toggling
 */
export const useThemeStore = create<ThemeState>((set) => ({
  // Initialize color scheme from localStorage or default to light
  colorScheme: (localStorage.getItem('theme') as ColorScheme) || 'light',

  // Toggle between light and dark mode
  toggleColorScheme: (value?: ColorScheme) =>
    set((state) => {
      const newColorScheme = value || (state.colorScheme === 'dark' ? 'light' : 'dark');
      localStorage.setItem('theme', newColorScheme);
      return { colorScheme: newColorScheme };
    }),

  // Reset theme to default light mode
  resetTheme: () => {
    localStorage.setItem('theme', 'light');
    set({ colorScheme: 'light' });
  },
}));
