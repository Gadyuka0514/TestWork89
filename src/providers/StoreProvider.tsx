'use client';

import { ReactNode, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { useAuthStore } from '@/store/auth';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi<any>>();
  if (!storeRef.current) {
    storeRef.current = useAuthStore;
  }

  return children;
}
