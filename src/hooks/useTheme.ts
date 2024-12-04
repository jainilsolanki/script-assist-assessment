import { useThemeStore } from '../store/theme.store';

/**
 * Custom hook for managing theme state
 * Provides access to color scheme and theme control functions
 * Uses Zustand store for persistent theme state
 */
export const useTheme = () => {
  // Get current color scheme from store
  const colorScheme = useThemeStore((state) => state.colorScheme);
  // Get function to toggle between light/dark mode
  const toggleColorScheme = useThemeStore((state) => state.toggleColorScheme);
  // Get function to reset theme to default
  const resetTheme = useThemeStore((state) => state.resetTheme);

  return {
    colorScheme,
    toggleColorScheme,
    resetTheme,
  };
};