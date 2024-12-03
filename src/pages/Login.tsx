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

const backgroundImage = 'https://img.goodfon.com/wallpaper/nbig/7/c7/zvezdnye-voyny-star-wars-dart.webp';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Image - Always visible */}
      <Box
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

                  <Button
                    fullWidth
                    mt="xl"
                    size="md"
                    type="submit"
                    variant="filled"
                    sx={(theme) => ({
                      backgroundColor: theme.colors.yellow[6],
                      color: theme.colors.dark[7],
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: theme.colors.yellow[7],
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

        {/* Right side - Image Slideshow (desktop only) */}
        <Grid.Col 
          xs={0} 
          md={8} 
          p={0} 
          sx={{ position: 'relative', overflow: 'hidden' }}
        >
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Box sx={{ height: '100%' }}>
              <Box
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
