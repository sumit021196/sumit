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
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: 2,
        }}
        onClick={() => window.open(news.url, '_blank')}
      >
        <CardMedia
          component="img"
          height="140"
          image={news.image || 'https://via.placeholder.com/400x200/3f51b5/ffffff?text=News'}
          alt={news.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
        />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              label={news.source}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ 
                height: 20,
                '& .MuiChip-label': {
                  px: 0.8,
                  fontSize: '0.65rem',
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.7rem' }}>
              <ScheduleIcon sx={{ fontSize: '0.8rem', mr: 0.3, opacity: 0.7 }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                {formatDate(news.publishedAt)}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="subtitle2"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
              fontSize: '0.9rem'
            }}
          >
            {news.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.8em',
              fontSize: '0.8rem',
              lineHeight: 1.4,
              opacity: 0.9
            }}
          >
            {news.summary}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 'auto',
            pt: 0.5,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
              {news.author ? `By ${news.author}` : 'News Article'}
            </Typography>

            <IconButton
              size="small"
              sx={{
                color: 'primary.main',
                p: 0.5,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'primary.dark',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(news.url, '_blank');
              }}
            >
              <OpenInNewIcon fontSize="inherit" sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
