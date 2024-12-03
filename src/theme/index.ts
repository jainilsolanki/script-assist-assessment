import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    // Custom Star Wars inspired colors
    starwars: [
      '#FFE81F', // 0: Lightest yellow
      '#FFE200', // 1
      '#FFD700', // 2
      '#FFC500', // 3
      '#FFB300', // 4
      '#FFA000', // 5
      '#FF8C00', // 6
      '#FF7700', // 7
      '#FF6200', // 8
      '#FF4D00', // 9: Darkest orange
    ],
    dark: [
      '#C1C2C5', // 0
      '#A6A7AB', // 1
      '#909296', // 2
      '#5C5F66', // 3
      '#373A40', // 4
      '#2C2E33', // 5
      '#25262B', // 6
      '#1A1B1E', // 7
      '#141517', // 8
      '#101113', // 9
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
            color: theme.colors.starwars[4],
            textShadow: `0 0 10px ${theme.colors.starwars[4]}80`,
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
