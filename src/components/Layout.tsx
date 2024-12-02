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
  UnstyledButton,
  Group,
  Stack,
  Popover,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconUser, IconSun, IconMoonStars, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../hooks';

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
  const { user, logout } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

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
          <Stack justify="space-between" h="100%">
            <Stack>
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
            </Stack>

            <Popover width={200} position="top" withArrow shadow="md">
              <Popover.Target>
                <UnstyledButton
                  sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[1],
                    },
                  })}
                >
                  <Group>
                    <IconUser size={20} />
                    <Text size="sm">{user?.username}</Text>
                  </Group>
                </UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack spacing="xs">
                  <Text size="sm" weight={500} mb="xs">
                    {user?.username}
                  </Text>
                  <Group position="apart">
                    <Text size="sm">Theme</Text>
                    <ActionIcon
                      variant="default"
                      onClick={() => toggleColorScheme()}
                      size={30}
                    >
                      {colorScheme === 'dark' ? (
                        <IconSun size={16} />
                      ) : (
                        <IconMoonStars size={16} />
                      )}
                    </ActionIcon>
                  </Group>
                  <UnstyledButton onClick={handleLogout}>
                    <Group>
                      <IconLogout size={16} />
                      <Text size="sm">Logout</Text>
                    </Group>
                  </UnstyledButton>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Stack>
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
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
