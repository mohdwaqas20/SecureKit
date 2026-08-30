import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react';
import styles from '../styles/Terms.module.css';
import { PHONE_NUMBER, EMAIL, WHATSAPP_NUMBER } from '../utils/helpers';

export default function Terms() {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    document.title = 'Terms & Conditions | SecureKit Enterprises';
  }, []);

  const sections = [
    {
      id: 'business',
      title: 'About Our Business',
      content: [
        'SecureKit Enterprises is a manufacturer and B2B supplier specializing in security uniforms, safety footwear, and security-related accessories.',
        'Our services and products are primarily focused on private security agencies and organizations operating within the security services industry.'
      ]
    },
    {
      id: 'product-info',
      title: 'Product Information',
      content: [
        'We make reasonable efforts to ensure that product descriptions, photographs, specifications, colours, sizes, and other information displayed on our website are accurate.',
        'However, slight variations in colour, appearance, texture, or finish may occur due to photography, display settings, material batches, or manufacturing processes.',
        'Product specifications may be updated or improved from time to time without prior notice.'
      ]
    },
    {
      id: 'enquiries',
      title: 'Product Enquiries & Quotations',
      content: [
        'Website product listings are primarily provided for information and enquiry purposes.',
        'Prices, minimum order quantities, customization requirements, taxes, freight, and delivery timelines may vary depending on the product and order quantity.',
        'A quotation provided by SecureKit will contain the applicable commercial terms and will remain valid for the period specified in that quotation.',
        'An order will be considered confirmed only after SecureKit has accepted the order and the agreed commercial terms have been finalized.'
      ]
    },
    {
      id: 'moq',
      title: 'Minimum Order Quantity',
      content: [
        'Certain products may be subject to minimum order quantities (MOQ), particularly customized and bulk orders.',
        'The applicable MOQ will be communicated to the customer before order confirmation.'
      ]
    },
    {
      id: 'customization',
      title: 'Customized Products',
      content: [
        'SecureKit provides customization options for eligible products, including uniforms, branding, colours, designs, logos, and other specifications as mutually agreed.',
        'The customer is responsible for reviewing and approving all specifications before production, including product design, colours, sizes, measurements, logos and branding, artwork, quantity, and other customized specifications.',
        'Once production of a customized order has commenced, cancellation or modification may not be possible.',
        'Customized products may not be eligible for return or cancellation unless the issue is caused by a manufacturing defect or an error attributable to SecureKit.'
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing & Payment',
      content: [
        'All prices will be communicated through the applicable quotation or order confirmation.',
        'Applicable GST, taxes, transportation, freight, packaging, or other charges will be communicated as applicable.',
        'Payment terms, including advance payment, balance payment, credit terms, or other arrangements, will be mutually agreed upon before order confirmation.',
        'SecureKit reserves the right to commence production or dispatch only after receiving the agreed payment or advance.'
      ]
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing & Production',
      content: [
        'Production timelines will depend on the product, quantity, customization requirements, availability of materials, and other factors.',
        'The estimated production or delivery timeline will be communicated during order confirmation.',
        'SecureKit will make reasonable efforts to meet the agreed timeline; however, delays caused by circumstances beyond our reasonable control may affect production or delivery schedules.'
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery & Transportation',
      content: [
        'Delivery arrangements, transportation charges, and responsibility for freight will be agreed upon at the time of order confirmation.',
        'Estimated delivery dates are subject to production schedules, transportation availability, and other external circumstances.',
        'Customers are requested to provide accurate delivery information and ensure that someone is available to receive the shipment.'
      ]
    },
    {
      id: 'quality',
      title: 'Quality Inspection',
      content: [
        'SecureKit is committed to maintaining consistent quality throughout the manufacturing process.',
        'Customers should inspect the products after receiving the shipment and notify SecureKit promptly regarding any genuine manufacturing defect, shortage, or discrepancy.',
        'Any quality-related claim should include relevant details and, where appropriate, photographs or other supporting evidence.'
      ]
    },
    {
      id: 'returns',
      title: 'Returns & Replacement',
      content: [
        'Returns or replacements will be considered on a case-by-case basis according to the agreed order terms.',
        'Customized, personalized, branded, or specially manufactured products may not be eligible for return or cancellation unless the product has a manufacturing defect or the issue resulted from an error by SecureKit.',
        'Products damaged due to improper handling, storage, washing, usage, or alteration after delivery may not qualify for replacement.'
      ]
    },
    {
      id: 'ip-materials',
      title: 'Customer-Provided Designs & Materials',
      content: [
        'If a customer provides logos, artwork, designs, trademarks, measurements, or other materials for customization, the customer is responsible for ensuring that they have the necessary rights and permissions to use such materials.',
        'The customer agrees that SecureKit will not be held responsible for disputes arising from unauthorized use of customer-provided intellectual property.'
      ]
    },
    {
      id: 'ip-rights',
      title: 'Intellectual Property',
      content: [
        'All content appearing on the SecureKit website, including photographs, product images, text, graphics, logos, designs, branding, and other materials, belongs to SecureKit Enterprises or its respective owners unless otherwise stated.',
        'No website content may be copied, reproduced, modified, distributed, or commercially used without prior written permission.'
      ]
    },
    {
      id: 'website-usage',
      title: 'Website Usage',
      content: [
        'Users agree not to misuse the website, attempt unauthorized access, introduce malicious software, or use the website for unlawful purposes.',
        'SecureKit reserves the right to restrict or terminate access to the website where necessary.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy',
      content: [
        'Information submitted by customers through enquiry forms, contact forms, WhatsApp, email, or other communication channels may be used for responding to enquiries, preparing quotations, processing orders, providing customer service, and fulfilling business requirements.',
        'Personal information will be handled in accordance with SecureKit\'s applicable privacy practices.'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: [
        'SecureKit will make reasonable efforts to provide products and services according to agreed specifications.',
        'However, SecureKit shall not be responsible for indirect, incidental, or consequential losses arising from circumstances beyond its reasonable control, subject to applicable laws.'
      ]
    },
    {
      id: 'force-majeure',
      title: 'Force Majeure',
      content: [
        'SecureKit shall not be held responsible for delays or failure to perform obligations caused by circumstances beyond reasonable control, including natural disasters, fire, flood, transportation disruptions, government restrictions, strikes, shortages of raw materials, supplier-related disruptions, or other unforeseen circumstances.'
      ]
    },
    {
      id: 'changes',
      title: 'Changes to Terms & Conditions',
      content: [
        'SecureKit Enterprises reserves the right to update or modify these Terms & Conditions from time to time.',
        'The updated version published on this website will supersede previous versions.'
      ]
    },
    {
      id: 'jurisdiction',
      title: 'Governing Law & Jurisdiction',
      content: [
        'These Terms & Conditions shall be governed by the applicable laws of India.',
        'Any disputes arising in connection with these Terms & Conditions or transactions with SecureKit Enterprises shall be subject to the jurisdiction agreed upon in the applicable commercial agreement or order documentation.'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      isContact: true
    }
  ];

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setActiveSection(activeSection === id ? null : id);
  };

  const handleScrollToSection = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className={styles.terms}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span>Legal Information</span>
            </div>
            <h1 className={styles.heroTitle}>
              Terms & <span className={styles.accent}>Conditions</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Please read our terms and conditions carefully. By using SecureKit Enterprises website or services, you acknowledge that you have read, understood, and agreed to these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={`${styles.content} section`}>
        <div className="container">
          <div className={styles.contentWrapper}>
            {/* Table of Contents Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.tocCard}>
                <h3 className={styles.tocTitle}>Table of Contents</h3>
                <nav className={styles.tocList}>
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      className={`${styles.tocLink} ${activeSection === section.id ? styles.active : ''}`}
                      onClick={() => {
                        handleScrollToSection(section.id);
                        setActiveSection(section.id);
                      }}
                    >
                      <span className={styles.tocNumber}>{index + 1}.</span>
                      <span>{section.title}</span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainContent}>
              {/* Effective Date */}
              <div className={styles.effectiveDateBox}>
                <span className={styles.effectiveDate}>📅 Effective Date: January 2026</span>
              </div>

              {/* Welcome Message */}
              <div className={styles.welcomeBox}>
                <div className={styles.welcomeIcon}>✓</div>
                <div>
                  <h2>Welcome to SecureKit Enterprises</h2>
                  <p>By accessing our website, submitting an enquiry, or placing an order with us, you acknowledge that you have read, understood, and agreed to the following Terms & Conditions.</p>
                </div>
              </div>

              {/* Terms Sections */}
              <div className={styles.sectionsContainer}>
                {sections.map((section, index) => (
                  <div 
                    key={section.id} 
                    id={`section-${section.id}`}
                    className={`${styles.section} ${expandedSections[section.id] ? styles.expanded : ''}`}
                  >
                    <button
                      className={styles.sectionHeaderBtn}
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={expandedSections[section.id]}
                    >
                      <div className={styles.sectionHeaderContent}>
                        <span className={styles.sectionNumber}>{index + 1}</span>
                        <h3>{section.title}</h3>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={styles.chevron}
                      />
                    </button>
                    
                    {expandedSections[section.id] && (
                      <div className={styles.sectionContent}>
                        {section.isContact ? (
                          <div className={styles.contactSection}>
                            <div className={styles.contactGrid}>
                              <div className={styles.contactCard}>
                                <Mail size={24} />
                                <div>
                                  <h4>Email</h4>
                                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                                </div>
                              </div>
                              <div className={styles.contactCard}>
                                <Phone size={24} />
                                <div>
                                  <h4>Phone</h4>
                                  <a href={`tel:+91${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                                </div>
                              </div>
                              <div className={styles.contactCard}>
                                <MessageCircle size={24} />
                                <div>
                                  <h4>WhatsApp</h4>
                                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Message Now</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {section.content.map((para, i) => (
                              <p key={i} className={styles.paragraph}>{para}</p>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Important Note */}
              <div className={styles.importantNote}>
                <div className={styles.noteIcon}>⚠️</div>
                <div>
                  <strong>Important Note:</strong> Product-specific commercial terms, quotations, purchase orders, invoices, and written agreements may contain additional terms applicable to a particular transaction.
                </div>
              </div>

              {/* Last Updated */}
              <div className={styles.lastUpdated}>
                Last Updated: January 2024 | Version 1.0
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}