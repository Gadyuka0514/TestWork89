'use client';

import { create } from 'zustand';
import { User, AuthResponse } from '@/types';
import { getCurrentUser, refreshToken } from '@/api';

export interface AuthState {
  user: User | null;
  setUser: (authResponse: AuthResponse) => void;
  isAuthenticated: boolean;
  logout: () => void;
  refreshSession: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (authResponse: AuthResponse) => {
    const user: User = {
      id: authResponse.id,
      username: authResponse.username,
      email: authResponse.email,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      gender: authResponse.gender,
      image: authResponse.image,
      token: authResponse.accessToken,
    };
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },
  refreshSession: async () => {
    try {
      await refreshToken();
      const user = await getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
  checkAuth: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
