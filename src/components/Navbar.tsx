import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LogOut, LayoutDashboard, MessageCircle, Instagram, Globe } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLogo, setShowLogo] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show logo when scrolled past ~200px (approximate height where title would be)
      setShowLogo(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftNav}>
            {isAuthenticated && (
              <>
                <Link to="/admin" className={styles.navLink}>
                  <LayoutDashboard size={18} />
                  <span>{t('nav.admin')}</span>
                </Link>
                <button onClick={logout} className={styles.logoutButton}>
                  <LogOut size={18} />
                  <span>{t('nav.logout')}</span>
                </button>
              </>
            )}
          </div>

          <Link 
            to="/" 
            className={`${styles.centerLogo} ${showLogo ? styles.visible : ''}`}
          >
            <img 
              src="https://1000logos.net/wp-content/uploads/2020/04/Oriflame-Logo-1977.png" 
              alt="Oriflame" 
              className={styles.logoImage}
            />
            <span className={styles.byVusale}>by Vusale</span>
          </Link>

          <div className={styles.rightNav}>
            <div className={styles.languageSwitcher}>
              <button 
                className={styles.langButton}
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                <Globe size={18} />
                <span>{language === 'en' ? 'EN' : language === 'az' ? 'AZ' : 'RU'}</span>
              </button>
              {showLangMenu && (
                <div className={styles.langMenu}>
                  <button 
                    className={`${styles.langOption} ${language === 'en' ? styles.active : ''}`}
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                  >
                    English
                  </button>
                  <button 
                    className={`${styles.langOption} ${language === 'az' ? styles.active : ''}`}
                    onClick={() => { setLanguage('az'); setShowLangMenu(false); }}
                  >
                    Azərbaycan
                  </button>
                  <button 
                    className={`${styles.langOption} ${language === 'ru' ? styles.active : ''}`}
                    onClick={() => { setLanguage('ru'); setShowLangMenu(false); }}
                  >
                    Русский
                  </button>
                </div>
              )}
            </div>
            <a 
              href="https://www.instagram.com/_vusale_oriflame_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://wa.me/994507842470" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.contactButton}
            >
              <MessageCircle size={18} />
              <span>{t('nav.contactUs')}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
