import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';

const GithubSection = ({ githubUsername }) => {
  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 4, sm: 6 },
          px: 2
        }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9375rem', sm: '1rem' }
            }}
          >
            Want to see more of my work?
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GitHubIcon />}
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: { xs: 3, sm: 4 },
              py: 1,
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              borderWidth: '1.5px',
              '&:hover': {
                borderWidth: '1.5px',
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
              }
            }}
          >
            View All on GitHub
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default GithubSection;
