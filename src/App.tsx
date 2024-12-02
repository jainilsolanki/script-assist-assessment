import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/auth.context';
import Login from './pages/Login';
import Layout from './components/Layout';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/:resourceType" element={<ResourceList />} />
          <Route path="/:resourceType/:id" element={<ResourceDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
