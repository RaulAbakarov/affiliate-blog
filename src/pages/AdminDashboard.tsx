import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogService } from '../utils/blogService';
import type { Blog } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { format } from 'date-fns';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const allBlogs = await blogService.getAllBlogs();
      setBlogs(allBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('admin.confirmDelete'))) {
      try {
        const success = await blogService.deleteBlog(id);
        if (success) {
          alert('✅ Blog post deleted successfully!');
          await loadBlogs();
        } else {
          alert('❌ Failed to delete blog post.');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('❌ Error deleting blog post. Please try again.');
      }
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>{t('admin.dashboard')}</h1>
          <p className={styles.subtitle}>{t('admin.manage')}</p>
        </div>

        {/* Actions Bar */}
        <div className={styles.actionsBar}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder={t('admin.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <Link
            to="/admin/blog/new"
            className={styles.newPostButton}
          >
            <Plus size={20} />
            <span>{t('admin.newPost')}</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>{t('admin.totalPosts')}</h3>
            <p className={styles.statValue}>{blogs.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>{t('admin.publishedPosts')}</h3>
            <p className={`${styles.statValue} ${styles.published}`}>
              {blogs.filter(b => b.published).length}
            </p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>{t('admin.draftPosts')}</h3>
            <p className={`${styles.statValue} ${styles.drafts}`}>
              {blogs.filter(b => !b.published).length}
            </p>
          </div>
        </div>

        {/* Blog List */}
        <div className={styles.blogListContainer}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                {searchTerm ? 'No blogs found matching your search.' : 'No blog posts yet. Create your first one!'}
              </p>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th}>
                      {t('admin.title')}
                    </th>
                    <th className={styles.th}>
                      {t('admin.status')}
                    </th>
                    <th className={styles.th}>
                      {t('admin.date')}
                    </th>
                    <th className={`${styles.th} ${styles.thRight}`}>
                      {t('admin.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className={styles.tr}>
                      <td className={styles.td}>
                        <div className={styles.blogInfo}>
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className={styles.thumbnail}
                          />
                          <div className={styles.blogDetails}>
                            <p className={styles.blogTitle}>{blog.title}</p>
                            <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span
                          className={`${styles.badge} ${
                            blog.published
                              ? styles.badgePublished
                              : styles.badgeDraft
                          }`}
                        >
                          {blog.published ? t('admin.published') : t('admin.draft')}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.dateText}>
                          {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            onClick={() => navigate(`/blog/${blog.slug}`)}
                            className={`${styles.actionButton} ${styles.view}`}
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                            className={`${styles.actionButton} ${styles.edit}`}
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className={`${styles.actionButton} ${styles.delete}`}
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
