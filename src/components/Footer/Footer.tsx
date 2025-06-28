'use client';

import { useAuthStore } from '@/store/auth';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { user, isAuthenticated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        {isAuthenticated ? (
          <p>
            © {currentYear} - Logged as {user?.email}
          </p>
        ) : (
          <p>© {currentYear}</p>
        )}
      </div>
    </footer>
  );
};
