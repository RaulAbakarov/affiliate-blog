import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { blogService } from '../utils/blogService';
import type { AmazonProduct } from '../types';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import styles from './BlogEditor.module.css';

// Lazy load ReactQuill to avoid SSR issues with React 19
const ReactQuill = lazy(() => import('react-quill').then(module => ({ default: module.default })));

export const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // If id exists, we're in edit mode

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [published, setPublished] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [amazonProducts, setAmazonProducts] = useState<AmazonProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      if (isEditMode && id) {
        const blog = await blogService.getBlogById(id);
        if (blog) {
          setTitle(blog.title);
          setExcerpt(blog.excerpt);
          setContent(blog.content);
          setFeaturedImage(blog.featuredImage);
          setPublished(blog.published);
          setTags(blog.tags);
          setAmazonProducts(blog.amazonProducts);
        }
      }
    };
    loadBlog();
  }, [id, isEditMode]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddProduct = () => {
    const newProduct: AmazonProduct = {
      id: Date.now().toString(),
      title: '',
      affiliateLink: '',
      imageUrl: '',
      price: '',
      description: '',
    };
    setAmazonProducts([...amazonProducts, newProduct]);
  };

  const handleUpdateProduct = (index: number, field: keyof AmazonProduct, value: string) => {
    const updated = [...amazonProducts];
    updated[index] = { ...updated[index], [field]: value };
    setAmazonProducts(updated);
  };

  const handleRemoveProduct = (index: number) => {
    setAmazonProducts(amazonProducts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = blogService.generateSlug(title);
    const blogData = {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author: 'Admin',
      published,
      tags,
      amazonProducts: amazonProducts.filter(p => p.title && p.whatsappNumber),
    };

    try {
      if (isEditMode && id) {
        await blogService.updateBlog(id, blogData);
        alert('✅ Blog post updated successfully!');
      } else {
        await blogService.createBlog(blogData);
        alert('✅ Blog post created successfully!');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('❌ Error saving blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  }), []);

  return (
    <div className={styles.editor}>
      <div className={styles.container}>
        <button
          onClick={() => navigate('/admin')}
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className={styles.card}>
          <h1 className={styles.title}>
            {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Title */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Excerpt */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Excerpt *
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className={styles.textarea}
                placeholder="Brief description of the blog post"
                required
              />
            </div>

            {/* Featured Image */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Featured Image URL *
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className={styles.input}
                placeholder="https://example.com/image.jpg"
                required
              />
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
            </div>

            {/* Content Editor */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Content *
              </label>
              <Suspense fallback={
                <div className={styles.quillPlaceholder}>
                  Loading editor...
                </div>
              }>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className={styles.quillContainer}
                  placeholder="Write your blog content here..."
                />
              </Suspense>
            </div>

            {/* Tags */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Tags
              </label>
              <div className={styles.tagInputContainer}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className={`${styles.input} ${styles.tagInput}`}
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className={styles.addTagButton}
                >
                  Add
                </button>
              </div>
              <div className={styles.tagsDisplay}>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={styles.tag}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className={styles.removeTag}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Amazon Products */}
            <div className={styles.formGroup}>
              <div className={styles.productsHeader}>
                <label className={styles.label}>
                  Featured Products
                </label>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className={styles.addProductButton}
                >
                  <Plus size={18} />
                  <span>Add Product</span>
                </button>
              </div>

              {amazonProducts.map((product, index) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productHeader}>
                    <h4 className={styles.productTitle}>Product {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className={styles.removeProductButton}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className={styles.productInputs}>
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => handleUpdateProduct(index, 'title', e.target.value)}
                      className={styles.productInput}
                      placeholder="Product title"
                    />
                    <input
                      type="tel"
                      value={product.whatsappNumber || ''}
                      onChange={(e) => handleUpdateProduct(index, 'whatsappNumber', e.target.value)}
                      className={styles.productInput}
                      placeholder="WhatsApp number (e.g., 1234567890)"
                    />
                    <input
                      type="url"
                      value={product.imageUrl}
                      onChange={(e) => handleUpdateProduct(index, 'imageUrl', e.target.value)}
                      className={styles.productInput}
                      placeholder="Product image URL"
                    />
                    <input
                      type="text"
                      value={product.price || ''}
                      onChange={(e) => handleUpdateProduct(index, 'price', e.target.value)}
                      className={styles.productInput}
                      placeholder="Price (e.g., $99.99)"
                    />
                    <textarea
                      value={product.description || ''}
                      onChange={(e) => handleUpdateProduct(index, 'description', e.target.value)}
                      rows={2}
                      className={`${styles.productInput} ${styles.productTextarea}`}
                      placeholder="Product description"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Published Status */}
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="published" className={styles.checkboxLabel}>
                Publish immediately
              </label>
            </div>

            {/* Submit Buttons */}
            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={loading}
                className={styles.submitButton}
              >
                <Save size={18} />
                <span>{loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
