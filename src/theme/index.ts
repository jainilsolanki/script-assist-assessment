import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    // Star Wars yellow variations
    yellow: [
      '#FFF5CC',
      '#FFEFB3',
      '#FFE999',
      '#FFE380',
      '#FFDD66',
      '#FFD74D',
      '#FFE81F', // Primary Star Wars yellow
      '#E6D01C',
      '#CCB919',
      '#B3A216',
    ],
    // Dark space theme
    dark: [
      '#C1C2C5',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#1A1B1E',
      '#141517',
      '#101113',
      '#0C0D0E',
      '#080809',
    ],
  },
  primaryColor: 'yellow',
};
