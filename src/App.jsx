import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Productdetail from './pages/Productdetail';
import Customkit from './pages/Customkit';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadFromStorage = () => {
      const savedCart = localStorage.getItem('securekit-cart');
      const savedWishlist = localStorage.getItem('securekit-wishlist');

      setCart(savedCart ? JSON.parse(savedCart) : []);
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
    };

    loadFromStorage();

    // Same-tab updates (helpers.js dispatches these whenever cart/wishlist change)
    const handleCartUpdate = (e) => setCart(e.detail || []);
    const handleWishlistUpdate = (e) => setWishlist(e.detail || []);

    window.addEventListener('securekit-cart-updated', handleCartUpdate);
    window.addEventListener('securekit-wishlist-updated', handleWishlistUpdate);
    // Cross-tab updates
    window.addEventListener('storage', loadFromStorage);

    return () => {
      window.removeEventListener('securekit-cart-updated', handleCartUpdate);
      window.removeEventListener('securekit-wishlist-updated', handleWishlistUpdate);
      window.removeEventListener('storage', loadFromStorage);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:id" element={<Productdetail />} />
        <Route path="/custom-kit" element={<Customkit />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </Router>
  );
}