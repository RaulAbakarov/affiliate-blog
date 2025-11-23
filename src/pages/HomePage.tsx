import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../utils/blogService';
import type { Blog } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import styles from './HomePage.module.css';

const POSTS_PER_PAGE = 9;
const LANGUAGE_TAGS = ['lang:en', 'lang:az'];

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [selectedTag, setSelectedTag] = useState<string>('all');

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

  // Filter blogs by current language
  const languageTag = `lang:${language}`;
  const languageFilteredBlogs = blogs.filter(blog => 
    blog.tags.includes(languageTag)
  );

  // Get all unique tags excluding language tags
  const allTags = Array.from(
    new Set(
      languageFilteredBlogs.flatMap(blog => 
        blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag))
      )
    )
  ).sort();

  // Filter blogs based on search query and selected tag
  const filteredBlogs = languageFilteredBlogs.filter(blog => {
    const query = searchQuery.toLowerCase();
    const nonLangTags = blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag));
    const matchesSearch = (
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      nonLangTags.some(tag => tag.toLowerCase().includes(query))
    );
    const matchesTag = selectedTag === 'all' || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Sort filtered blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentBlogs = sortedBlogs.slice(startIndex, endIndex);

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

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, selectedTag, language]);

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
          <div className={styles.heroTitle}>
            <img 
              src="https://1000logos.net/wp-content/uploads/2020/04/Oriflame-Logo-1977.png" 
              alt="Oriflame" 
              className={styles.heroLogo}
            />
            <span className={styles.heroByVusale}>by Vusale</span>
          </div>
          <p className={styles.heroSubtitle}>
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      <div className={styles.blogGrid}>
        {/* Search and Sort Controls */}
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.sortContainer}>
            <label htmlFor="tag" className={styles.sortLabel}>{t('search.filterByTag')}:</label>
            <select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="all">{t('search.allTags')}</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className={styles.sortContainer}>
            <label htmlFor="sort" className={styles.sortLabel}>{t('search.sortBy')}:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
              className={styles.sortSelect}
            >
              <option value="newest">{t('search.newest')}</option>
              <option value="oldest">{t('search.oldest')}</option>
              <option value="title">{t('search.titleAZ')}</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className={styles.resultsCount}>
            Found {sortedBlogs.length} {sortedBlogs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </div>
        )}

        {blogs.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>{t('blog.noPosts')}</p>
            <p className={styles.emptySubtext}>{t('blog.noPostsDesc')}</p>
          </div>
        ) : sortedBlogs.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>{t('blog.noPosts')}</p>
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
                      {blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag)).length > 0 && (
                        <div className={styles.metaItem}>
                          <Tag size={16} />
                          <span>{blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag))[0]}</span>
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
