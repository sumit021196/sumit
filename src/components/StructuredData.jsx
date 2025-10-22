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
    },
    "knowsAbout": [
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Web Development",
      "Full Stack Development",
      "MERN Stack",
      "Next.js",
      "Express.js"
    ],
    "description": "Experienced Full Stack Developer specializing in modern web technologies and scalable applications."
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const ArticleSchema = ({ article }) => {
  if (!article) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.description,
    "image": article.image || "/cover.jpg",
    "datePublished": article.published_at,
    "dateModified": article.updated_at || article.published_at,
    "author": {
      "@type": "Person",
      "name": "Sumit Meshram",
      "url": "https://sumit021196.github.io/sumit"
    },
    "publisher": {
      "@type": "Person",
      "name": "Sumit Meshram",
      "url": "https://sumit021196.github.io/sumit"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://sumit021196.github.io/sumit/blog/${article.slug}`
    },
    "url": `https://sumit021196.github.io/sumit/blog/${article.slug}`,
    "keywords": article.tags?.join(", ") || article.category,
    "articleSection": article.category,
    "wordCount": article.content?.split(' ').length || 0
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const FAQSchema = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
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

export const ProjectSchema = ({ project }) => {
  if (!project) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": project.url || `https://sumit021196.github.io/sumit/projects#${project.id}`,
    "image": project.image,
    "dateCreated": project.created_at,
    "author": {
      "@type": "Person",
      "name": "Sumit Meshram"
    },
    "programmingLanguage": project.technologies,
    "codeRepository": project.github_url,
    "applicationCategory": "WebApplication"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
