# Supabase Setup Guide

This guide will help you set up Supabase for your blog platform.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `blog-affiliate-platform`
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Wait for the project to be created (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

3. Open the `.env` file in your project root and add:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## Step 3: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

\`\`\`sql
-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  amazon_products JSONB DEFAULT '[]'
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blogs
CREATE POLICY "Public blogs are viewable by everyone"
  ON blogs FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can view all blogs
CREATE POLICY "Authenticated users can view all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert blogs
CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update blogs
CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Authenticated users can delete blogs
CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, featured_image, published, tags, amazon_products)
VALUES 
  (
    'Best Wireless Headphones for 2025',
    'best-wireless-headphones-2025',
    'Discover the top wireless headphones that deliver exceptional sound quality and comfort.',
    '<h2>Introduction</h2><p>Finding the perfect wireless headphones can be challenging with so many options available. In this comprehensive guide, we''ll explore the best wireless headphones for 2025.</p><h2>Top Picks</h2><p>After extensive testing, these headphones stand out for their exceptional quality and value.</p>',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    true,
    ARRAY['electronics', 'audio', 'gadgets'],
    '[{"id": "p1", "title": "Premium Wireless Headphones", "affiliateLink": "https://amazon.com/your-affiliate-link", "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", "price": "$299.99", "description": "Premium noise-canceling wireless headphones"}]'::jsonb
  ),
  (
    'Top 10 Smart Home Devices',
    'top-10-smart-home-devices',
    'Transform your home with these cutting-edge smart home devices that make life easier.',
    '<h2>Smart Home Revolution</h2><p>Smart home technology has evolved dramatically. Here are the must-have devices for your connected home.</p><h2>Essential Devices</h2><p>These devices will transform how you interact with your living space.</p>',
    'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    true,
    ARRAY['smart home', 'technology', 'automation'],
    '[{"id": "p2", "title": "Smart Speaker Hub", "affiliateLink": "https://amazon.com/your-affiliate-link", "imageUrl": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80", "price": "$129.99", "description": "Voice-controlled smart home hub"}]'::jsonb
  ),
  (
    'Best Kitchen Gadgets for Home Chefs',
    'best-kitchen-gadgets-home-chefs',
    'Elevate your cooking with these essential kitchen gadgets that every home chef needs.',
    '<h2>Kitchen Essentials</h2><p>Whether you''re a beginner or seasoned cook, these kitchen gadgets will revolutionize your cooking experience.</p><h2>Must-Have Tools</h2><p>From precision to convenience, these tools deliver outstanding results.</p>',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
    true,
    ARRAY['kitchen', 'cooking', 'gadgets'],
    '[{"id": "p3", "title": "Professional Knife Set", "affiliateLink": "https://amazon.com/your-affiliate-link", "imageUrl": "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80", "price": "$199.99", "description": "Professional-grade kitchen knife set"}]'::jsonb
  );
\`\`\`

4. Click **Run** to execute the query

## Step 4: Set Up Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (it's usually enabled by default)
3. Go to **Authentication** → **Users**
4. Click **Add User** → **Create new user**
5. Enter:
   - Email: `admin@blog.com` (or your preferred admin email)
   - Password: (choose a strong password)
   - Auto Confirm User: ✓ (check this box)
6. Click **Create User**

## Step 5: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. The app will now use Supabase! Features:
   - ✅ **Authentication**: Login with your Supabase user
   - ✅ **Blog Storage**: All blogs saved to Supabase database
   - ✅ **Real-time sync**: Changes reflected across devices
   - ✅ **Fallback**: Automatically falls back to localStorage if Supabase is not configured

## Usage

### Login
- Use the email and password you created in Supabase
- Or use the fallback: `admin` / `admin123` (only works when Supabase is not configured)

### Managing Blogs
- All CRUD operations are now stored in Supabase
- Changes are persistent and accessible from anywhere
- Row Level Security ensures only authenticated users can edit

## Troubleshooting

### "Supabase error" messages
- Check your `.env` file has correct credentials
- Verify your Supabase project is active
- Check browser console for detailed error messages
- The app will automatically fallback to localStorage

### Can't login with Supabase account
- Make sure you confirmed the user in Supabase dashboard
- Check if email authentication is enabled
- Verify the user exists in Authentication → Users

### Blogs not saving
- Check if the `blogs` table was created successfully
- Verify RLS policies are set up correctly
- Check Network tab in browser dev tools for API errors

## Optional: Deploy to Production

When deploying:
1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Add your production domain to Supabase **Settings** → **URL Configuration**
3. Update RLS policies if needed for production security

## Benefits of Using Supabase

✅ **Cloud Database**: Access your blogs from anywhere
✅ **Authentication**: Built-in user management
✅ **Real-time**: Optional real-time subscriptions
✅ **Scalable**: Automatically scales with your traffic
✅ **Secure**: Row Level Security built-in
✅ **Free Tier**: Generous free tier for starting out
