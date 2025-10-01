import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

const ProjectCard = ({ project, onOpen }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover="hover"
      style={{ height: '100%' }}
    >
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
        }
      }}>
        <Box 
          onClick={() => onOpen(project)}
          sx={{ 
            cursor: 'pointer', 
            position: 'relative',
            pt: '56.25%', // 16:9 aspect ratio
            overflow: 'hidden'
          }}
        >
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{
                fontWeight: 600,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {project.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption">{project.stars}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <ForkRightIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption">{project.forks}</Typography>
              </Box>
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '60px'
            }}
          >
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, minHeight: '32px' }}>
            {project.technologies.map((tech, index) => (
              <Chip 
                key={index}
                label={tech}
                size="small"
                sx={{
                  borderRadius: 1,
                  bgcolor: 'action.selected',
                  color: 'text.primary',
                  fontSize: '0.7rem',
                  height: '24px'
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
            <Button
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              startIcon={<OpenInNewIcon fontSize="small" />}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                flex: 1,
                py: 0.8,
                textTransform: 'none',
                borderRadius: 1,
                fontWeight: 500
              }}
            >
              View Code
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
