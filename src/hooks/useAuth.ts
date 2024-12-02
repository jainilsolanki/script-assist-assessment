import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

export const useAuth = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogin = useAuthStore((state) => state.login);
  const storeLogout = useAuthStore((state) => state.logout);

  const login = (username: string, password: string) => {
    storeLogin(username, password);
    navigate('/people');
  };

  const logout = () => {
    storeLogout();
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
