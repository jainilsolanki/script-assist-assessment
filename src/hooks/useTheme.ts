import { useThemeStore } from '../store/theme.store';

export const useTheme = () => {
  const colorScheme = useThemeStore((state) => state.colorScheme);
  const toggleColorScheme = useThemeStore((state) => state.toggleColorScheme);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  return {
    colorScheme,
    toggleColorScheme,
    resetTheme,
  };
};