import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const socialLinks = [
  {
    icon: <LinkedInIcon />,
    url: 'https://linkedin.com',
    label: 'LinkedIn'
  },
  {
    icon: <GitHubIcon />,
    url: 'https://github.com',
    label: 'GitHub'
  },
  {
    icon: <TwitterIcon />,
    url: 'https://twitter.com',
    label: 'Twitter'
  }
];

const SocialLinks = () => (
  <Box>
    <Typography 
      variant="subtitle1" 
      sx={{ 
        fontWeight: 700, 
        mb: 3, 
        textAlign: 'center',
        color: '#0f172a',
        letterSpacing: '1px',
        fontSize: '1rem',
        textTransform: 'uppercase'
      }}
    >
      Follow Me On
    </Typography>
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',
      gap: { xs: 1.5, sm: 2 },
      flexWrap: 'wrap'
    }}>
      {socialLinks.map((social, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <IconButton
            component="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: { xs: 44, sm: 48 },
              height: { xs: 44, sm: 48 },
              backgroundColor: 'rgba(15, 23, 42, 0.03)',
              color: '#0f172a',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              '&:hover': {
                backgroundColor: '#0f172a',
                color: '#fff',
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-label={social.label}
          >
            {React.cloneElement(social.icon, { 
              sx: { 
                fontSize: { xs: '1.4rem', sm: '1.5rem' },
                transition: 'all 0.3s ease'
              } 
            })}
          </IconButton>
        </motion.div>
      ))}
    </Box>
  </Box>
);

export default SocialLinks;
