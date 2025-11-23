import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.brandName}>
              <img 
                src="https://1000logos.net/wp-content/uploads/2020/04/Oriflame-Logo-1977.png" 
                alt="Oriflame" 
                className={styles.footerLogo}
              />
              <span className={styles.footerByVusale}>by Vusale</span>
            </div>
            <p className={styles.brandDescription}>
              {t('footer.brandDescription')}
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>{t('footer.quickLinks')}</h4>
              <Link to="/" className={styles.link}>{t('footer.home')}</Link>
              <Link to="/about" className={styles.link}>{t('footer.about')}</Link>
              <Link to="/contact" className={styles.link}>{t('footer.contact')}</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>{t('footer.legal')}</h4>
              <Link to="/privacy" className={styles.link}>{t('footer.privacy')}</Link>
              <Link to="/terms" className={styles.link}>{t('footer.terms')}</Link>
              <Link to="/disclaimer" className={styles.link}>{t('footer.disclaimer')}</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>{t('footer.followUs')}</h4>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Twitter
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Facebook
              </a>
              <a href="https://www.instagram.com/_vusale_oriflame_/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Oriflame by Vusale. {t('footer.copyright')}
          </p>
          <p className={styles.disclaimer}>
            {t('footer.watermark')}
          </p>
        </div>
      </div>
    </footer>
  );
};
