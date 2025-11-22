import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>TecHoneStory</h3>
            <p className={styles.brandDescription}>
              Your trusted source for honest tech reviews and recommendations
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Quick Links</h4>
              <Link to="/" className={styles.link}>Home</Link>
              <Link to="/about" className={styles.link}>About Us</Link>
              <Link to="/contact" className={styles.link}>Contact</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Legal</h4>
              <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link to="/terms" className={styles.link}>Terms of Service</Link>
              <Link to="/disclaimer" className={styles.link}>Disclaimer</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Follow Us</h4>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} TecHoneStory. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
};
