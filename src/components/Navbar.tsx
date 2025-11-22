import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';
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
            TecHoneStory
          </Link>

          <div className={styles.rightNav}></div>
        </div>
      </div>
    </nav>
  );
};
