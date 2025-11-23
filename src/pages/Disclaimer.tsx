import React from 'react';
import styles from './Privacy.module.css';

export const Disclaimer: React.FC = () => {
  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Disclaimer</h1>
          <p className={styles.date}>Last Updated: November 22, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. General Disclaimer</h2>
            <p className={styles.text}>
              The information provided by Oriflame by Vusale is for general informational purposes only. All information 
              on the site is provided in good faith, however we make no representation or warranty of any kind, 
              express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or 
              completeness of any information on the site.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Product Information</h2>
            <p className={styles.text}>
              Our product descriptions and recommendations represent genuine Oriflame products and honest opinions based on 
              our experience. Individual results may vary depending on skin type, age, and other factors. We recommend consulting
              with Vusale for personalized product recommendations tailored to your specific needs.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Affiliate Disclaimer</h2>
            <p className={styles.text}>
              Oriflame by Vusale is an independent Oriflame consultant providing authentic product recommendations and beauty consultations.
              We connect customers directly with genuine Oriflame products and may earn commissions from sales.
            </p>
            <p className={styles.text}>
              All products featured are authentic Oriflame cosmetics backed by Swedish quality standards. Prices and availability
              are subject to change. We provide personalized consultations to help you find the perfect products for your needs.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. External Links</h2>
            <p className={styles.text}>
              Our website may contain links to external websites that are not provided or maintained by us. We do 
              not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external 
              websites.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Product Prices and Availability</h2>
            <p className={styles.text}>
              Prices and availability of products mentioned on our site are subject to change without notice. 
              We strive to provide accurate pricing information, but errors may occur. Please verify prices and 
              availability directly with the seller before making a purchase.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Professional Advice</h2>
            <p className={styles.text}>
              The beauty and wellness information on Oriflame by Vusale is not intended to replace professional dermatological
              or medical advice. If you have specific skin conditions, allergies, or health concerns, please consult with
              qualified healthcare professionals before using any cosmetic products.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p className={styles.text}>
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred 
              as a result of the use of the site or reliance on any information provided on the site. Your use of 
              the site and your reliance on any information on the site is solely at your own risk.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Changes to Disclaimer</h2>
            <p className={styles.text}>
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately 
              upon posting to the website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Contact Us</h2>
            <p className={styles.text}>
              If you have any questions about this Disclaimer, please contact us at contact@oriflamebyvusale.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
