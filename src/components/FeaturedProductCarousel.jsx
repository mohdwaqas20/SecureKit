import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, ShoppingCart } from 'lucide-react';
import styles from '../styles/FeaturedProductCarousel.module.css';
import { products } from '../data/products';
import { toggleWishlist, isInWishlist } from '../utils/helpers';
import ProductOrderModal from './ProductOrderModal';

export default function FeaturedProductCarousel({ scrollRef, onScroll }) {
  const carouselTrackRef = scrollRef || useRef(null);
  const [isWishlisted, setIsWishlisted] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Initialize wishlist state
  useEffect(() => {
    const wishlistState = {};
    products.forEach(product => {
      wishlistState[product.id] = isInWishlist(product.id);
    });
    setIsWishlisted(wishlistState);
  }, []);

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    setIsWishlisted(prev => ({
      ...prev,
      [product.id]: !prev[product.id]
    }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handlePrevious = () => {
    if (onScroll) {
      onScroll(-1);
    }
  };

  const handleNext = () => {
    if (onScroll) {
      onScroll(1);
    }
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.arrowLeft}`}
            onClick={handlePrevious}
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.carouselTrack} ref={carouselTrackRef}>
            {products.map((product) => (
              <div key={product.id} className={styles.productSlide} data-product-slide>
                <Link to={`/product/${product.id}`} className={styles.productCard}>
                  {/* Image Container */}
                  <div className={styles.imageContainer}>
                    <img src={product.image} alt={product.name} className={styles.image} />
                  </div>

                  {/* Content */}
                  <div className={styles.content}>
                    <span className={styles.badge}>{product.category}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDescription}>{product.description}</p>

                    {/* Footer with actions */}
                    <div className={styles.footer}>
                      <button
                        onClick={(e) => handleWishlist(e, product)}
                        className={`${styles.wishlistBtn} ${isWishlisted[product.id] ? styles.wishlisted : ''}`}
                        title={isWishlisted[product.id] ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={20} fill={isWishlisted[product.id] ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={styles.addToCartBtn}
                        title="Add to cart"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.arrowRight}`}
            onClick={handleNext}
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <ProductOrderModal
          product={selectedProduct}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </>
  );
}