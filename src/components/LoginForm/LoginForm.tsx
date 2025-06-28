'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/api';
import { useAuthStore } from '@/store/auth';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 3) {
      setError('Username and password must be at least 3 characters long');
      return;
    }

    try {
      setIsLoading(true);
      const authResponse = await login({
        username,
        password,
        expiresInMins: 60,
      });

      if (!authResponse || !authResponse.accessToken) {
        throw new Error('Invalid response from server');
      }

      setUser(authResponse);
      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={3}
          required
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};
