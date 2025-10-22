import React from 'react';
import SEO from './SEO';
import { ArticleSchema } from './StructuredData';

const BlogPostSEO = ({ post }) => {
  if (!post) return null;

  // Extract reading time estimate
  const wordCount = post.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200); // Assume 200 words per minute

  // Generate structured keywords
  const keywords = [
    ...(post.tags || []),
    post.category,
    'web development',
    'programming',
    'technology',
    'tutorial'
  ].join(', ');

  // Enhanced description for SEO
  const description = post.excerpt ||
    `${post.title} - A comprehensive article about ${post.category}. Read this detailed guide covering ${post.tags?.slice(0, 3).join(', ') || 'web development topics'}.`;

  return (
    <>
      <SEO
        title={`${post.title} | Sumit - Full Stack Developer`}
        description={description}
        type="article"
        keywords={keywords}
        image={post.image || post.featured_image || "/cover.jpg"}
        url={`https://sumit021196.github.io/sumit/blog/${post.slug}`}
      />
      <meta name="author" content="Sumit Meshram" />
      <meta name="article:author" content="Sumit Meshram" />
      <meta name="article:section" content={post.category} />
      <meta name="article:tag" content={post.tags?.join(',')} />
      <meta name="article:published_time" content={post.published_at} />
      {post.updated_at && post.updated_at !== post.published_at && (
        <meta name="article:modified_time" content={post.updated_at} />
      )}
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content={`${readingTime} min read`} />
      <meta name="twitter:label2" content="Category" />
      <meta name="twitter:data2" content={post.category} />

      {/* Article Schema for rich snippets */}
      <ArticleSchema article={post} />
    </>
  );
};

export default BlogPostSEO;
