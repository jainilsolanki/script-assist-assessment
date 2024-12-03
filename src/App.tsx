import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import { useThemeStore } from './store/theme.store';
import Layout, { resources } from './components/Layout';
import Login from './pages/Login';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import './style.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

// Get valid resource types from the resources array
const validResourceTypes = resources.map(resource => resource.value);

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Navigate to="/people" replace />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        element: (
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        ),
        children: [
          {
            path: ':resourceType',
            element: <ResourceList />,
            loader: ({ params }) => {
              if (!validResourceTypes.includes(params.resourceType || '')) {
                throw new Error('Invalid resource type');
              }
              return null;
            },
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

function App() {
  const { colorScheme, toggleColorScheme } = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
          <RouterProvider router={router} />
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
