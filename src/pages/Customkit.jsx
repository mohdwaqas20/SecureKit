import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { generateCustomKitMessage, generateWhatsAppLink } from '../utils/helpers';
import styles from '../styles/Customkit.module.css';

const customKitItems = {
  uniforms: ['Shirt', 'Pants', 'T-Shirt'],
  footwear: ['Leather Safety Shoes', 'Synthetic Leather Shoes', 'Sports Safety Shoes'],
  accessories: ['Belt', 'Cap', 'Tie', 'Lanyard', 'Whistle Holder'],
};

export default function CustomKit() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [customization, setCustomization] = useState({
    agency: '',
    personnel: '',
    branding: '',
    additional: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    document.title = 'Custom Security Kit Builder | SecureKit Enterprises';
  }, []);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCustomizationChange = (e) => {
    const { name, value } = e.target;
    setCustomization({ ...customization, [name]: value });
  };

  const handleSendEnquiry = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one product type');
      return;
    }
    
    const message = generateCustomKitMessage(selectedItems, {}, customization);
    window.open(generateWhatsAppLink(message), '_blank');
  };

  return (
    <main className={styles.customKit}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Build Your Custom <span className={styles.accent}>Security Kit</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Select the essentials your security team needs and send your requirements directly to SecureKit Enterprises.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.content} section`}>
        <div className="container">
          {/* Progress Indicator */}
          <div className={styles.progress}>
            <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>01</div>
              <span>Uniform</span>
            </div>
            <div className={styles.progressLine}></div>
            <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>02</div>
              <span>Footwear</span>
            </div>
            <div className={styles.progressLine}></div>
            <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>03</div>
              <span>Accessories</span>
            </div>
            <div className={styles.progressLine}></div>
            <div className={`${styles.step} ${currentStep >= 4 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>04</div>
              <span>Requirements</span>
            </div>
          </div>

          <div className={styles.builder}>
            {/* Step 1: Uniforms */}
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <h2>Select Uniform Requirements</h2>
                <div className={styles.itemsGrid}>
                  {customKitItems.uniforms.map((item) => (
                    <label key={item} className={`${styles.itemCard} ${selectedItems.includes(item) ? styles.selected : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                      />
                      <div className={styles.itemContent}>
                        <h4>{item}</h4>
                        <p>Professional uniform component</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Footwear */}
            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <h2>Select Safety Footwear</h2>
                <div className={styles.itemsGrid}>
                  {customKitItems.footwear.map((item) => (
                    <label key={item} className={`${styles.itemCard} ${selectedItems.includes(item) ? styles.selected : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                      />
                      <div className={styles.itemContent}>
                        <h4>{item}</h4>
                        <p>Safety footwear option</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Accessories */}
            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <h2>Select Essential Accessories</h2>
                <div className={styles.itemsGrid}>
                  {customKitItems.accessories.map((item) => (
                    <label key={item} className={`${styles.itemCard} ${selectedItems.includes(item) ? styles.selected : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                      />
                      <div className={styles.itemContent}>
                        <h4>{item}</h4>
                        <p>Essential accessory</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Requirements */}
            {currentStep === 4 && (
              <div className={styles.stepContent}>
                <h2>Customization Requirements</h2>
                <div className={styles.formGroup}>
                  <label>Agency / Company Name</label>
                  <input
                    type="text"
                    name="agency"
                    value={customization.agency}
                    onChange={handleCustomizationChange}
                    placeholder="Enter your agency name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Number of Security Personnel</label>
                  <input
                    type="text"
                    name="personnel"
                    value={customization.personnel}
                    onChange={handleCustomizationChange}
                    placeholder="e.g., 50, 100, 500"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Logo / Branding Requirement</label>
                  <select
                    name="branding"
                    value={customization.branding}
                    onChange={handleCustomizationChange}
                  >
                    <option value="">Select an option</option>
                    <option value="Yes, Required - Logo and Branding">Yes, Required - Logo and Branding</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Additional Requirements</label>
                  <textarea
                    name="additional"
                    value={customization.additional}
                    onChange={handleCustomizationChange}
                    placeholder="Any other specific requirements"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className={styles.navigation}>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
              )}
              <div></div>
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="btn btn-primary"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSendEnquiry}
                  className="btn btn-primary btn-lg"
                >
                  Send Custom Kit Enquiry
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {/* Summary */}
            {selectedItems.length > 0 && (
              <div className={styles.summary}>
                <h4>Selected Items ({selectedItems.length})</h4>
                <div className={styles.selectedItems}>
                  {selectedItems.map((item) => (
                    <span key={item} className={styles.selectedItem}>
                      {item}
                      <button onClick={() => toggleItem(item)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}