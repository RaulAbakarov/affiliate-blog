import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../utils/blogService';
import type { Blog } from '../types';
import { Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import styles from './HomePage.module.css';

const POSTS_PER_PAGE = 9;

export const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const publishedBlogs = await blogService.getPublishedBlogs();
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Oriflame by Vusale</h1>
          <p className={styles.heroSubtitle}>
            Premium Swedish Cosmetics & Natural Beauty Solutions
          </p>
        </div>
      </div>

      <div className={styles.blogGrid}>
        {blogs.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No blog posts available yet.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {currentBlogs.map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.slug}`} className={styles.blogCard}>
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className={styles.blogImage}
                  />
                  <div className={styles.blogContent}>
                    <h2 className={styles.blogTitle}>{blog.title}</h2>
                    <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                    
                    <div className={styles.blogMeta}>
                      <div className={styles.metaItem}>
                        <Calendar size={16} />
                        <span>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                      {blog.tags.length > 0 && (
                        <div className={styles.metaItem}>
                          <Tag size={16} />
                          <span>{blog.tags[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                <div className={styles.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${styles.pageNumber} ${
                        currentPage === page ? styles.active : ''
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
