'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import styles from './Header.module.scss';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <a href="tel:+021-95-51-84">
              <i className="fas fa-phone" />
              +021-95-51-84
            </a>
            <a href="mailto:shop@abelohost.com">
              <i className="fas fa-envelope" />
              shop@abelohost.com
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt" />
              1734 Stonecoal Road
            </a>
          </div>
          {isAuthenticated ? (
            <div className="auth-link">
              <span>
                {user?.firstName} {user?.lastName}
              </span>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="auth-link">
              <i className="fas fa-user" />
              Login
            </Link>
          )}
        </div>
      </div>
      <header className={styles.header}>
        <div className={`container ${styles.container}`}>
          <Link href="/" className={styles.logo}>
            Abelohost Shop<span>.</span>
          </Link>
        </div>
      </header>
      <nav className="main-nav">
        <div className="container">
          <Link href="/">Home</Link>
          <Link href="/hot-deals">Hot Deals</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/laptops">Laptops</Link>
          <Link href="/smartphones">Smartphones</Link>
          <Link href="/cameras">Cameras</Link>
          <Link href="/accessories">Accessories</Link>
        </div>
      </nav>
    </>
  );
};
