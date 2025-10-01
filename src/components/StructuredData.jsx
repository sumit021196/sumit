import React from 'react';
import { Helmet } from 'react-helmet-async';

export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sumit's Portfolio",
    "url": "https://sumit021196.github.io/sumit/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sumit021196.github.io/sumit/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const PersonSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sumit Meshram",
    "url": "https://sumit021196.github.io/sumit",
    "sameAs": [
      "https://github.com/sumit021196",
      "https://www.linkedin.com/in/your-linkedin"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
