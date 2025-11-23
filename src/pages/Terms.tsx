import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Privacy.module.css';

export const Terms: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className={styles.policyPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('terms.title')}</h1>
          <p className={styles.date}>{t('terms.lastUpdated')}: November 22, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <p className={styles.text}>
              {t('terms.intro')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('terms.use')}</h2>
            <p className={styles.text}>
              {t('terms.useText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('terms.content')}</h2>
            <p className={styles.text}>
              {t('terms.contentText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('terms.products')}</h2>
            <p className={styles.text}>
              {t('terms.productsText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('terms.consultations')}</h2>
            <p className={styles.text}>
              {t('terms.consultationsText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('terms.liability')}</h2>
            <p className={styles.text}>
              {t('terms.liabilityText')}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('terms.changes')}</h2>
            <p className={styles.text}>
              {t('terms.changesText')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
