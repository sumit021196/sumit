import React from 'react';
import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import InstagramIcon from '@mui/icons-material/Instagram';

const InstagramSection = () => {
  // Using an embed code for a generic reel format since we can't scrape Instagram directly.
  // We'll showcase a couple of placeholder slots that link directly to the profile.
  const profileUrl = "https://www.instagram.com/sumit_meshram_02/";

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 3, md: 6 },
        backgroundColor: 'background.default',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 2, sm: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'primary.dark',
                fontWeight: 600,
                letterSpacing: 1.5,
                display: 'inline-block',
                mb: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Socials
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, sm: 2 },
                background: 'linear-gradient(45deg, #5D4037 30%, #A1887F 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.4rem', sm: '2rem' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <InstagramIcon sx={{ fontSize: { xs: '1.6rem', sm: '2.5rem' }, color: '#E1306C' }} />
              Latest Reels
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                mb: 3
              }}
            >
              Check out my latest content and updates on Instagram. Follow me for more!
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* Instagram dynamically loads embedded posts via an iframe. Add specific post IDs here if needed */}
          {/* Using blockquotes with the Instagram script is the official way, but generic iframes are safer for React without external script injections */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '350px',
                  mx: 'auto',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(93, 64, 55, 0.15)',
                  background: '#fff'
                }}
              >
                <iframe
                  src="https://www.instagram.com/reel/C2_dWeYxT_i/embed"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  style={{ border: 'none', background: 'white' }}
                  title="Instagram Reel 1"
                ></iframe>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '350px',
                  mx: 'auto',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(93, 64, 55, 0.15)',
                  background: '#fff'
                }}
              >
                <iframe
                  src="https://www.instagram.com/reel/C0_y5M8PZ8C/embed"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  style={{ border: 'none', background: 'white' }}
                  title="Instagram Reel 2"
                ></iframe>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Button
            variant="contained"
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<InstagramIcon />}
            sx={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#fff',
              borderRadius: '50px',
              px: 4,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(225, 48, 108, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                opacity: 0.9,
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(225, 48, 108, 0.4)',
              }
            }}
          >
            Follow @sumit_meshram_02
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default InstagramSection;
