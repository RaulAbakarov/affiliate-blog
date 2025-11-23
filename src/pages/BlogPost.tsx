import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../utils/blogService';
import type { Blog } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User, Tag, ExternalLink, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import styles from './BlogPost.module.css';

const LANGUAGE_TAGS = ['lang:en', 'lang:az', 'lang:ru'];

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      if (slug) {
        try {
          const foundBlog = await blogService.getBlogBySlug(slug);
          setBlog(foundBlog || null);
        } catch (error) {
          console.error('Error loading blog:', error);
          setBlog(null);
        } finally {
          setLoading(false);
        }
      }
    };
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h2 className={styles.notFoundTitle}>Blog post not found</h2>
          <button
            onClick={() => navigate('/')}
            className={styles.notFoundButton}
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogPost}>
      <div className={styles.container}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          <span>{t('blog.backToBlog')}</span>
        </button>

        {/* Featured Image */}
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className={styles.featuredImage}
        />

        {/* Blog Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{blog.title}</h1>
          
          <div className={styles.metaContainer}>
            <div className={styles.metaItem}>
              <User size={18} />
              <span>{blog.author}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={18} />
              <span>{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</span>
            </div>
          </div>

          {blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag)).length > 0 && (
            <div className={styles.tagsContainer}>
              <Tag size={18} />
              <div className={styles.tags}>
                {blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag)).map((tag, index) => (
                  <span
                    key={index}
                    className={styles.tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Blog Content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Products Section */}
        {blog.amazonProducts.length > 0 && (
          <div className={styles.productsSection}>
            <h2 className={styles.productsTitle}>
              {t('blog.products')}
            </h2>
            <div className={styles.productsGrid}>
              {blog.amazonProducts.map((product) => {
                // Create WhatsApp message based on language
                let whatsappMessage = '';
                if (language === 'az') {
                  whatsappMessage = `Salam, *${product.title}*${product.price ? ` (${product.price})` : ''} haqqında ətraflı məlumat almaq istəyirəm. Əlavə təfərrüatlar verə bilərsinizmi?`;
                } else if (language === 'ru') {
                  whatsappMessage = `Здравствуйте, я хотел бы узнать больше о *${product.title}*${product.price ? ` (${product.price})` : ''}. Можете предоставить более подробную информацию?`;
                } else {
                  whatsappMessage = `Hi, I'm interested in learning more about *${product.title}*${product.price ? ` (${product.price})` : ''}. Can you provide more details?`;
                }
                const whatsappLink = `https://wa.me/${product.whatsappNumber || ''}?text=${encodeURIComponent(whatsappMessage)}`;
                
                return (
                  <div
                    key={product.id}
                    className={styles.productCard}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className={styles.productImage}
                    />
                    <h3 className={styles.productTitle}>
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className={styles.productDescription}>{product.description}</p>
                    )}
                    {product.price && (
                      <p className={styles.productPrice}>
                        {product.price}
                      </p>
                    )}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.amazonButton}
                    >
                      <span>{t('blog.messageForInfo')}</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
