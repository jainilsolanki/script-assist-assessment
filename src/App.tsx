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

// Configure React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: Infinity,
      retry: true,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Get valid resource types from the resources array for route validation
const validResourceTypes = resources.map(resource => resource.value);

// Define application routes with authentication and validation
const router = createBrowserRouter([
  {
    path: '/',
    // Global error boundary for 404s
    errorElement: <NotFound />, 
    children: [
      {
        index: true,
        element: (
          // Redirect root to people page for authenticated users
          <PrivateRoute>
            <Navigate to="/people" replace />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: (
          // Public login page
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        element: (
          // Protected layout wrapper
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        ),
        children: [
          {
            path: ':resourceType',
            element: <ResourceList />,
            loader: ({ params }) => {
              // Validate resource type parameter
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

// Main App component with theme and query providers
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
