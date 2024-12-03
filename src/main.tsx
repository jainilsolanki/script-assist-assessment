import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import App from './App';
import { useThemeStore } from './store/theme.store';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import PublicRoute from './components/PublicRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { theme } from './theme';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        ),
        children: [
          {
            path: ':resourceType',
            element: <ResourceList />,
          },
          {
            path: ':resourceType/:id',
            element: <ResourceDetail />,
          },
        ],
      },
    ],
  },
]);

function Root() {
  const { colorScheme, toggleColorScheme } = useThemeStore();

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
