import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ScheduleIcon from '@mui/icons-material/Schedule';

const NewsCard = ({ news, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
          cursor: 'pointer',
        }}
        onClick={() => window.open(news.url, '_blank')}
      >
        <CardMedia
          component="img"
          height="200"
          image={news.image || 'https://via.placeholder.com/400x200/3f51b5/ffffff?text=News'}
          alt={news.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip
              label={news.source}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <ScheduleIcon sx={{ fontSize: 14, mr: 0.5 }} />
              <Typography variant="caption">
                {formatDate(news.publishedAt)}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3.2em',
            }}
          >
            {news.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '4.8em',
            }}
          >
            {news.summary}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">
              {news.author ? `By ${news.author}` : 'News Article'}
            </Typography>

            <IconButton
              size="small"
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(news.url, '_blank');
              }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
