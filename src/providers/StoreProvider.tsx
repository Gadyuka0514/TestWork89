'use client';

import { ReactNode, useRef } from 'react';
import { type StoreApi } from 'zustand';
import { useAuthStore } from '@/store/auth';
import type { AuthState } from '@/store/auth';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi<AuthState>>();
  if (!storeRef.current) {
    storeRef.current = useAuthStore;
  }

  return children;
}
