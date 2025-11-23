import React from 'react';
import styles from './Contact.module.css';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>Get in touch with our team</p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            
            <div className={styles.infoItem}>
              <Mail className={styles.icon} size={24} />
              <div>
                <h3 className={styles.itemTitle}>Email</h3>
                <a href="mailto:contact@oriflamebyvusale.com" className={styles.link}>
                  contact@oriflamebyvusale.com
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <MapPin className={styles.icon} size={24} />
              <div>
                <h3 className={styles.itemTitle}>Location</h3>
                <p className={styles.itemText}>Available Online Worldwide</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Phone className={styles.icon} size={24} />
              <div>
                <h3 className={styles.itemTitle}>Support</h3>
                <p className={styles.itemText}>24/7 Email Support</p>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h2 className={styles.descTitle}>We'd Love to Hear From You</h2>
            <p className={styles.descText}>
              Have questions about our reviews? Want to suggest a product for us to review? 
              Or just want to share your feedback? We're always happy to hear from our readers.
            </p>
            <p className={styles.descText}>
              For business inquiries, partnerships, or advertising opportunities, please reach out 
              via email and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
