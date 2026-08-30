import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import {
  generateWhatsAppCartMessage,
  sendWhatsApp,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart as clearCartStorage,
} from '../utils/helpers';
import styles from '../styles/Cart.module.css';
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, ChevronRight } from 'lucide-react';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Your Cart | SecureKit Enterprises';
    setCart(getCart());
  }, []);

  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCart(updateCartQuantity(productId, quantity));
  };

  const removeItem = (productId) => {
    setCart(removeFromCart(productId));
  };

  const handleWhatsAppEnquiry = () => {
    const message = generateWhatsAppCartMessage(cart, products);
    sendWhatsApp(message);
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart(clearCartStorage());
    }
  };

  const validItems = cart.filter(item => getProductDetails(item.id));
  const totalQuantity = validItems.reduce((sum, item) => sum + item.quantity, 0);

  if (validItems.length === 0) {
    return (
      <>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.heroEyebrow}>
                <span>Enquiry Cart</span>
              </div>
              <h1 className={styles.heroTitle}>
                Your <span className={styles.accent}>Cart</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Build your security kit and send it to us as an enquiry
              </p>
            </div>
          </div>
        </section>

        {/* Empty Cart */}
        <div className={styles.cartContainer}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={80} />
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Start adding products to build your security kit</p>
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
              <span>Enquiry Cart</span>
            </div>
            <h1 className={styles.heroTitle}>
              Your <span className={styles.accent}>Cart</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Review your selection and send your enquiry to SecureKit
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className={styles.cartContainer}>
        <div className={styles.cartStats}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{validItems.length}</span>
            <span className={styles.statLabel}>Items in Cart</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{totalQuantity}</span>
            <span className={styles.statLabel}>Total Units</span>
          </div>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {validItems.map(item => {
              const product = getProductDetails(item.id);

              return (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className={styles.itemDetails}>
                    <p className={styles.category}>{product.category} • {product.subcategory}</p>
                    <h3>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.specs}>
                      <span className={styles.moq}><strong>MOQ:</strong> {product.minOrderQty} units</span>
                      {product.customizable && <span className={styles.customizable}>✓ Customizable</span>}
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id)}
                      title="Remove from cart"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cartSummary}>
            <h3>Enquiry Summary</h3>
            <div className={styles.summaryItems}>
              <p><span>Total Items</span><strong>{validItems.length}</strong></p>
              <p><span>Total Quantity</span><strong>{totalQuantity} units</strong></p>
            </div>

            <div className={styles.actions}>
              <button className={styles.whatsappButton} onClick={handleWhatsAppEnquiry}>
                <MessageCircle size={20} />
                Send Enquiry on WhatsApp
              </button>
              <button className={styles.continueButton} onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
              <button className={styles.clearButton} onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            <div className={styles.info}>
              <p><strong>Next Step:</strong> WhatsApp our team with your enquiry including product details, quantities, customization requirements, and delivery preferences.</p>
              <p><strong>Response Time:</strong> Our team will respond within 24 hours with pricing, MOQ details, and quotation.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}