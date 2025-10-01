import React from 'react';
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
  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={name} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default SEO;
