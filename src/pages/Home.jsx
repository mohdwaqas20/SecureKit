import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Shield, Users, Zap, Award, TrendingUp, CheckCircle } from 'lucide-react';
import FeaturedProductCarousel from '../components/FeaturedProductCarousel';
import { categories } from '../data/products';
import { generateWhatsAppLink, generateWhatsAppProductMessage } from '../utils/helpers';
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    document.title = 'SecureKit Enterprises | Security Uniforms, Safety Shoes & Security Gear';
  }, []);

  const categoryScrollRef = useRef(null);
  const featuredScrollRef = useRef(null);

  const scrollCategories = (direction) => {
    const track = categoryScrollRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.categoryCard}`);
    const gap = 24;
    const distance = card ? card.offsetWidth + gap : 320;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const scrollFeaturedProducts = (direction) => {
    const track = featuredScrollRef.current;
    if (!track) return;
    const card = track.querySelector('[data-product-slide]');
    const gap = 32;
    const distance = card ? card.offsetWidth + gap : 320;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: <Shield size={32} />,
      title: 'Industry-Specific Expertise',
      description: 'Focused exclusively on the private security industry.',
    },
    {
      icon: <Award size={32} />,
      title: 'Consistent Quality',
      description: 'Designed around reliable materials and controlled manufacturing.',
    },
    {
      icon: <Zap size={32} />,
      title: 'Custom Manufacturing',
      description: 'Products can be adapted to agency requirements.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Bulk Supply',
      description: 'Suitable for large-scale deployment.',
    },
  ];

  const trustPoints = [
    { label: 'Industry Focus', description: 'Specialized in private security requirements.' },
    { label: 'Manufacturer & Supplier', description: 'From production to dispatch under one roof.' },
    { label: 'Custom Requirements', description: 'Branding, colours, sizing and specifications.' },
    { label: 'Bulk Supply', description: 'Built for large-scale security deployments.' },
  ];

  const steps = [
    { number: '01', title: 'Understand', description: 'Understand the agency\'s product and quantity requirements.' },
    { number: '02', title: 'Customize', description: 'Finalize design, colours, branding, sizing and specifications.' },
    { number: '03', title: 'Manufacture', description: 'Production according to approved specifications.' },
    { number: '04', title: 'Inspect', description: 'Quality inspection and consistency checks.' },
    { number: '05', title: 'Package', description: 'Products prepared for dispatch.' },
    { number: '06', title: 'Dispatch', description: 'Orders delivered according to agreed arrangements.' },
  ];

  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.heroEyebrow}>SecureKit Enterprises</span>
              <h1>Security Essentials. <span className={styles.heroAccent}>Built for Professionals.</span></h1>
              <p>
                A specialized manufacturer and B2B supplier of security uniforms, safety footwear, seasonal gear, and essential security accessories for private security agencies across India.
              </p>
              <div className={styles.ctaGroup}>
                <Link to="/products" className={`btn btn-lg ${styles.heroBtnPrimary}`}>
                  Explore Products
                  <ChevronRight size={20} />
                </Link>
                <a
                  href={generateWhatsAppLink('Hello SecureKit Enterprises, I would like to request a quote.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-lg ${styles.heroBtnSecondary}`}
                >
                  Request a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className={styles.trustStrip}>
        <div className="container">
          <div className={styles.trustGrid}>
            {trustPoints.map((point, index) => (
              <div key={index} className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <CheckCircle size={24} />
                </div>
                <h4>{point.label}</h4>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`${styles.about} section`}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutImage}>
              <img
                src={`${import.meta.env.BASE_URL}PRODUCT/Shoes/1.jpeg`}
                alt="Security personnel in professional uniform"
              />
            </div>
            <div className={styles.aboutText}>
              <div className={styles.aboutLabel}>ABOUT SECUREKIT</div>
              <h2>Built Exclusively for the Security Industry.</h2>
              <p>
                SecureKit Enterprises is a specialized manufacturer and B2B supplier of security uniforms, safety footwear, and essential security accessories, dedicated exclusively to serving security agencies and private security organizations across India.
              </p>
              <p>
                Unlike general workforce suppliers, SecureKit focuses specifically on understanding the requirements of the private security industry. We understand that security agencies require products that are durable, comfortable, professional-looking, consistent in quality, and suitable for large-scale deployment.
              </p>
              <p>
                SecureKit works closely with agencies according to design, colour, branding, sizing, quantity, and specific requirements. We handle material selection, manufacturing, quality inspection, customization, packaging, and dispatch.
              </p>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderDark}`}>
            <span className={styles.sectionEyebrow}>What We Supply</span>
            <h2>Complete Security Essentials</h2>
            <p>Everything your security team needs from one specialized manufacturing and supply partner.</p>
          </div>

          <div className={styles.categoriesCarousel}>
            <button
              type="button"
              className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
              onClick={() => scrollCategories(-1)}
              aria-label="Previous categories"
            >
              <ChevronLeft size={22} />
            </button>

            <div className={styles.categoriesGrid} ref={categoryScrollRef}>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products/${category.id.replace('-', '-')}`}
                  className={styles.categoryCard}
                >
                  <div className={styles.categoryImage}>
                    <img src={category.image} alt={category.name} />
                    <span className={styles.categoryNumber}>CATEGORY 0{index + 1}</span>
                  </div>
                  <div className={styles.categoryContent}>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className={styles.categoryProducts}>
                      {category.subcategories.length} product types
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
              onClick={() => scrollCategories(1)}
              aria-label="Next categories"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Using New Carousel */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Best Sellers</span>
            <h2>Featured Products</h2>
            <p>Browse our complete range of security products with easy navigation and detailed options.</p>
          </div>
          
          <FeaturedProductCarousel scrollRef={featuredScrollRef} onScroll={scrollFeaturedProducts} />
        </div>
      </section>

      {/* Why SecureKit */}
      <section className={`${styles.whySecurekit} section`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Security Agencies Choose SecureKit</h2>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>From Requirement to Deployment</h2>
          </div>
          <div className={styles.stepsContainer}>
            <div className={styles.timeline}>
              {steps.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Kit CTA */}
      <section className={styles.customKitCta}>
        <div className="container">
          <div className={styles.customKitContent}>
            <h2>Build Your Custom Security Kit</h2>
            <p>Select uniforms, footwear, and accessories according to your agency's specific requirements.</p>
            <Link to="/custom-kit" className="btn btn-outline-white btn-lg">
              Configure Custom Kit
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={styles.visionSection}>
        <div className="container">
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <h3>Our Vision</h3>
              <p>
                To become one of India's most trusted manufacturing and supply partners exclusively for the private security industry.
              </p>
            </div>
            <div className={`${styles.visionCard} ${styles.missionCard}`}>
              <h3>Our Mission</h3>
              <p>
                To provide security agencies with reliable, durable, professionally designed, and competitively priced products, supported by consistent quality, customization, and dependable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <span className={styles.sectionLabel}>Next Steps</span>
            <h2>Equip Your Security Team With Confidence.</h2>
            
            <div className={styles.ctaButtons}>
              <Link to="/products" className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}>
                Explore Products
                <ChevronRight size={20} />
              </Link>
              <a
                href={generateWhatsAppLink('Hello SecureKit Enterprises, I would like to request a quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-secondary btn-lg ${styles.ctaSecondary}`}
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}