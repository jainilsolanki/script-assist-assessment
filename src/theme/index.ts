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
  components: {
    Title: {
      styles: (theme) => ({
        root: {
          '&[data-star-wars]': {
            fontFamily: "'Star Jedi', sans-serif",
            color: theme.colors.yellow[6],
            textShadow: '0 0 10px rgba(255, 232, 31, 0.5)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
            lineHeight: 1.4,
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
              letterSpacing: '1px',
              textShadow: '0 0 5px rgba(255, 232, 31, 0.5)',
            },
            [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
              letterSpacing: '0.5px',
              wordBreak: 'break-word',
              hyphens: 'auto',
            }
          }
        }
      })
    }
  },
};
