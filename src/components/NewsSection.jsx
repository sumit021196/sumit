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
    <Box sx={{ py: { xs: 3, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1.4rem', md: '1.6rem' },
            background: 'linear-gradient(90deg, #3f51b5 0%, #9c27b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          🌍 Latest Updates
        </Typography>

        <Grid container spacing={{ xs: 1.5, sm: 2 }} justifyContent="center">
          {news.slice(0, 2).map((newsItem, index) => (
            <Grid item xs={12} sm={6} md={5} key={newsItem.id}>
              <NewsCard news={newsItem} index={index} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon fontSize="small" />}
            onClick={handleRefresh}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 2,
              py: 0.5,
              fontSize: '0.8rem'
            }}
          >
            Refresh
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NewsSection;
