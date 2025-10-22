import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Sumit - Full Stack Developer',
  description = 'Experienced Full Stack Developer specializing in modern web technologies. Check out my portfolio and projects.',
  type = 'website',
  name = 'Sumit',
  keywords = 'Full Stack Developer, Web Developer, React, Node.js, Portfolio, JavaScript',
  image = '/cover.jpg',
  url = window.location.href
}) => {

  // Performance monitoring
  useEffect(() => {
    // Track page load performance
    if ('performance' in window) {
      window.addEventListener('load', () => {
        // Measure and log Core Web Vitals
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            const perfData = {
              page: url,
              loadTime: navigation.loadEventEnd - navigation.loadEventStart,
              domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
              firstByte: navigation.responseStart - navigation.requestStart,
            };

            // Log in development or send to analytics in production
            if (process.env.NODE_ENV === 'development') {
              console.log('Page Performance:', perfData);
            }
          }
        }, 0);
      });
    }
  }, [url]);

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={name} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* Performance and Core Web Vitals */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />

      {/* Resource hints for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Sumit - Full Stack Developer" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@sumitmeshram" />
      <meta name="twitter:creator" content="@sumitmeshram" />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={name} />
          <meta property="article:publisher" content="https://sumit021196.github.io/sumit" />
        </>
      )}

      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default SEO;
