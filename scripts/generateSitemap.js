import fs from 'fs';
import path from 'path';
import { createGzip } from 'zlib';

const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.9 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/faq', changefreq: 'monthly', priority: 0.6 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
];

// Sample blog posts - will be replaced with actual data from Supabase
const sampleBlogPosts = [
  { slug: 'react-vs-vue-vs-angular-2025' },
  { slug: 'how-to-build-portfolio-website-2025' },
  { slug: 'responsive-design-best-practices-2025' },
  { slug: 'website-performance-optimization-2025' },
  { slug: 'freelancing-tips-developers-2025' },
  { slug: 'mern-stack-tutorial-2025' },
  { slug: 'web-development-trends-2025' },
  { slug: 'choose-web-development-framework-2025' },
];

async function fetchBlogPosts() {
  try {
    // Dynamic import to handle missing dependencies gracefully
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('⚠️  Supabase credentials not found, using sample blog posts');
      return sampleBlogPosts;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.log('⚠️  Supabase error, falling back to sample blog posts:', error.message);
      return sampleBlogPosts;
    }

    return data || sampleBlogPosts;
  } catch (error) {
    console.log('⚠️  Could not connect to Supabase, using sample blog posts:', error.message);
    return sampleBlogPosts;
  }
}

async function generateSitemap() {
  try {
    console.log('🚀 Starting sitemap generation...');

    // Dynamic import for sitemap package
    const { SitemapStream, streamToPromise } = await import('sitemap');

    const smStream = new SitemapStream({
      hostname: 'https://sumit021196.github.io/sumit',
      lastmodDateOnly: true,
    });

    const pipeline = smStream.pipe(createGzip());

    // Add static pages to sitemap
    staticPages.forEach(page => {
      smStream.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString().split('T')[0],
      });
    });

    // Fetch and add blog posts to sitemap
    console.log('📝 Fetching blog posts...');
    const blogPosts = await fetchBlogPosts();

    blogPosts.forEach(post => {
      smStream.write({
        url: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0],
      });
    });

    smStream.end();

    // Create sitemap.xml in public directory
    const sitemapPath = path.resolve('./public/sitemap.xml');
    const writeStream = fs.createWriteStream(sitemapPath);

    pipeline.pipe(writeStream);

    await streamToPromise(pipeline);
    console.log(`✅ Sitemap generated successfully with ${staticPages.length + blogPosts.length} URLs!`);
    console.log('📝 Sitemap saved to: public/sitemap.xml');

    // Also create uncompressed version for easier reading
    try {
      const { SitemapStream } = await import('sitemap');
      const uncompressedStream = new SitemapStream({
        hostname: 'https://sumit021196.github.io/sumit',
        lastmodDateOnly: true,
      });

      // Add static pages
      staticPages.forEach(page => {
        uncompressedStream.write({
          url: page.url,
          changefreq: page.changefreq,
          priority: page.priority,
          lastmod: new Date().toISOString().split('T')[0],
        });
      });

      // Add blog posts
      blogPosts.forEach(post => {
        uncompressedStream.write({
          url: `/blog/${post.slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date().toISOString().split('T')[0],
        });
      });

      uncompressedStream.end();

      const sitemapText = await streamToPromise(uncompressedStream);
      const uncompressedPath = path.resolve('./public/sitemap-uncompressed.xml');
      fs.writeFileSync(uncompressedPath, sitemapText);
      console.log('📝 Uncompressed sitemap also saved to: public/sitemap-uncompressed.xml');
    } catch (e) {
      console.log('⚠️  Could not create uncompressed version:', e.message);
    }
  } catch (e) {
    console.error('❌ Error generating sitemap:', e.message);
    console.log('🔧 Troubleshooting: Make sure @supabase/supabase-js and sitemap packages are installed');
    console.log('   Run: npm install @supabase/supabase-js sitemap');
  }
}

generateSitemap();
