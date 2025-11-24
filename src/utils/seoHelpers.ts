/**
 * SEO utility functions for managing meta tags and structured data
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Update document title and meta tags dynamically
 */
export const updateSEOMetadata = (metadata: SEOMetadata) => {
  const baseUrl = 'https://oriflamebyvusale.vercel.app';
  
  // Update title
  document.title = metadata.title;
  
  // Helper to update or create meta tag
  const updateMetaTag = (selector: string, content: string) => {
    let element = document.querySelector(selector);
    if (element) {
      element.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      const [attr, value] = selector.replace(/[\[\]]/g, '').split('=');
      meta.setAttribute(attr, value.replace(/"/g, ''));
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };
  
  // Update standard meta tags
  updateMetaTag('meta[name="title"]', metadata.title);
  updateMetaTag('meta[name="description"]', metadata.description);
  if (metadata.keywords) {
    updateMetaTag('meta[name="keywords"]', metadata.keywords);
  }
  
  // Update Open Graph tags
  updateMetaTag('meta[property="og:title"]', metadata.title);
  updateMetaTag('meta[property="og:description"]', metadata.description);
  updateMetaTag('meta[property="og:type"]', metadata.type || 'website');
  if (metadata.url) {
    updateMetaTag('meta[property="og:url"]', `${baseUrl}${metadata.url}`);
  }
  if (metadata.image) {
    updateMetaTag('meta[property="og:image"]', metadata.image.startsWith('http') ? metadata.image : `${baseUrl}${metadata.image}`);
  }
  if (metadata.publishedTime) {
    updateMetaTag('meta[property="article:published_time"]', metadata.publishedTime);
  }
  if (metadata.modifiedTime) {
    updateMetaTag('meta[property="article:modified_time"]', metadata.modifiedTime);
  }
  if (metadata.author) {
    updateMetaTag('meta[property="article:author"]', metadata.author);
  }
  if (metadata.tags) {
    metadata.tags.forEach(tag => {
      updateMetaTag('meta[property="article:tag"]', tag);
    });
  }
  
  // Update Twitter Card tags
  updateMetaTag('meta[property="twitter:title"]', metadata.title);
  updateMetaTag('meta[property="twitter:description"]', metadata.description);
  if (metadata.image) {
    updateMetaTag('meta[property="twitter:image"]', metadata.image.startsWith('http') ? metadata.image : `${baseUrl}${metadata.image}`);
  }
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (canonical && metadata.url) {
    canonical.href = `${baseUrl}${metadata.url}`;
  } else if (metadata.url) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${baseUrl}${metadata.url}`;
    document.head.appendChild(canonical);
  }
};

/**
 * Generate JSON-LD structured data for articles/products
 */
export const generateArticleStructuredData = (data: {
  title: string;
  description: string;
  image?: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
  tags?: string[];
}) => {
  const baseUrl = 'https://oriflamebyvusale.vercel.app';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image ? (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : undefined,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Oriflame by Vusale',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: data.publishedDate,
    dateModified: data.modifiedDate || data.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${data.url}`,
    },
    keywords: data.tags?.join(', '),
  };
};

/**
 * Generate JSON-LD structured data for the website/organization
 */
export const generateOrganizationStructuredData = () => {
  const baseUrl = 'https://oriflamebyvusale.vercel.app';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Oriflame by Vusale',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Premium Oriflame beauty products, skincare, cosmetics and wellness solutions. Expert reviews, beauty tips, and exclusive product recommendations.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Azerbaijani', 'Russian'],
    },
    sameAs: [
      'https://www.instagram.com/oriflame_vusale',
      // Add other social media links
    ],
  };
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (items: { name: string; url: string }[]) => {
  const baseUrl = 'https://oriflamebyvusale.vercel.app';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
};

/**
 * Inject structured data into the page
 */
export const injectStructuredData = (data: object | object[]) => {
  const dataArray = Array.isArray(data) ? data : [data];
  
  // Remove existing structured data scripts
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    if (script.hasAttribute('data-dynamic')) {
      script.remove();
    }
  });
  
  // Inject new structured data
  dataArray.forEach(item => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
};

/**
 * Remove dynamic structured data (useful for cleanup)
 */
export const removeStructuredData = () => {
  document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach(script => {
    script.remove();
  });
};
