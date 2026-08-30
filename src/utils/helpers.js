export const WHATSAPP_NUMBER = '919956772595';
export const PHONE_NUMBER = '9956772595';
export const EMAIL = 'aasent142103@gmail.com';

export const generateWhatsAppLink = (message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const generateWhatsAppProductMessage = (productName) => {
  return `Hello SecureKit Enterprises, I am interested in the product "${productName}". Please share the price, available sizes, customization options and other details.`;
};

export const generateWhatsAppCartMessage = (cartItems, allProducts) => {
  if (!cartItems || cartItems.length === 0) {
    return 'Hello SecureKit Enterprises, I would like to enquire about your security products.';
  }

  let message = 'Hello SecureKit Enterprises, I would like to enquire about the following products:\n\n';
  
  cartItems.forEach((item, index) => {
    const product = allProducts.find(p => p.id === item.id);
    const productName = product ? product.name : item.id;
    message += `${index + 1}. ${productName} — Qty: ${item.quantity}\n`;
  });

  message += '\nPlease share pricing, MOQ, customization options and delivery details.';
  
  return message;
};

export const sendWhatsApp = (message) => {
  const link = generateWhatsAppLink(message);
  window.open(link, '_blank');
};

export const generateCustomKitMessage = (selectedItems, quantities, customization) => {
  let message = 'Hello SecureKit Enterprises, I would like to create a custom security kit with the following requirements:\n\n';

  if (selectedItems.length > 0) {
    message += 'Products:\n';
    selectedItems.forEach((item, index) => {
      message += `${index + 1}. ${item}\n`;
    });
    message += '\n';
  }

  if (customization.agency) {
    message += `Agency/Company: ${customization.agency}\n`;
  }
  if (customization.personnel) {
    message += `Number of Security Personnel: ${customization.personnel}\n`;
  }
  if (customization.branding) {
    message += `Logo/Branding Requirement: ${customization.branding}\n`;
  }
  if (customization.additional) {
    message += `Additional Requirements: ${customization.additional}\n`;
  }

  message += '\nPlease share pricing and delivery details.';

  return message;
};

export const generateEnquiryMessage = (formData) => {
  let message = 'Hello SecureKit Enterprises,\n\n';
  message += `I am contacting you with the following enquiry:\n\n`;
  message += `Name: ${formData.name}\n`;
  message += `Company/Agency: ${formData.company}\n`;
  message += `Phone: ${formData.phone}\n`;
  message += `Email: ${formData.email}\n`;
  message += `Product Interest: ${formData.product}\n`;
  message += `Approximate Quantity: ${formData.quantity}\n`;
  
  if (formData.message) {
    message += `\nMessage: ${formData.message}\n`;
  }

  message += '\nPlease share pricing and availability details.';

  return message;
};

// LocalStorage helpers
export const getCart = () => {
  const cart = localStorage.getItem('securekit-cart');
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart) => {
  localStorage.setItem('securekit-cart', JSON.stringify(cart));
  // Notify the rest of the app (e.g. Navbar badge) immediately, without a refresh
  window.dispatchEvent(new CustomEvent('securekit-cart-updated', { detail: cart }));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
    });
  }

  setCart(cart);
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  setCart(updatedCart);
  return updatedCart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity = Math.max(1, quantity);
  }

  setCart(cart);
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('securekit-cart');
  return [];
};

// Wishlist helpers
export const getWishlist = () => {
  const wishlist = localStorage.getItem('securekit-wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

export const setWishlist = (wishlist) => {
  localStorage.setItem('securekit-wishlist', JSON.stringify(wishlist));
  // Notify the rest of the app (e.g. Navbar badge) immediately, without a refresh
  window.dispatchEvent(new CustomEvent('securekit-wishlist-updated', { detail: wishlist }));
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  const exists = wishlist.find(item => item.id === product.id);

  if (!exists) {
    wishlist.push({
      id: product.id,
      name: product.name,
      image: product.image,
    });
  }

  setWishlist(wishlist);
  return wishlist;
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  setWishlist(updatedWishlist);
  return updatedWishlist;
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

export const toggleWishlist = (product) => {
  if (isInWishlist(product.id)) {
    return removeFromWishlist(product.id);
  } else {
    return addToWishlist(product);
  }
};