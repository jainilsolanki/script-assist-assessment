import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

/**
 * Custom hook for managing authentication state and actions
 * Provides login, logout functionality and access to user state
 * Handles navigation after auth state changes
 */
export const useAuth = () => {
  const navigate = useNavigate();
  
  // Get authentication state from store
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const storeLogin = useAuthStore((state) => state.login);
  const storeLogout = useAuthStore((state) => state.logout);

  /**
   * Handle user login
   * Updates auth store and navigates to home page
   */
  const login = (username: string, password: string) => {
    storeLogin(username, password);
    navigate('/people');
  };

  /**
   * Handle user logout
   * Clears auth store and redirects to login page
   */
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
