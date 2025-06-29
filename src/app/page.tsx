'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import styles from './page.module.scss';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <p className={styles.loading}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
