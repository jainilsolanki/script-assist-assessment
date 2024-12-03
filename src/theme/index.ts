import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    starwars: [
      '#D4AF37', // 0: Muted gold
      '#C5A028', // 1: Antique gold
      '#B69121', // 2: Aged gold
      '#A68217', // 3: Deep gold
      '#997311', // 4: Rich gold
      '#8B650F', // 5: Bronze gold
      '#7D570D', // 6: Dark gold
      '#6F4D0B', // 7: Shadow gold
      '#614309', // 8: Deep shadow
      '#533908', // 9: Dark bronze
    ],
    dark: [
      '#D1D1D1', // 0
      '#A1A1A1', // 1
      '#808080', // 2
      '#636363', // 3
      '#484848', // 4
      '#2D2D2D', // 5
      '#212121', // 6
      '#1A1A1A', // 7
      '#141414', // 8
      '#0A0A0A', // 9
    ],
  },
  primaryColor: 'starwars',
  defaultRadius: 'md',
  fontFamily: 'Outfit, sans-serif',
  headings: {
    fontFamily: 'Outfit, sans-serif',
  },
  components: {
    Title: {
      styles: (theme) => ({
        root: {
          '&[data-star-wars]': {
            fontFamily: "'Star Jedi', sans-serif",
            color: theme.colors.starwars[2],
            textShadow: `0 0 8px ${theme.colors.starwars[2]}40`,
            letterSpacing: '2px',
            fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
            marginTop:'-0.5rem',
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
              letterSpacing: '1.5px',
              fontSize: 'clamp(1rem, 3vw, 2rem)',
              marginTop:'-0.5rem !important',
            },
            [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
              letterSpacing: '1px',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
              wordBreak: 'break-word',
              marginTop:'-0.25rem !important',
            }
          }
        }
      })
    }
  },
  other: {
    titleFontFamily: "'Star Jedi', sans-serif",
  },
};

export default theme;
