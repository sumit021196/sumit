import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import { fetchBlogPostBySlug, fetchRelatedPosts } from '../services/blogService';
import BlogCard from '../components/blog/BlogCard';
import BlogPostSEO from '../components/BlogPostSEO';

/**
 * BlogPost Component
 * Individual blog post page with full content
 * SEO-optimized with structured data and social sharing
 */
const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const postData = await fetchBlogPostBySlug(slug);
      setPost(postData);

      // Fetch related posts
      if (postData && postData.tags) {
        const related = await fetchRelatedPosts(postData.tags, postData.id, 3);
        setRelatedPosts(related);
      }
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Failed to load the blog post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Blog post not found'}</Alert>
        <Button component={Link} to="/blog" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fullUrl = `https://sumit021196.github.io/sumit/blog/${post.slug}`;

  return (
    <>
      <BlogPostSEO post={post} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button */}
        <Button
          component={Link}
          to="/blog"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Blog
        </Button>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Featured Image */}
            {post.featured_image && (
              <Box
                component="img"
                src={post.featured_image}
                alt={post.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 500,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 4,
                }}
              />
            )}

            {/* Category & Tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label={post.category} color="primary" />
              {post.tags && post.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" size="small" />
              ))}
            </Box>

            {/* Title */}
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              {post.title}
            </Typography>

            {/* Meta Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 4,
                pb: 3,
                borderBottom: '2px solid',
                borderColor: 'divider',
              }}
            >
              {/* Author */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={post.author_image} alt={post.author_name}>
                  {post.author_name?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {post.author_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formattedDate}
                  </Typography>
                </Box>
              </Box>

              {/* Reading Time */}
              {post.reading_time && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {post.reading_time} min read
                  </Typography>
                </Box>
              )}

              {/* Views */}
              {post.views_count > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VisibilityIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {post.views_count} views
                  </Typography>
                </Box>
              )}

              {/* Share Button */}
              <Button
                startIcon={<ShareIcon />}
                variant="outlined"
                size="small"
                onClick={handleShare}
                sx={{ ml: 'auto' }}
              >
                Share
              </Button>
            </Box>

            {/* Blog Content */}
            <Box
              sx={{
                '& p': {
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 3,
                  color: 'text.primary',
                },
                '& h2': {
                  fontSize: '2rem',
                  fontWeight: 700,
                  mt: 5,
                  mb: 2,
                },
                '& h3': {
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                },
                '& ul, & ol': {
                  mb: 3,
                  pl: 4,
                },
                '& li': {
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 1,
                },
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  my: 3,
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 3,
                  py: 1,
                  my: 3,
                  fontStyle: 'italic',
                  color: 'text.secondary',
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Divider sx={{ my: 4 }} />

            {/* Call to Action */}
            <Card sx={{ mt: 4, backgroundColor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Need Help with Your Project?
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Get a free consultation and quote for your web or app development needs
                </Typography>
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Get Free Quote
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* About Author */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={700}>
                  About the Author
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar src={post.author_image} sx={{ width: 60, height: 60 }}>
                    {post.author_name?.[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {post.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Full Stack Developer
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Experienced developer specializing in web and mobile application development with expertise in React, Node.js, and modern tech stacks.
                </Typography>
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom fontWeight={700} sx={{ mb: 2 }}>
                  Related Articles
                </Typography>
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    component={Link}
                    to={`/blog/${relatedPost.slug}`}
                    sx={{
                      mb: 2,
                      textDecoration: 'none',
                      '&:hover': {
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        {relatedPost.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {relatedPost.reading_time} min read
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogPost;
