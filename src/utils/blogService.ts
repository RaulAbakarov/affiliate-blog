import type { Blog } from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'blog_posts';

// Convert Supabase row to Blog type
const mapSupabaseToBlog = (row: any): Blog => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  content: row.content,
  featuredImage: row.featured_image,
  author: row.author,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  published: row.published,
  tags: row.tags || [],
  amazonProducts: row.amazon_products || [],
});

// Convert Blog type to Supabase row
const mapBlogToSupabase = (blog: Partial<Blog>): any => ({
  title: blog.title,
  slug: blog.slug,
  excerpt: blog.excerpt,
  content: blog.content,
  featured_image: blog.featuredImage,
  author: blog.author,
  published: blog.published,
  tags: blog.tags || [],
  amazon_products: blog.amazonProducts || [],
});

// Initialize with sample blogs if none exist
const initializeSampleBlogs = (): Blog[] => {
  return [
    {
      id: '1',
      title: 'Best Wireless Headphones for 2025',
      slug: 'best-wireless-headphones-2025',
      excerpt: 'Discover the top wireless headphones that deliver exceptional sound quality and comfort.',
      content: `<h2>Introduction</h2><p>Finding the perfect wireless headphones can be challenging with so many options available. In this comprehensive guide, we'll explore the best wireless headphones for 2025.</p><h2>Top Picks</h2><p>After extensive testing, these headphones stand out for their exceptional quality and value.</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      author: 'Admin',
      createdAt: new Date('2025-01-15').toISOString(),
      updatedAt: new Date('2025-01-15').toISOString(),
      published: true,
      tags: ['electronics', 'audio', 'gadgets'],
      amazonProducts: [
        {
          id: 'p1',
          title: 'Premium Wireless Headphones',
          affiliateLink: 'https://amazon.com/your-affiliate-link',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
          price: '$299.99',
          description: 'Premium noise-canceling wireless headphones'
        }
      ]
    },
    {
      id: '2',
      title: 'Top 10 Smart Home Devices',
      slug: 'top-10-smart-home-devices',
      excerpt: 'Transform your home with these cutting-edge smart home devices that make life easier.',
      content: `<h2>Smart Home Revolution</h2><p>Smart home technology has evolved dramatically. Here are the must-have devices for your connected home.</p><h2>Essential Devices</h2><p>These devices will transform how you interact with your living space.</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      author: 'Admin',
      createdAt: new Date('2025-02-10').toISOString(),
      updatedAt: new Date('2025-02-10').toISOString(),
      published: true,
      tags: ['smart home', 'technology', 'automation'],
      amazonProducts: [
        {
          id: 'p2',
          title: 'Smart Speaker Hub',
          affiliateLink: 'https://amazon.com/your-affiliate-link',
          imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80',
          price: '$129.99',
          description: 'Voice-controlled smart home hub'
        }
      ]
    },
    {
      id: '3',
      title: 'Best Kitchen Gadgets for Home Chefs',
      slug: 'best-kitchen-gadgets-home-chefs',
      excerpt: 'Elevate your cooking with these essential kitchen gadgets that every home chef needs.',
      content: `<h2>Kitchen Essentials</h2><p>Whether you're a beginner or seasoned cook, these kitchen gadgets will revolutionize your cooking experience.</p><h2>Must-Have Tools</h2><p>From precision to convenience, these tools deliver outstanding results.</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
      author: 'Admin',
      createdAt: new Date('2025-03-05').toISOString(),
      updatedAt: new Date('2025-03-05').toISOString(),
      published: true,
      tags: ['kitchen', 'cooking', 'gadgets'],
      amazonProducts: [
        {
          id: 'p3',
          title: 'Professional Knife Set',
          affiliateLink: 'https://amazon.com/your-affiliate-link',
          imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80',
          price: '$199.99',
          description: 'Professional-grade kitchen knife set'
        }
      ]
    }
  ];
};

export const blogService = {
  // Get all blogs
  getAllBlogs: async (): Promise<Blog[]> => {
    // Try Supabase first
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data ? data.map(mapSupabaseToBlog) : [];
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
      }
    }

    // Fallback to localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const sampleBlogs = initializeSampleBlogs();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBlogs));
      return sampleBlogs;
    }
    return JSON.parse(stored);
  },

  // Get published blogs only (for public view)
  getPublishedBlogs: async (): Promise<Blog[]> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        return data ? data.map(mapSupabaseToBlog) : [];
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
        // Fall through to localStorage
      }
    }

    const allBlogs = await blogService.getAllBlogs();
    return allBlogs.filter(blog => blog.published);
  },

  // Get single blog by slug
  getBlogBySlug: async (slug: string): Promise<Blog | undefined> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        return data ? mapSupabaseToBlog(data) : undefined;
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
      }
    }

    const allBlogs = await blogService.getAllBlogs();
    return allBlogs.find(blog => blog.slug === slug);
  },

  // Get single blog by id
  getBlogById: async (id: string): Promise<Blog | undefined> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return data ? mapSupabaseToBlog(data) : undefined;
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
      }
    }

    const allBlogs = await blogService.getAllBlogs();
    return allBlogs.find(blog => blog.id === id);
  },

  // Create new blog
  createBlog: async (blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .insert([mapBlogToSupabase(blogData)] as any)
          .select()
          .single();

        if (error) throw error;
        return mapSupabaseToBlog(data);
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
      }
    }

    // Fallback to localStorage
    const blogs = await blogService.getAllBlogs();
    const newBlog: Blog = {
      ...blogData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    blogs.push(newBlog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return newBlog;
  },

  // Update blog
  updateBlog: async (id: string, updates: Partial<Blog>): Promise<Blog | null> => {
    if (isSupabaseConfigured()) {
      try {
        const updateData: any = {
          ...mapBlogToSupabase(updates),
          updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('blogs')
          .update(updateData)
          .eq('id', id)
          .select()
          .single() as any;

        if (error) throw error;
        return data ? mapSupabaseToBlog(data) : null;
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
      }
    }

    // Fallback to localStorage
    const blogs = await blogService.getAllBlogs();
    const index = blogs.findIndex(blog => blog.id === id);
    if (index === -1) return null;
    
    blogs[index] = {
      ...blogs[index],
      ...updates,
      id: blogs[index].id,
      createdAt: blogs[index].createdAt,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return blogs[index];
  },

  // Delete blog
  deleteBlog: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('blogs')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Supabase error, falling back to localStorage:', error);
      }
    }

    // Fallback to localStorage
    const blogs = await blogService.getAllBlogs();
    const filtered = blogs.filter(blog => blog.id !== id);
    if (filtered.length === blogs.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Generate slug from title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};
