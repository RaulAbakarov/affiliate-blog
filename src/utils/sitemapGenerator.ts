import { blogService } from '../utils/blogService';

/**
 * Generate sitemap.xml for search engines
 */
export const generateSitemap = async (): Promise<string> => {
  const baseUrl = 'https://oriflamebyvusale.vercel.app';
  const currentDate = new Date().toISOString();
  
  // Static pages with priorities
  const staticPages: { url: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
    { url: '/terms', changefreq: 'yearly', priority: '0.3' },
    { url: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
  ];
  
  // Fetch all published blogs
  let blogPages: { url: string; lastmod?: string; changefreq: string; priority: string }[] = [];
  try {
    const blogs = await blogService.getPublishedBlogs();
    blogPages = blogs.map(blog => ({
      url: `/blog/${blog.slug}`,
      lastmod: blog.updatedAt || blog.createdAt,
      changefreq: 'weekly',
      priority: '0.9',
    }));
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }
  
  const allPages = [...staticPages, ...blogPages];
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  allPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    if (page.lastmod) {
      xml += `    <lastmod>${new Date(page.lastmod).toISOString()}</lastmod>\n`;
    } else {
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
    }
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};
