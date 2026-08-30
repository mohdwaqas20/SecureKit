import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.brand}>
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="SecureKit Enterprises" className={styles.brandLogo} />
              <h3>SECUREKIT ENTERPRISES</h3>
              <p>Built exclusively for the security industry.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/custom-kit">Custom Kit</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Categories</h4>
            <ul>
              <li><Link to="/products/uniforms">Uniforms</Link></li>
              <li><Link to="/products/safety-shoes">Safety Shoes</Link></li>
              <li><Link to="/products/seasonal-gears">Seasonal Gears</Link></li>
              <li><Link to="/products/essential-gears">Essential Gears</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Contact</h4>
            <div className={styles.contactInfo}>
              <a href="mailto:aasent142103@gmail.com" className={styles.contactLink}>
                <Mail size={18} />
                <span>aasent142103@gmail.com</span>
              </a>
              <a href="tel:+919956772595" className={styles.contactLink}>
                <Phone size={18} />
                <span>9956772595</span>
              </a>
              <a href="https://wa.me/919956772595" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.links}>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
          <p className={styles.copyright}>
            © {currentYear} SecureKit Enterprises. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}