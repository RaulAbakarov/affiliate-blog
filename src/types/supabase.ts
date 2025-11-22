export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image: string;
          author: string;
          created_at: string;
          updated_at: string;
          published: boolean;
          tags: string[];
          amazon_products: AmazonProduct[];
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image: string;
          author: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
          tags?: string[];
          amazon_products?: AmazonProduct[];
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          featured_image?: string;
          author?: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
          tags?: string[];
          amazon_products?: AmazonProduct[];
        };
      };
    };
  };
}

export interface AmazonProduct {
  id: string;
  title: string;
  affiliateLink: string;
  imageUrl: string;
  price?: string;
  description?: string;
}
