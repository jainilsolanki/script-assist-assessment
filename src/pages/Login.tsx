import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Stack,
  Box,
  Grid,
  MediaQuery,
} from '@mantine/core';
import { useAuth } from '../hooks/useAuth';

/**
 * URL for the Star Wars themed background image
 * Used in both mobile and desktop layouts
 */
const backgroundImage = 'https://img.goodfon.com/wallpaper/nbig/7/c7/zvezdnye-voyny-star-wars-dart.webp';

/**
 * Login Component
 * Provides authentication interface with responsive design
 * Features split-screen layout on desktop and full-screen background on mobile
 */
export default function Login() {
  // Form state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  /**
   * Handle form submission
   * Prevents default form behavior and triggers authentication
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Image - Mobile only */}
      <Box
        className='login-image-animation'
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '@media (min-width: 992px)': {
            display: 'none',
          },
        }}
      />

      <Grid sx={{ minHeight: '100vh' }} m={0} p={0}>
        {/* Left side - Login Form */}
        <Grid.Col
          xs={12}
          md={4}
          p="xl"
          sx={(theme) => ({
            backgroundColor: theme.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '@media (max-width: 991px)': {
              backgroundColor: 'transparent',
              position: 'relative',
              zIndex: 1,
              height: '100vh',
            },
          })}
        >
          <Container size={400} px="xs">
            {/* Application Title */}
            <Title
              align="center"
              data-star-wars
              mb={50}
              sx={(theme) => ({
                color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[7],
              })}
            >
              Star Wars Explorer
            </Title>

            {/* Login Form Card */}
            <Paper
              withBorder
              shadow="md"
              p={30}
              radius="md"
              sx={(theme) => ({
                backgroundColor: theme.white,
                borderColor: theme.colors.yellow[6],
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              })}
            >
              <form onSubmit={handleSubmit}>
                <Stack>
                  {/* Username Input */}
                  <TextInput
                    required
                    label="Username"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="md"
                    styles={(theme) => ({
                      input: {
                        backgroundColor: theme.white,
                        borderColor: theme.colors.yellow[6],
                        '&:focus': {
                          borderColor: theme.colors.yellow[7],
                        },
                      },
                      label: {
                        color: theme.colors.dark[6],
                        fontWeight: 500,
                      },
                    })}
                  />

                  {/* Password Input */}
                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="md"
                    styles={(theme) => ({
                      input: {
                        backgroundColor: theme.white,
                        borderColor: theme.colors.yellow[6],
                        '&:focus': {
                          borderColor: theme.colors.yellow[7],
                        },
                      },
                      label: {
                        color: theme.colors.dark[6],
                        fontWeight: 500,
                      },
                    })}
                  />

                  {/* Submit Button */}
                  <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    type="submit"
                    variant="filled"
                    sx={(theme) => ({
                      backgroundColor: '#d4af37',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#A68217',
                      },
                    })}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Container>
        </Grid.Col>

        {/* Right side - Background Image (desktop only) */}
        <Grid.Col
          xs={0}
          md={8}
          p={0}
          sx={{ position: 'relative', overflow: 'hidden' }}
        >
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Box sx={{ height: '100%' }}>
              <Box
                className='login-image-animation'
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Box>
          </MediaQuery>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
