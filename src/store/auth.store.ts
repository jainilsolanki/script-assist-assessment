import { create } from 'zustand';
import { useThemeStore } from './theme.store';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: (() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })(),
  isAuthenticated: !!localStorage.getItem('user'),
  
  login: (username: string, password: string) => {
    if (username && password) {
      const user = { username };
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    useThemeStore.getState().resetTheme();
    set({ user: null, isAuthenticated: false });
  },
}));
