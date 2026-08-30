import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, ShoppingCart, Search } from 'lucide-react';
import styles from '../styles/Navbar.module.css';
import { products } from '../data/products';

export default function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="SecureKit Enterprises" className={styles.logoImage} />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link to="/" className={isActive('/') ? styles.linkActive : styles.link}>
            Home
          </Link>
          <Link to="/about" className={isActive('/about') ? styles.linkActive : styles.link}>
            About
          </Link>
          
          <div className={styles.dropdown}>
            <button className={styles.dropdownBtn}>
              Products
            </button>
            <div className={styles.dropdownMenu}>
              <Link to="/products" className={styles.dropdownItem}>
                All Products
              </Link>
              <Link to="/products/uniforms" className={styles.dropdownItem}>
                Uniforms
              </Link>
              <Link to="/products/safety-shoes" className={styles.dropdownItem}>
                Safety Shoes
              </Link>
              <Link to="/products/seasonal-gears" className={styles.dropdownItem}>
                Seasonal Gears
              </Link>
              <Link to="/products/essential-gears" className={styles.dropdownItem}>
                Essential Gears
              </Link>
            </div>
          </div>

          <Link to="/custom-kit" className={isActive('/custom-kit') ? styles.linkActive : styles.link}>
            Custom Kit
          </Link>
          <Link to="/contact" className={isActive('/contact') ? styles.linkActive : styles.link}>
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <button className={`${styles.iconBtn} ${styles.searchBtn}`} onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={20} />
          </button>

          <Link to="/cart" className={styles.cartBtn}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          <Link to="/wishlist" className={styles.wishlistBtn}>
            <Heart size={20} />
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>

          <a href="https://wa.me/919956772595?text=Hello%20SecureKit%20Enterprises%2C%20I%20would%20like%20to%20request%20a%20quote." 
             className={`btn btn-primary ${styles.ctaBtn}`}
             target="_blank"
             rel="noopener noreferrer">
            Get a Quote
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Dialog */}
      {searchOpen && (
        <div className={styles.searchOverlay} onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}>
          <div className={styles.searchDialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.searchContainer}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button 
                  className={styles.clearBtn}
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                >
                  ✕
                </button>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className={styles.searchResults}>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className={styles.searchResultItem}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img src={product.image} alt={product.name} className={styles.resultImage} />
                    <div className={styles.resultContent}>
                      <h4 className={styles.resultName}>{product.name}</h4>
                      <p className={styles.resultCategory}>{product.category}</p>
                      <p className={styles.resultDescription}>{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className={styles.noResults}>
                <p>No products found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className={styles.searchHint}>
                <p>Start typing to search products...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          
          <div className={styles.mobileDropdown}>
            <button 
              className={styles.mobileDropdownBtn}
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
            >
              Products
            </button>
            {productDropdownOpen && (
              <div className={styles.mobileDropdownMenu}>
                <Link to="/products" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                  All Products
                </Link>
                <Link to="/products/uniforms" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                  Uniforms
                </Link>
                <Link to="/products/safety-shoes" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                  Safety Shoes
                </Link>
                <Link to="/products/seasonal-gears" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                  Seasonal Gears
                </Link>
                <Link to="/products/essential-gears" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                  Essential Gears
                </Link>
              </div>
            )}
          </div>

          <Link to="/custom-kit" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            Custom Kit
          </Link>
          <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>

          <a href="https://wa.me/919956772595?text=Hello%20SecureKit%20Enterprises%2C%20I%20would%20like%20to%20request%20a%20quote." 
             className="btn btn-primary"
             style={{ marginTop: '1rem' }}
             target="_blank"
             rel="noopener noreferrer">
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  );
}