import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { updateSEOMetadata, removeStructuredData } from '../utils/seoHelpers';
import styles from './About.module.css';

export const About: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    updateSEOMetadata({
      title: `${t('nav.about')} | Oriflame by Vusale`,
      description: 'Learn more about Vusale and her experience with Oriflame premium beauty products. Expert beauty consultant sharing product reviews and beauty tips.',
      keywords: 'about, Oriflame consultant, beauty expert, Vusale, beauty advisor',
      url: '/about',
      type: 'website',
    });
    
    return () => {
      removeStructuredData();
    };
  }, [t]);
  
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('about.title')}</h1>
          <p className={styles.subtitle}>{t('about.intro')}</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('about.mission')}</h2>
            <p className={styles.text}>{t('about.missionText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('about.why')}</h2>
            <p className={styles.text}>{t('about.whyText')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('about.services')}</h2>
            <ul className={styles.servicesList}>
              <li>{t('about.consultation')}</li>
              <li>{t('about.recommendations')}</li>
              <li>{t('about.tips')}</li>
              <li>{t('about.support')}</li>
            </ul>
          </section>

          <section className={styles.section}>
            <p className={styles.cta}>{t('about.cta')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
