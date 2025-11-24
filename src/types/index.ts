export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags: string[];
  amazonProducts: AmazonProduct[];
}

export interface AmazonProduct {
  id: string;
  title: string;
  affiliateLink: string;
  imageUrl: string;
  price?: string;
  description?: string;
  whatsappNumber?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
