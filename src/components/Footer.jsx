import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Facebook, Twitter, LinkedIn, GitHub, Email } from '@mui/icons-material';

const Footer = ({ isMobile }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        py: isMobile ? 4 : 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Sumit Meshram
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Full Stack Developer passionate about creating efficient, scalable, and user-friendly applications.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <IconButton 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                color="inherit"
                aria-label="GitHub"
              >
                <GitHub />
              </IconButton>
              <IconButton 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                color="inherit"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                href="mailto:your.email@example.com" 
                color="inherit"
                aria-label="Email"
              >
                <Email />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ width: 'fit-content' }}>
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover" sx={{ width: 'fit-content' }}>
                About
              </Link>
              <Link href="/projects" color="inherit" underline="hover" sx={{ width: 'fit-content' }}>
                Projects
              </Link>
              <Link href="/contact" color="inherit" underline="hover" sx={{ width: 'fit-content' }}>
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>Email:</strong> your.email@example.com
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> City, Country
              </Typography>
              <Typography variant="body2">
                <strong>Availability:</strong> Open for opportunities
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box 
          sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            opacity: 0.8
          }}
        >
          <Typography variant="body2">
            © {currentYear} Sumit Meshram. All rights reserved.
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1, fontSize: '0.75rem' }}>
            Built with React, Material-UI, and ❤️
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
