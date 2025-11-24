import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { updateSEOMetadata, removeStructuredData } from '../utils/seoHelpers';
import styles from './Contact.module.css';
import { Mail, MessageCircle, Instagram } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    updateSEOMetadata({
      title: `${t('nav.contact')} | Oriflame by Vusale`,
      description: 'Contact Vusale for Oriflame beauty product consultations, orders, and beauty advice. Reach out via WhatsApp, Instagram, or email.',
      keywords: 'contact, Oriflame consultant, beauty consultation, order products, WhatsApp, Instagram',
      url: '/contact',
      type: 'website',
    });
    
    return () => {
      removeStructuredData();
    };
  }, [t]);
  
  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('contact.title')}</h1>
          <p className={styles.subtitle}>{t('contact.intro')}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.infoTitle}>{t('contact.getInTouch')}</h2>
            
            <div className={styles.infoItem}>
              <MessageCircle className={styles.icon} size={24} />
              <div>
                <h3 className={styles.itemTitle}>{t('contact.whatsapp')}</h3>
                <a href="https://wa.me/994507842470" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  +994 50 784 24 70
                </a>
                <p className={styles.itemText}>{t('contact.whatsappDesc')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Mail className={styles.icon} size={24} />
              <div>
                <h3 className={styles.itemTitle}>{t('contact.email')}</h3>
                <a href="mailto:contact@oriflamebyvusale.com" className={styles.link}>
                  contact@oriflamebyvusale.com
                </a>
                <p className={styles.itemText}>{t('contact.emailDesc')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Instagram className={styles.icon} size={24} />
              <div>
                <h3 className={styles.itemTitle}>{t('contact.followMe')}</h3>
                <a href="https://www.instagram.com/_vusale_oriflame_/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  @_vusale_oriflame_
                </a>
                <p className={styles.itemText}>{t('contact.socialDesc')}</p>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h2 className={styles.descTitle}>{t('contact.hours')}</h2>
            <p className={styles.descText}>{t('contact.hoursDesc')}</p>
            <p className={styles.descText}>{t('contact.sunday')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
