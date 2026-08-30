import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageCircle, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { generateEnquiryMessage, generateWhatsAppLink, PHONE_NUMBER, EMAIL, WHATSAPP_NUMBER } from '../utils/helpers';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Contact SecureKit Enterprises | Get in Touch';
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const message = generateEnquiryMessage(formData);
      const whatsappLink = generateWhatsAppLink(message);
      
      // Simulate a brief processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      window.open(whatsappLink, '_blank');
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        product: '',
        quantity: '',
        message: '',
      });
      
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.contact}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span>Get in Touch</span>
            </div>
            <h1 className={styles.heroTitle}>
              Connect with <span className={styles.accent}>SecureKit</span> Today
            </h1>
            <p className={styles.heroSubtitle}>
              Reach out to our team to discuss your security uniform and equipment requirements. We're here to provide fast, professional support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={`${styles.content} section`}>
        <div className="container">
          <div className={styles.mainGrid}>
            {/* Contact Form - Left Side */}
            <div className={styles.formWrapper}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2>Send us Your Requirements</h2>
                  <p>Fill out the form below and we'll get back to you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name <span className={styles.required}>*</span></label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={errors.name ? styles.inputError : ''}
                      disabled={loading}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.errorMessage}>
                        <AlertCircle size={14} /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="company">Company / Security Agency <span className={styles.required}>*</span></label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className={errors.company ? styles.inputError : ''}
                      disabled={loading}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                    />
                    {errors.company && (
                      <span id="company-error" className={styles.errorMessage}>
                        <AlertCircle size={14} /> {errors.company}
                      </span>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number <span className={styles.required}>*</span></label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit number"
                        className={errors.phone ? styles.inputError : ''}
                        disabled={loading}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && (
                        <span id="phone-error" className={styles.errorMessage}>
                          <AlertCircle size={14} /> {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={errors.email ? styles.inputError : ''}
                        disabled={loading}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" className={styles.errorMessage}>
                          <AlertCircle size={14} /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="product">Product Interest</label>
                    <select 
                      id="product"
                      name="product" 
                      value={formData.product} 
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="">Select a category</option>
                      <option value="Uniforms">Uniforms</option>
                      <option value="Safety Shoes">Safety Shoes</option>
                      <option value="Seasonal Gears">Seasonal Gears</option>
                      <option value="Essential Gears">Essential Gears</option>
                      <option value="Custom Kit">Custom Kit</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="quantity">Approximate Quantity</label>
                    <input
                      id="quantity"
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 50 units, 100 units, 1000+ units"
                      disabled={loading}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements..."
                      rows="3"
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn btn-primary ${styles.submitBtn} ${loading ? styles.submitting : ''}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Send Enquiry via WhatsApp
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <div className={styles.successMessage}>
                      <Check size={18} /> Your enquiry has been sent! Redirecting to WhatsApp...
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className={styles.errorAlert}>
                      <AlertCircle size={18} /> An error occurred. Please try again.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Methods - Right Side */}
            <div className={styles.contactMethodsWrapper}>
              <div className={styles.methodsHeader}>
                <h3>Other Ways to Connect</h3>
                <p>Choose your preferred method to reach us instantly</p>
              </div>

              <div className={styles.methodsGrid}>
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.methodCard} ${styles.whatsapp}`}
                >
                  <div className={styles.methodIcon}>
                    <MessageCircle size={28} />
                  </div>
                  <div className={styles.methodContent}>
                    <h4>WhatsApp</h4>
                    <p>Quick & instant responses</p>
                    <span className={styles.methodLink}>Message Now →</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:+91${PHONE_NUMBER}`}
                  className={`${styles.methodCard} ${styles.phone}`}
                >
                  <div className={styles.methodIcon}>
                    <Phone size={28} />
                  </div>
                  <div className={styles.methodContent}>
                    <h4>Call Us</h4>
                    <p>{PHONE_NUMBER}</p>
                    <span className={styles.methodLink}>Dial Now →</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className={`${styles.methodCard} ${styles.email}`}
                >
                  <div className={styles.methodIcon}>
                    <Mail size={28} />
                  </div>
                  <div className={styles.methodContent}>
                    <h4>Email</h4>
                    <p>{EMAIL}</p>
                    <span className={styles.methodLink}>Send Email →</span>
                  </div>
                </a>
              </div>

              {/* Quick Info Box */}
              <div className={styles.infoBox}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📞</span>
                  <div>
                    <p className={styles.infoLabel}>Phone Available</p>
                    <p className={styles.infoValue}>9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>⚡</span>
                  <div>
                    <p className={styles.infoLabel}>Avg Response Time</p>
                    <p className={styles.infoValue}>2-4 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}