import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../utils/blogService';
import type { Blog } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Tag, ChevronLeft, ChevronRight, Search, Filter, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import styles from './HomePage.module.css';

const POSTS_PER_PAGE = 9;
const LANGUAGE_TAGS = ['lang:en', 'lang:az', 'lang:ru'];

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagMenu, setShowTagMenu] = useState(false);

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

  // Filter blogs based on search query and selected tags
  const filteredBlogs = languageFilteredBlogs.filter(blog => {
    const query = searchQuery.toLowerCase();
    const nonLangTags = blog.tags.filter(tag => !LANGUAGE_TAGS.includes(tag));
    const matchesSearch = (
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt.toLowerCase().includes(query) ||
      nonLangTags.some(tag => tag.toLowerCase().includes(query))
    );
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => blog.tags.includes(tag));
    return matchesSearch && matchesTags;
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
  }, [searchQuery, sortBy, selectedTags, language]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  // Close tag menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.iconButtonContainer}`)) {
        setShowTagMenu(false);
      }
    };

    if (showTagMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showTagMenu]);

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
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.iconButtonContainer}>
            <button
              className={`${styles.iconButton} ${showTagMenu ? styles.active : ''}`}
              onClick={() => setShowTagMenu(!showTagMenu)}
              title={t('search.filterByTag')}
            >
              <Filter size={18} />
            </button>
            {showTagMenu && (
              <div className={styles.tagMenu}>
                {allTags.map(tag => (
                  <label key={tag} className={styles.tagMenuItem}>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className={styles.tagCheckbox}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className={styles.iconButtonContainer}>
            <button
              className={styles.iconButton}
              onClick={() => {
                const sortOrder: ('newest' | 'oldest' | 'title')[] = ['newest', 'oldest', 'title'];
                const currentIndex = sortOrder.indexOf(sortBy);
                const nextIndex = (currentIndex + 1) % sortOrder.length;
                setSortBy(sortOrder[nextIndex]);
              }}
              title={t('search.sortBy') + ': ' + t(`search.${sortBy}`)}
            >
              <ArrowUpDown size={18} />
            </button>
          </div>
        </div>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <div className={styles.selectedTagsContainer}>
            {selectedTags.map(tag => (
              <span key={tag} className={styles.selectedTag}>
                <Tag size={14} />
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className={styles.removeTagButton}
                  aria-label="Remove tag"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={() => setSelectedTags([])} 
              className={styles.clearAllTags}
            >
              Clear all
            </button>
          </div>
        )}

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
