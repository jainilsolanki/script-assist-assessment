import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/people" replace /> : <>{children}</>;
}
