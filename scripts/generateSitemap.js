const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.9 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
];

async function generateSitemap() {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://sumit021196.github.io/sumit',
      lastmodDateOnly: true,
    });

    const pipeline = smStream.pipe(createGzip());
    
    // Add all pages to sitemap
    pages.forEach(page => {
      smStream.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString().split('T')[0],
      });
    });

    smStream.end();

    // Create sitemap.xml in public directory
    const sitemapPath = path.resolve('./public/sitemap.xml');
    const writeStream = fs.createWriteStream(sitemapPath);
    
    pipeline.pipe(writeStream);
    
    await streamToPromise(pipeline);
    console.log('Sitemap generated successfully!');
  } catch (e) {
    console.error('Error generating sitemap:', e);
  }
}

generateSitemap();
