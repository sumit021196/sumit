-- Blog Posts Table Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to create the blog tables

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_name VARCHAR(100) DEFAULT 'Sumit',
  author_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[], -- Array of tags
  meta_title VARCHAR(60), -- SEO meta title (60 chars)
  meta_description VARCHAR(160), -- SEO meta description (160 chars)
  keywords TEXT[], -- SEO keywords array
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  reading_time INTEGER, -- Reading time in minutes
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_comments table (optional)
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_comments_post_id ON blog_comments(blog_post_id);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view published blog posts" 
  ON blog_posts FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Public can view categories" 
  ON blog_categories FOR SELECT 
  USING (true);

CREATE POLICY "Public can view approved comments" 
  ON blog_comments FOR SELECT 
  USING (is_approved = true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Web Development', 'web-development', 'Everything about web development, costs, and best practices'),
  ('Mobile Apps', 'mobile-apps', 'Mobile application development guides and pricing'),
  ('Software Development', 'software-development', 'Custom software development insights'),
  ('Pricing & Cost', 'pricing-cost', 'Detailed pricing guides for various development services'),
  ('Technology', 'technology', 'Latest technology trends and tools'),
  ('Tips & Guides', 'tips-guides', 'Helpful tips and comprehensive guides')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts (SEO-optimized for Indian market)
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  category,
  tags,
  meta_title,
  meta_description,
  keywords,
  is_published,
  is_featured,
  reading_time,
  published_at
) VALUES
(
  'Website Development Cost in India 2025: Complete Pricing Guide',
  'website-development-cost-india-2025',
  'Comprehensive guide to website development costs in India. Learn about pricing for different types of websites, factors affecting cost, and how to budget for your project.',
  'Complete detailed content here...',
  'Pricing & Cost',
  ARRAY['website cost', 'web development price', 'India', 'pricing guide'],
  'Website Development Cost in India 2025 | Price Guide',
  'Complete guide to website development costs in India. Get transparent pricing for e-commerce, business, portfolio websites. Expert insights & budget tips.',
  ARRAY['website development cost india', 'web development price', 'website cost calculator', 'how much does a website cost'],
  true,
  true,
  8,
  NOW()
);

COMMENT ON TABLE blog_posts IS 'Stores all blog posts with SEO optimization';
COMMENT ON TABLE blog_categories IS 'Blog categories for organization';
COMMENT ON TABLE blog_comments IS 'User comments on blog posts';
