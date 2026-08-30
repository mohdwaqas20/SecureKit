import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { toggleWishlist, isInWishlist } from '../utils/helpers';
import ProductOrderModal from './ProductOrderModal';
import styles from '../styles/Productcard.module.css';

export default function ProductCard({ product, onWishlistChange }) {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    setIsWishlisted(!isWishlisted);
    if (onWishlistChange) onWishlistChange();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className={styles.card}>
        {/* Product Image */}
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>

        {/* Product Info */}
        <div className={styles.content}>
          <span className={styles.badge}>{product.category}</span>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
        </div>

        {/* Bottom Actions */}
        <div className={styles.footer}>
          <button
            onClick={handleWishlist}
            className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleCartClick}
            className={styles.cartBtn}
            title="Add to cart"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Product Order Modal */}
      {isModalOpen && (
        <ProductOrderModal
          product={product}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}