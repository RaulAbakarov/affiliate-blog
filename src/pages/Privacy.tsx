import React from 'react';
import styles from './Privacy.module.css';

export const Privacy: React.FC = () => {
  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.date}>Last Updated: November 22, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.text}>
              Welcome to Oriflame by Vusale. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
            <p className={styles.text}>
              We may collect the following types of information:
            </p>
            <ul className={styles.list}>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Device information (browser type, IP address, operating system)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
            <p className={styles.text}>
              We use the collected information to:
            </p>
            <ul className={styles.list}>
              <li>Improve our website and user experience</li>
              <li>Analyze website traffic and trends</li>
              <li>Provide relevant content and recommendations</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Cookies</h2>
            <p className={styles.text}>
              We use cookies to enhance your browsing experience. You can choose to disable cookies through your 
              browser settings, but this may affect your ability to use certain features of our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
            <p className={styles.text}>
              We use third-party services such as Amazon Associates for affiliate marketing. These services may 
              collect information about your visits to our website and other websites to provide relevant advertisements.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Data Security</h2>
            <p className={styles.text}>
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, or disclosure.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Your Rights</h2>
            <p className={styles.text}>
              You have the right to access, correct, or delete your personal information. Contact us at 
              contact@oriflamebyvusale.com for any privacy-related requests.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Changes to This Policy</h2>
            <p className={styles.text}>
              We may update this privacy policy from time to time. We will notify you of any changes by posting 
              the new policy on this page with an updated date.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Contact Us</h2>
            <p className={styles.text}>
              If you have any questions about this Privacy Policy, please contact us at contact@oriflamebyvusale.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
