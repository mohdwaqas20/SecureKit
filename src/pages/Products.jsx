import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/Productcard';
import { products, categories } from '../data/products';
import styles from '../styles/Products.module.css';

export default function Products() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [showFilters, setShowFilters] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    document.title = 'Products | SecureKit Enterprises';
  }, []);

  // Update activeCategory when URL parameter changes
  useEffect(() => {
    setActiveCategory(category || 'all');
  }, [category]);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => {
        const categoryMap = {
          'uniforms': 'Uniforms',
          'safety-shoes': 'Safety Shoes',
          'seasonal-gears': 'Seasonal Gears',
          'essential-gears': 'Other Essential Gears',
        };
        return product.category === categoryMap[activeCategory];
      });
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showFilters]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const categoryOptions = [
    { id: 'all', label: 'All Products' },
    { id: 'uniforms', label: 'Uniforms' },
    { id: 'safety-shoes', label: 'Safety Shoes' },
    { id: 'seasonal-gears', label: 'Seasonal Gears' },
    { id: 'essential-gears', label: 'Essential Gears' },
  ];

  return (
    <main className={styles.products}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Security <span className={styles.accent}>Products</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Explore our range of premium security uniforms, footwear, seasonal gear and essential accessories designed for professional security teams.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className={`${styles.content} section`}>
        <div className="container">
          <div className={styles.layout}>
            {/* Sidebar Filters - Desktop */}
            <aside className={styles.sidebar}>
              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Categories</h3>
                <div className={styles.filterOptions}>
                  {categoryOptions.map(option => (
                    <label key={option.id} className={styles.filterLabel}>
                      <input
                        type="radio"
                        name="category"
                        value={option.id}
                        checked={activeCategory === option.id}
                        onChange={() => handleCategoryChange(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <button 
              className={styles.filterToggle} 
              onClick={() => setShowFilters(true)}
              aria-label="Toggle filters"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
              Filters
            </button>

            {/* Mobile Filter Modal */}
            {showFilters && (
              <div className={styles.filterModal} ref={modalRef}>
                <div className={styles.filterModalContent}>
                  <div className={styles.filterModalHeader}>
                    <h3>Filter Products</h3>
                    <button
                      className={styles.closeBtn}
                      onClick={() => setShowFilters(false)}
                      aria-label="Close filters"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className={styles.filterModalBody}>
                    <div className={styles.filterSection}>
                      <h4 className={styles.filterTitle}>Categories</h4>
                      <div className={styles.filterOptions}>
                        {categoryOptions.map(option => (
                          <label key={option.id} className={styles.filterLabel}>
                            <input
                              type="radio"
                              name="category-mobile"
                              value={option.id}
                              checked={activeCategory === option.id}
                              onChange={() => {
                                handleCategoryChange(option.id);
                                setShowFilters(false);
                              }}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className={styles.main}>
              {/* Search Bar */}
              <div className={styles.searchBar}>
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Results Info */}
              <div className={styles.resultsInfo}>
                <p>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className={styles.productGrid}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className={styles.noProducts}>
                  <p>No products found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}