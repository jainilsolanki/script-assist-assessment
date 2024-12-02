import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth.context';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/people" replace /> : <>{children}</>;
}
