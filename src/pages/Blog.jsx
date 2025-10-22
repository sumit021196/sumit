import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Alert,
  Pagination,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BlogCard from '../components/blog/BlogCard';
import { fetchBlogPosts, fetchCategories, fetchFeaturedPosts, searchBlogPosts } from '../services/blogService';

/**
 * Blog Page Component
 * Main blog listing page with search, filter, and pagination
 * SEO-optimized for Google indexing
 */
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  // Fetch initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Fetch posts when category or page changes
  useEffect(() => {
    loadPosts();
  }, [selectedCategory, page]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [categoriesData, featuredData] = await Promise.all([
        fetchCategories(),
        fetchFeaturedPosts(3)
      ]);
      setCategories(categoriesData);
      setFeaturedPosts(featuredData);
    } catch (err) {
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * postsPerPage;
      const category = selectedCategory === 'all' ? null : selectedCategory;

      const { posts: postsData, total } = await fetchBlogPosts(
        postsPerPage,
        offset,
        category
      );

      setPosts(postsData);
      setTotalPages(Math.ceil(total / postsPerPage));
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadPosts();
      return;
    }

    try {
      setLoading(true);
      const results = await searchBlogPosts(searchTerm);
      setPosts(results);
      setTotalPages(1);
    } catch (err) {
      console.error('Error searching posts:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setPage(1);
    setSearchTerm('');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Blog | Web Development, App Development & Software Pricing Guide</title>
        <meta 
          name="description" 
          content="Expert insights on website development costs, mobile app pricing, software development rates in India. Get transparent pricing guides and development tips." 
        />
        <meta 
          name="keywords" 
          content="website development cost, mobile app price India, software development rates, web developer pricing, app development cost calculator" 
        />
        <link rel="canonical" href="https://yourwebsite.com/blog" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Development Blog | Pricing Guides & Tips" />
        <meta property="og:description" content="Get insights on web development, mobile app, and software pricing in India. Expert guides and tips." />
        <meta property="og:url" content="https://yourwebsite.com/blog" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Development Blog | Pricing & Tips" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Development Blog
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Expert insights on website development costs, mobile app pricing, software development rates, and more
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search articles about pricing, development, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                },
              }}
            />
          </Box>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
              },
            }}
          >
            <Tab label="All Posts" value="all" />
            {categories.map((category) => (
              <Tab key={category.id} label={category.name} value={category.name} />
            ))}
          </Tabs>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Featured Posts */}
        {!searchTerm && selectedCategory === 'all' && featuredPosts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              📌 Featured Articles
            </Typography>
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <Grid item xs={12} md={4} key={post.id}>
                  <BlogCard post={post} featured />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Blog Posts Grid - More compact on mobile */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            {searchTerm ? 'Search Results' : 'Latest Articles'}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 4, sm: 8 } }}>
              <CircularProgress size={24} />
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 8 } }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                No articles found. Try a different search or category.
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {posts.map((post) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <BlogCard post={post} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination - Smaller on mobile */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, sm: 6 } }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size={useMediaQuery(theme => theme.breakpoints.down('sm')) ? 'small' : 'large'}
                    siblingCount={useMediaQuery(theme => theme.breakpoints.down('sm')) ? 0 : 1}
                    boundaryCount={useMediaQuery(theme => theme.breakpoints.down('sm')) ? 1 : 2}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        minWidth: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        margin: { xs: '0 2px', sm: '0 4px' },
                        padding: '0 4px'
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>

        {/* SEO Keywords Section */}
        <Box sx={{ mt: 8, p: 4, backgroundColor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Popular Topics
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {[
              'Website Development Cost India',
              'Mobile App Pricing',
              'Software Development Rates',
              'E-commerce Website Price',
              'React Development',
              'Full Stack Developer',
              'Website Maintenance Cost',
              'App Development Time',
              'Custom Software Pricing'
            ].map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                variant="outlined"
                onClick={() => {
                  setSearchTerm(keyword);
                  handleSearch();
                }}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Blog;
