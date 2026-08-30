import React, { useState } from 'react';
import { X, ShoppingCart, MessageCircle } from 'lucide-react';
import styles from '../styles/ProductOrderModal.module.css';
import { addToCart, generateWhatsAppProductMessage, generateWhatsAppLink } from '../utils/helpers';

export default function ProductOrderModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
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
    setTimeout(() => {
      onClose();
      setAddedToCart(false);
    }, 1500);
  };

  const handleWhatsAppEnquiry = (e) => {
    e.preventDefault();
    let message = generateWhatsAppProductMessage(product.name);
    if (selectedSize) message += `\nSize: ${selectedSize}`;
    if (selectedColor) message += `\nColor: ${selectedColor}`;
    message += `\nQuantity: ${quantity}`;
    window.open(generateWhatsAppLink(message), '_blank');
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </button>

        <div className={styles.content}>
          {/* Product Image - Compact */}
          <div className={styles.imageSection}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </div>

          {/* Product Details */}
          <div className={styles.detailsSection}>
            {/* Header */}
            <div className={styles.header}>
              <span className={styles.badge}>{product.category}</span>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>{product.description}</p>
            </div>

            {/* Options Container */}
            <div className={styles.optionsContainer}>
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className={styles.optionGroup}>
                  <label className={styles.optionLabel}>
                    Size
                    <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.optionButtons}>
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`${styles.optionBtn} ${selectedSize === size ? styles.selected : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className={styles.optionGroup}>
                  <label className={styles.optionLabel}>
                    Color
                    <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.optionButtons}>
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`${styles.optionBtn} ${selectedColor === color ? styles.selected : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className={styles.optionGroup}>
                <label htmlFor="quantity" className={styles.optionLabel}>
                  Quantity
                  <span className={styles.required}>*</span>
                </label>
                <div className={styles.quantitySelector}>
                  <button
                    type="button"
                    className={styles.quantityBtn}
                    onClick={decrementQuantity}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className={styles.quantityInput}
                  />
                  <button
                    type="button"
                    className={styles.quantityBtn}
                    onClick={incrementQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Minimum Order Quantity Info - Only show if exists and > 0 */}
              {product.minOrderQty && product.minOrderQty > 0 && (
                <div className={styles.infoBox}>
                  <p className={styles.infoText}>
                    <strong>Minimum Order:</strong> {product.minOrderQty} units
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`${styles.primaryBtn} ${addedToCart ? styles.success : ''}`}
                disabled={addedToCart}
              >
                <ShoppingCart size={18} />
                {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                className={styles.secondaryBtn}
              >
                <MessageCircle size={18} />
                WhatsApp Enquiry
              </button>
            </div>

            {/* Product Info */}
            {(product.material || product.customizable || product.inStock) && (
              <div className={styles.productInfo}>
                {product.material && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Material:</span>
                    <span className={styles.infoValue}>{product.material}</span>
                  </div>
                )}
                {product.customizable && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Customizable:</span>
                    <span className={styles.infoValue}>Yes</span>
                  </div>
                )}
                {product.inStock && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Status:</span>
                    <span className={`${styles.infoValue} ${styles.inStock}`}>In Stock</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}