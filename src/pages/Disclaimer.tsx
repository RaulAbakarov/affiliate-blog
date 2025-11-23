import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Privacy.module.css';

export const Disclaimer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('disclaimer.title')}</h1>
          <p className={styles.date}>{t('disclaimer.lastUpdated')}: November 22, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <p className={styles.text}>
              {t('disclaimer.intro')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('disclaimer.affiliate')}</h2>
            <p className={styles.text}>
              {t('disclaimer.affiliateText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('disclaimer.results')}</h2>
            <p className={styles.text}>
              {t('disclaimer.resultsText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('disclaimer.medical')}</h2>
            <p className={styles.text}>
              {t('disclaimer.medicalText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('disclaimer.products')}</h2>
            <p className={styles.text}>
              {t('disclaimer.productsText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('disclaimer.external')}</h2>
            <p className={styles.text}>
              {t('disclaimer.externalText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('disclaimer.liability')}</h2>
            <p className={styles.text}>
              {t('disclaimer.liabilityText')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
