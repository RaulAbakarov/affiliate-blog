import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard, MessageCircle, Instagram } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showLogo, setShowLogo] = useState(false);

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
                  <span>Dashboard</span>
                </Link>
                <button onClick={logout} className={styles.logoutButton}>
                  <LogOut size={18} />
                  <span>Logout</span>
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
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.contactButton}
            >
              <MessageCircle size={18} />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
