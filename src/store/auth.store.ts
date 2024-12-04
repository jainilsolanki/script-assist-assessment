import { create } from 'zustand';
import { useThemeStore } from './theme.store';

/**
 * User interface defining the structure of user data
 */
interface User {
  username: string;
}

/**
 * Authentication state and actions interface
 * Defines the structure of the auth store
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

/**
 * Zustand store for managing authentication state
 * Handles user login/logout and persists state in localStorage
 */
export const useAuthStore = create<AuthState>((set) => ({
  // Initialize user from localStorage if available
  user: (() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })(),
  // Check if user is authenticated based on localStorage
  isAuthenticated: !!localStorage.getItem('user'),
  
  // Handle user login
  login: (username: string, password: string) => {
    if (username && password) {
      const user = { username };
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    }
  },

  // Handle user logout
  logout: () => {
    localStorage.removeItem('user');
    useThemeStore.getState().resetTheme();
    set({ user: null, isAuthenticated: false });
  },
}));
