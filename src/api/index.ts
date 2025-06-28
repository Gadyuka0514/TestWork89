import axios from 'axios';
import { AuthResponse, LoginCredentials, Product } from '@/types';

const API_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', {
      ...credentials,
      expiresInMins: credentials.expiresInMins || 60,
    });

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await api.post('/auth/refresh', {
    refreshToken,
    expiresInMins: 60,
  });

  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const getProducts = async (limit: number = 12): Promise<Product[]> => {
  const response = await api.get(`/products?limit=${limit}`);
  return response.data.products;
};
