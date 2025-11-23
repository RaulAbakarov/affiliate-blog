import React from 'react';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About Oriflame by Vusale</h1>
          <p className={styles.subtitle}>Your Trusted Source for Premium Swedish Beauty</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Who We Are</h2>
            <p className={styles.text}>
              Oriflame by Vusale is your dedicated independent consultant for premium Swedish cosmetics and natural beauty products.
              We provide authentic Oriflame products, personalized beauty consultations, and honest reviews to help you discover
              the perfect products for your skin and wellness needs.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>
              Our mission is to help you discover the transformative power of natural Swedish cosmetics. We provide personalized
              consultations, genuine product recommendations, and beauty tips that enhance your natural radiance. We believe in
              transparency, quality, and empowering you to look and feel your best.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.text}>
              We offer authentic Oriflame products including skincare, makeup, fragrances, wellness supplements, and personal care items.
              As your independent consultant, Vusale provides personalized recommendations, beauty tips, and ongoing support to help you
              achieve your beauty and wellness goals. Every product is backed by Swedish quality and natural ingredients.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Choose Oriflame?</h2>
            <p className={styles.text}>
              Oriflame by Vusale is your independent consultant for premium Swedish cosmetics with over 50 years of heritage.
              We offer authentic natural beauty products, personalized consultations, and direct delivery to your door.
              Every product is crafted with care, tested for quality, and designed to enhance your natural beauty.
              Contact us via WhatsApp for personalized recommendations and exclusive offers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
