import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert, Button } from '@mui/material';
import { motion } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';
import NewsCard from './NewsCard';
import { worldNewsService } from '../services/worldNewsService';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const newsData = await worldNewsService.fetchTopNews('in', 2);

      if (newsData.length === 0) {
        setError('No news articles found');
        return;
      }

      const formattedNews = newsData.map(worldNewsService.formatNewsData);
      setNews(formattedNews);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    fetchNews();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            background: 'linear-gradient(90deg, #3f51b5 0%, #9c27b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Latest World News
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          Stay updated with the latest news from around the world
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {news.slice(0, 2).map((newsItem, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={newsItem.id}>
              <NewsCard news={newsItem} index={index} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Refresh News
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NewsSection;
