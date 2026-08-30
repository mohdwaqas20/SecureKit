import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import styles from '../styles/Wishlist.module.css';
import { Trash2, Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { getWishlist, removeFromWishlist as removeFromWishlistStorage, addToCart as addToCartStorage } from '../utils/helpers';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Wishlist | SecureKit Enterprises';
    setWishlist(getWishlist());
  }, []);

  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = removeFromWishlistStorage(productId);
    setWishlist(updatedWishlist);
  };

  const addToCart = (product) => {
    addToCartStorage(product, 1);
    alert('Product added to cart!');
  };

  const viewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Wishlist entries are stored as { id, name, image } objects, so pull
  // the id off each entry before looking up the full product record.
  const validProducts = wishlist
    .map(item => getProductDetails(item.id))
    .filter(product => product !== undefined);

  if (validProducts.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.heroEyebrow}>
                <span>Personal Collection</span>
              </div>
              <h1 className={styles.heroTitle}>
                My <span className={styles.accent}>Wishlist</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Save products for quick access and easy comparison
              </p>
            </div>
          </div>
        </section>

        {/* Empty Wishlist */}
        <div className={styles.wishlistContainer}>
          <div className={styles.emptyWishlist}>
            <div className={styles.emptyIcon}>
              <Heart size={80} />
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Save products to your wishlist for easy access later</p>
            <button className={styles.exploreButton} onClick={() => navigate('/products')}>
              Explore Products
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span>Personal Collection</span>
            </div>
            <h1 className={styles.heroTitle}>
              My <span className={styles.accent}>Wishlist</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {validProducts.length} product{validProducts.length !== 1 ? 's' : ''} saved in your wishlist
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <div className={styles.wishlistContainer}>
        <div className={styles.wishlistStats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{validProducts.length}</span>
            <span className={styles.statLabel}>Products Saved</span>
          </div>
        </div>

        <div className={styles.wishlistGrid}>
          {validProducts.map(product => (
            <div key={product.id} className={styles.wishlistCard}>
              <div className={styles.cardImage}>
                <img src={product.image} alt={product.name} />
                <button 
                  className={styles.removeWishlistBtn} 
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from wishlist"
                >
                  <Heart size={20} fill="white" color="white" />
                </button>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.cardCategory}>{product.category} • {product.subcategory}</p>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardDescription}>{product.description}</p>

                <div className={styles.cardSpecs}>
                  <span className={styles.spec}>
                    <strong>MOQ:</strong> {product.minOrderQty} units
                  </span>
                  {product.customizable && (
                    <span className={styles.specCustom}>
                      ✓ Customizable
                    </span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.viewButton}
                    onClick={() => viewProduct(product.id)}
                  >
                    View Details
                  </button>
                  <button
                    className={styles.addCartButton}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.continueSection}>
          <button 
            className={styles.continueShopping}
            onClick={() => navigate('/products')}
          >
            Continue Exploring
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}