import React from 'react';
import styles from './Privacy.module.css';

export const Terms: React.FC = () => {
  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.date}>Last Updated: November 22, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p className={styles.text}>
              By accessing and using Oriflame by Vusale, you accept and agree to be bound by the terms and provisions 
              of this agreement. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Use License</h2>
            <p className={styles.text}>
              Permission is granted to temporarily access the materials on Oriflame by Vusale for personal, 
              non-commercial use only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. User Conduct</h2>
            <p className={styles.text}>
              You agree not to:
            </p>
            <ul className={styles.list}>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Reproduce, duplicate, or copy material from the website without permission</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Content Accuracy</h2>
            <p className={styles.text}>
              We strive to provide accurate and up-to-date information. However, we make no warranties about 
              the completeness, reliability, or accuracy of the information on our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Affiliate Links</h2>
            <p className={styles.text}>
              Oriflame by Vusale connects customers with authentic Oriflame products. We may earn commissions from sales made 
              through links on our website. This does not affect the price you pay.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Intellectual Property</h2>
            <p className={styles.text}>
              All content on Oriflame by Vusale, including text, graphics, logos, and images, is the property of
              Oriflame by Vusale and protected by copyright laws.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p className={styles.text}>
              Oriflame by Vusale shall not be liable for any damages arising out of or in connection with the use 
              or inability to use our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Changes to Terms</h2>
            <p className={styles.text}>
              We reserve the right to modify these terms at any time. Continued use of the website after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Contact Information</h2>
            <p className={styles.text}>
              For questions about these Terms of Service, please contact us at contact@oriflamebyvusale.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
