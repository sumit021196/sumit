import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

/**
 * BlogCard Component
 * Optimized for mobile with compact design
 */
const BlogCard = ({ post, featured = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card
      component={Link}
      to={`/blog/${post.slug}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        ...(featured && {
          borderTop: '3px solid',
          borderColor: 'primary.main',
        }),
      }}
    >
      {/* Featured Image - Smaller on mobile */}
      <CardMedia
        component="img"
        height={isMobile ? '140' : (featured ? '200' : '180')}
        image={post.featured_image || '/images/blog-placeholder.jpg'}
        alt={post.title}
        sx={{
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: isMobile ? 1.5 : 2,
        '&:last-child': {
          pb: isMobile ? 1.5 : 2
        }
      }}>
        {/* Category Chip - Smaller on mobile */}
        <Box sx={{ mb: isMobile ? 1 : 1.5 }}>
          <Chip
            label={post.category}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ 
              fontWeight: 600, 
              fontSize: isMobile ? '0.6rem' : '0.7rem',
              height: isMobile ? 20 : 24,
              '& .MuiChip-label': {
                px: 0.75
              }
            }}
          />
          {featured && (
            <Chip
              label="Featured"
              size="small"
              color="secondary"
              sx={{ 
                ml: 1, 
                fontWeight: 600, 
                fontSize: isMobile ? '0.6rem' : '0.7rem',
                height: isMobile ? 20 : 24
              }}
            />
          )}
        </Box>

        {/* Title - Smaller on mobile */}
        <Typography
          variant={featured ? 'h4' : 'h5'}
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.3,
            mb: isMobile ? 1 : 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: isMobile 
              ? featured ? '1rem' : '0.95rem'
              : featured ? '1.25rem' : '1.1rem',
          }}
        >
          {post.title}
        </Typography>

        {/* Excerpt - Hidden on mobile, shown on sm and up */}
        {!isMobile && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.85rem',
              lineHeight: 1.5,
            }}
          >
            {post.excerpt}
          </Typography>
        )}

        {/* Author & Meta Info - Compact on mobile */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
            pt: 1.5,
            mt: 'auto',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Author - Simplified on mobile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <Avatar
                src={post.author_image}
                alt={post.author_name}
                sx={{ 
                  width: 28, 
                  height: 28,
                  fontSize: '0.75rem'
                }}
              >
                {post.author_name?.[0]}
              </Avatar>
            )}
            <Box>
              {!isMobile && (
                <Typography 
                  variant="caption" 
                  fontWeight={600} 
                  color="text.primary"
                  sx={{ display: 'block', fontSize: '0.7rem' }}
                >
                  {post.author_name}
                </Typography>
              )}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  fontSize: isMobile ? '0.65rem' : '0.7rem'
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: isMobile ? 12 : 14 }} />
                {formattedDate}
              </Typography>
            </Box>
          </Box>

          {/* Reading Time & Views - Compact on mobile */}
          <Box sx={{ 
            display: 'flex', 
            gap: isMobile ? 0.75 : 1.5, 
            alignItems: 'center',
            ml: 'auto',
            pl: 1
          }}>
            {post.reading_time && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: isMobile ? 12 : 14, color: 'text.secondary' }} />
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }}
                >
                  {post.reading_time}m
                </Typography>
              </Box>
            )}
            {post.views_count > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VisibilityIcon sx={{ fontSize: isMobile ? 12 : 14, color: 'text.secondary' }} />
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }}
                >
                  {post.views_count > 1000 ? `${(post.views_count / 1000).toFixed(1)}k` : post.views_count}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Tags - Smaller and more compact on mobile */}
        {post.tags && post.tags.length > 0 && !isMobile && (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 0.5, 
            mt: 1.5,
            pt: 1,
            borderTop: '1px dashed',
            borderColor: 'divider'
          }}>
            {post.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: '0.6rem',
                  height: 20,
                  '& .MuiChip-label': {
                    px: 0.5,
                    py: 0.25
                  }
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCard;
