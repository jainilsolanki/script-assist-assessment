import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
  Button,
} from '@mantine/core';
import { useAuth } from '../store/auth.context';

const resources = [
  { label: 'People', value: 'people' },
  { label: 'Planets', value: 'planets' },
  { label: 'Starships', value: 'starships' },
  { label: 'Vehicles', value: 'vehicles' },
  { label: 'Species', value: 'species' },
];

export default function Layout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          {resources.map((resource) => (
            <NavLink
              key={resource.value}
              label={resource.label}
              onClick={() => {
                navigate(`/${resource.value}`);
                setOpened(false);
              }}
            />
          ))}
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text>Star Wars Explorer</Text>
            </div>
            <Button onClick={handleLogout} variant="subtle">
              Logout
            </Button>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
