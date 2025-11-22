import React from 'react';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>About TecHoneStory</h1>
          <p className={styles.subtitle}>Your Trusted Source for Honest Tech Reviews</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Who We Are</h2>
            <p className={styles.text}>
              TecHoneStory is a technology review and recommendation platform dedicated to helping you make informed
              purchasing decisions. We provide honest, unbiased reviews of the latest tech products, gadgets, and services.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.text}>
              Our mission is to bridge the gap between technology and consumers by providing comprehensive, honest reviews
              that help you choose the right products for your needs. We believe in transparency, integrity, and putting
              our readers first.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.text}>
              We thoroughly test and review various tech products, from smartphones and laptops to smart home devices and
              accessories. Our team of experienced reviewers provides in-depth analysis, pros and cons, and real-world usage
              experiences to help you make the best choice.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Affiliate Disclosure</h2>
            <p className={styles.text}>
              TecHoneStory participates in the Amazon Services LLC Associates Program, an affiliate advertising program
              designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
              When you purchase products through our affiliate links, we may earn a commission at no extra cost to you.
              This helps support our work and allows us to continue providing quality content.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
