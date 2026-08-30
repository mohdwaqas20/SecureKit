import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { products } from '../data/products';
import { addToCart, toggleWishlist, isInWishlist, generateWhatsAppProductMessage, generateWhatsAppLink } from '../utils/helpers';
import styles from '../styles/Productdetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(id));
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const mainImageRef = useRef(null);

  // Get all images array
  const allImages = product?.images ? [product.image, ...product.images] : [product?.image];
  const currentImage = allImages[currentImageIndex];

  // Handle next image
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  // Handle previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    // Account for main image being first in display
    setCurrentImageIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    }
    if (isRightSwipe) {
      handlePrevImage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Product Not Found</h1>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      alert('Please select a color');
      return;
    }
    addToCart(product, quantity, { size: selectedSize, color: selectedColor });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  const handleWhatsAppEnquiry = () => {
    let message = generateWhatsAppProductMessage(product.name);
    if (selectedSize) message += `\nSize: ${selectedSize}`;
    if (selectedColor) message += `\nColor: ${selectedColor}`;
    message += `\nQuantity: ${quantity}`;
    window.open(generateWhatsAppLink(message), '_blank');
  };

  return (
    <main className={styles.productDetail}>
      <div className="container">
        <Link to="/products" className={styles.backLink}>
          <ChevronLeft size={18} />
          Back to Products
        </Link>

        <div className={styles.content}>
          {/* Images Gallery */}
          <div className={styles.imageSection}>
            {/* Main Image with Swipe Support */}
            <div 
              className={styles.mainImage}
              ref={mainImageRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="img"
              aria-label={`${product.name} - Image ${currentImageIndex + 1} of ${allImages.length}`}
            >
              <img src={currentImage} alt={product.name} />
              
              {/* Zoom Button */}
              <button 
                className={styles.zoomBtn}
                onClick={() => setIsZoomOpen(true)}
                aria-label="View larger image"
                title="Zoom in"
              >
                <Maximize2 size={20} />
              </button>
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button 
                    className={styles.navArrowLeft}
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    title="Previous image (Swipe right or press ←)"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    className={styles.navArrowRight}
                    onClick={handleNextImage}
                    aria-label="Next image"
                    title="Next image (Swipe left or press →)"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Image Counter */}
                  <div className={styles.imageCounter}>
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className={styles.thumbnailsWrapper}>
                <div className={styles.thumbnails}>
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      className={`${styles.thumbnail} ${currentImageIndex === index ? styles.active : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={currentImageIndex === index}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className={styles.detailsSection}>
            <span className={styles.badge}>{product.category}</span>
            <h1>{product.name}</h1>
            <p className={styles.description}>{product.longDescription || product.description}</p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className={styles.features}>
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            <div className={styles.specifications}>
              <div className={styles.spec}>
                <label>Material</label>
                <p>{product.material}</p>
              </div>
              <div className={styles.spec}>
                <label>Minimum Order</label>
                <p>No MOQ Required</p>
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.options}>
                <label>Available Sizes</label>
                <div className={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className={styles.options}>
                <label>Available Colors</label>
                <div className={styles.colorOptions}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`${styles.colorBtn} ${selectedColor === color ? styles.selected : ''}`}
                      aria-pressed={selectedColor === color}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className={styles.quantity}>
              <label>Quantity</label>
              <div className={styles.quantityControl}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  aria-label="Quantity input"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.actions}>
              <button 
                onClick={handleAddToCart} 
                className={`${styles.cartBtn} ${addedToCart ? styles.added : ''}`}
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
                {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleWishlist} 
                className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWishlisted}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Enquiry */}
            <button onClick={handleWhatsAppEnquiry} className={styles.enquiryBtn}>
              <MessageCircle size={18} />
              Enquire on WhatsApp
            </button>

            {/* Additional Info */}
            {product.customizable && (
              <div className={styles.customizable}>
                <p>✓ This product can be customized according to your requirements.</p>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Products */}
        <div className={styles.suggestedSection}>
          <h2 className={styles.suggestedTitle}>Other Products You May Like</h2>
          <div className={styles.suggestedContainer}>
            <div className={styles.suggestedScroll}>
              {products.filter(p => p.id !== id).map((suggestedProduct) => (
                <Link
                  key={suggestedProduct.id}
                  to={`/product/${suggestedProduct.id}`}
                  className={styles.suggestedCard}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className={styles.suggestedImage}>
                    <img src={suggestedProduct.image} alt={suggestedProduct.name} />
                    <span className={styles.suggestedBadge}>{suggestedProduct.category}</span>
                  </div>
                  <div className={styles.suggestedInfo}>
                    <h4 className={styles.suggestedName}>{suggestedProduct.name}</h4>
                    <p className={styles.suggestedDesc}>{suggestedProduct.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className={styles.zoomModal} onClick={() => setIsZoomOpen(false)}>
          <div className={styles.zoomContainer} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeZoom}
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close zoom"
            >
              <X size={28} />
            </button>

            <div className={styles.zoomImageWrapper}>
              <img src={currentImage} alt={`${product.name} - Zoomed`} className={styles.zoomImage} />
            </div>

            {/* Zoom Navigation */}
            {allImages.length > 1 && (
              <>
                <button 
                  className={`${styles.zoomNavArrow} ${styles.zoomNavLeft}`}
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  className={`${styles.zoomNavArrow} ${styles.zoomNavRight}`}
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
                
                <div className={styles.zoomCounter}>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}

            {/* Thumbnail strip in zoom */}
            <div className={styles.zoomThumbnails}>
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.zoomThumb} ${currentImageIndex === index ? styles.active : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}