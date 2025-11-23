import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Privacy.module.css';

export const Privacy: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('privacy.title')}</h1>
          <p className={styles.date}>{t('privacy.lastUpdated')}: November 22, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <p className={styles.text}>
              {t('privacy.intro')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('privacy.collection')}</h2>
            <p className={styles.text}>
              {t('privacy.collectionText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('privacy.usage')}</h2>
            <p className={styles.text}>
              {t('privacy.usageText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('privacy.cookies')}</h2>
            <p className={styles.text}>
              {t('privacy.cookiesText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('privacy.security')}</h2>
            <p className={styles.text}>
              {t('privacy.securityText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('privacy.contact')}</h2>
            <p className={styles.text}>
              {t('privacy.contactText')} contact@oriflamebyvusale.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
