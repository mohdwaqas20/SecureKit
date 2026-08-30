import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Zap, Gauge, Target, Award, Users } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/helpers';
import styles from '../styles/About.module.css';

export default function About() {
  useEffect(() => {
    document.title = 'About SecureKit Enterprises | Security Uniforms Manufacturer';
  }, []);

  return (
    <main className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span>SecureKit Enterprises</span>
            </div>
            <h1 className={styles.heroTitle}>
              Trusted Security <span className={styles.accent}>Solutions</span> for India
            </h1>
            <p className={styles.heroSubtitle}>
              Specialized manufacturing and B2B supply of premium security uniforms, safety footwear, and professional equipment exclusively for the private security industry.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <video
                  src={`${import.meta.env.BASE_URL}video.MP4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="SecureKit manufacturing facility"
                />
              </div>
            </div>
            <div className={styles.storyContent}>
              <div className={styles.sectionLabel}>Our Heritage</div>
              <h2>Dedicated to Security Excellence</h2>
              <p>
                SecureKit Enterprises stands as a specialized manufacturer and B2B supplier dedicated exclusively to the private security industry. Our journey is defined by unwavering commitment to quality, reliability, and deep industry expertise.
              </p>
              <p>
                Unlike general workforce suppliers, we focus specifically on understanding the unique requirements of security agencies. We recognize that security personnel demand products that are durable, comfortable, professional-looking, and suitable for large-scale deployment—and we deliver exactly that.
              </p>
              <p>
                Our combined expertise in the security industry and advanced manufacturing capabilities enable us to provide specialized solutions that meet the precise needs of security agencies, whether equipping 50 guards or 5,000 personnel.
              </p>
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>100%</div>
                  <div className={styles.statLabel}>Industry Focused</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>5K+</div>
                  <div className={styles.statLabel}>Security Personnel Equipped</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Dedicated Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className={styles.expertiseSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>What We Offer</div>
            <h2>Areas of Expertise</h2>
            <p>Comprehensive solutions tailored for the private security industry</p>
          </div>
          
          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseCard}>
              <div className={styles.cardIcon}>
                <Shield size={32} />
              </div>
              <h3>Security Uniforms</h3>
              <p>Professional uniforms designed for security personnel, including shirts, pants, and specialized t-shirts that project authority and professionalism.</p>
            </div>

            <div className={styles.expertiseCard}>
              <div className={styles.cardIcon}>
                <Zap size={32} />
              </div>
              <h3>Safety Footwear</h3>
              <p>Specialized safety shoes with protective features engineered for demanding security operations and long-hour deployments.</p>
            </div>

            <div className={styles.expertiseCard}>
              <div className={styles.cardIcon}>
                <Target size={32} />
              </div>
              <h3>Seasonal Gear</h3>
              <p>Weather-appropriate equipment including raincoats, sweaters, and hoodies for year-round security operations across all climates.</p>
            </div>

            <div className={styles.expertiseCard}>
              <div className={styles.cardIcon}>
                <Award size={32} />
              </div>
              <h3>Essential Accessories</h3>
              <p>Complete range of professional accessories including belts, caps, ties, ID lanyards, and tactical gear to complete any uniform.</p>
            </div>

            <div className={styles.expertiseCard}>
              <div className={styles.cardIcon}>
                <Gauge size={32} />
              </div>
              <h3>Custom Manufacturing</h3>
              <p>Personalized solutions with custom branding, colors, sizing, and specifications tailored to your agency's exact requirements.</p>
            </div>

            <div className={styles.expertiseCard}>
              <div className={styles.cardIcon}>
                <Users size={32} />
              </div>
              <h3>Bulk Supply</h3>
              <p>Full capacity to supply large-scale security deployments with consistent quality, reliability, and timely delivery at scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>How We Work</div>
            <h2>Our Manufacturing Process</h2>
            <p>Streamlined excellence from concept to delivery</p>
          </div>

          <div className={styles.processTimeline}>
            {[
              { number: '01', title: 'Understanding', description: 'We understand your agency\'s specific product, quantity, and requirement needs.' },
              { number: '02', title: 'Customization', description: 'Design, colors, branding, sizing, and specifications are finalized together.' },
              { number: '03', title: 'Production', description: 'Manufacturing begins according to the approved specifications and timeline.' },
              { number: '04', title: 'Inspection', description: 'Quality inspection and consistency checks ensure every product meets standards.' },
              { number: '05', title: 'Packaging', description: 'Products are carefully packaged and prepared for dispatch.' },
              { number: '06', title: 'Delivery', description: 'Orders are delivered according to agreed arrangements and schedules.' }
            ].map((step, index) => (
              <div key={index} className={styles.timelineStep}>
                <div className={styles.stepCircle}>{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                {index < 5 && <div className={styles.stepConnector}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Our Foundation</div>
            <h2>Core Values</h2>
            <p>Principles that guide every decision and action</p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🛡️</div>
              <h3>Reliability</h3>
              <p>Consistent quality and dependable service across every interaction and delivery, building trust through proven performance.</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💪</div>
              <h3>Durability</h3>
              <p>Products engineered and built to withstand the demanding conditions of professional security operations and rigorous use.</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3>Focus</h3>
              <p>Specialized expertise and exclusive dedication to the private security industry, not divided across other markets.</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>⚙️</div>
              <h3>Excellence</h3>
              <p>Commitment to manufacturing excellence, continuous improvement, and exceeding expectations in every product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className={styles.whyChooseSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>Why SecureKit</div>
            <h2>Your Trusted Partner</h2>
            <p>Six compelling reasons to choose SecureKit for your security needs</p>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>01</div>
              <h4>Specialized Knowledge</h4>
              <p>Deep understanding of security industry requirements, challenges, and the unique demands of security personnel.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>02</div>
              <h4>Manufacturing Capacity</h4>
              <p>Full control over production from material selection to quality assurance and delivery of finished products.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>03</div>
              <h4>Custom Solutions</h4>
              <p>Flexible customization for colors, branding, sizing, and specifications tailored to your agency's identity.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>04</div>
              <h4>Quality Assurance</h4>
              <p>Rigorous quality checks throughout the manufacturing process ensuring every product meets our high standards.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>05</div>
              <h4>Bulk Capacity</h4>
              <p>Equipped to handle large-scale security agency deployments efficiently without compromising on quality.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyNumber}>06</div>
              <h4>Professional Support</h4>
              <p>Dedicated team to guide you through selection, customization, quality assurance, and reliable delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className={styles.visionMissionSection}>
        <div className="container">
          <div className={styles.vmGrid}>
            <div className={styles.vmCard} style={{background: 'linear-gradient(135deg, #0F3D61 0%, #082847 100%)'}}>
              <div className={styles.vmLabel}>Our Vision</div>
              <h3>Become India's Most Trusted Security Manufacturing Partner</h3>
              <p>To establish SecureKit Enterprises as the premier choice for security industry manufacturers and suppliers, recognized across India for innovation, quality, and unwavering dedication to the private security sector.</p>
            </div>

            <div className={styles.vmCard} style={{borderLeft: '4px solid #d4af37'}}>
              <div className={styles.vmLabel} style={{color: '#d4af37'}}>Our Mission</div>
              <h3>Empower Security Agencies With Excellence</h3>
              <p>To provide security agencies with reliable, durable, professionally designed, and competitively priced products, supported by consistent quality, personalized customization, and dependable service at every stage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <div className={styles.sectionLabel}>Next Steps</div>
            <h2>Ready to Partner With SecureKit?</h2>
            <p>Let's discuss your security team's uniform and equipment requirements and find the perfect solution.</p>
            
            <div className={styles.ctaButtons}>
              <Link to="/products" className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}>
                Explore Products
                <ChevronRight size={20} />
              </Link>
              <a
                href={generateWhatsAppLink('Hello SecureKit Enterprises, I would like to discuss our uniform and equipment requirements.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-secondary btn-lg ${styles.ctaSecondary}`}
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}