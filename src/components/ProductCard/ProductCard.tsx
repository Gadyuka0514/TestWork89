'use client';

import Image from 'next/image';
import { useAuthStore } from '@/store/auth';
import { Product } from '@/types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price}</p>
        {isAuthenticated && (
          <button className={styles.addToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};
