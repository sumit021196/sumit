#!/usr/bin/env node

/**
 * Sitemap Management Script
 * Generates sitemap and provides options for search engine submission
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const sitemapUrl = 'https://sumit021196.github.io/sumit/sitemap.xml';
const searchEngines = [
  {
    name: 'Google',
    url: 'https://www.google.com/webmasters/tools/ping?sitemap=',
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/webmaster/ping.aspx?siteMap=',
  }
];

async function submitToSearchEngines() {
  console.log('🚀 Submitting sitemap to search engines...\n');

  for (const engine of searchEngines) {
    const submissionUrl = `${engine.url}${encodeURIComponent(sitemapUrl)}`;

    try {
      await new Promise((resolve, reject) => {
        https.get(submissionUrl, (res) => {
          console.log(`✅ ${engine.name}: ${res.statusCode} - ${res.statusMessage}`);
          resolve();
        }).on('error', (err) => {
          console.log(`❌ ${engine.name}: Error - ${err.message}`);
          resolve(); // Don't fail the script if one search engine fails
        });
      });
    } catch (error) {
      console.log(`❌ ${engine.name}: Error - ${error.message}`);
    }
  }

  console.log('\n📝 Note: Make sure to manually submit your sitemap in:');
  console.log('   - Google Search Console: https://search.google.com/search-console');
  console.log('   - Bing Webmaster Tools: https://www.bing.com/webmaster');
  console.log('\n🎯 For GitHub Pages, sitemap updates may take time to reflect.');
}

function checkSitemapExists() {
  const sitemapPath = path.resolve('./public/sitemap.xml');
  return fs.existsSync(sitemapPath);
}

async function main() {
  console.log('🗺️  Sitemap Management Tool\n');

  // Check if sitemap exists
  if (!checkSitemapExists()) {
    console.log('❌ Sitemap not found. Please run: npm run generate-sitemap');
    process.exit(1);
  }

  console.log('📍 Sitemap found, proceeding with submission...\n');

  // Submit to search engines
  await submitToSearchEngines();

  console.log('\n✨ Sitemap management completed!');
  console.log('📊 You can check your sitemap at:');
  console.log(`   ${sitemapUrl}`);
  console.log('\n📋 Manual submission required:');
  console.log('   - Google Search Console: https://search.google.com/search-console');
  console.log('   - Bing Webmaster Tools: https://www.bing.com/webmaster');
  console.log('\n🎯 Note: For GitHub Pages, sitemap updates may take 24-48 hours to reflect.');
}

// Check if running directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { submitToSearchEngines, checkSitemapExists };
