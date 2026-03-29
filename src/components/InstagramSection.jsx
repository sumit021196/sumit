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

        <Grid container spacing={2} justifyContent="center">
          {/* Example Embed placeholders. Without a specific post URL, embedding entire profiles is not natively supported by Instagram iframe without custom widgets. So we use a styled card directing to the profile */}
          <Grid item xs={12} sm={8} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(93, 64, 55, 0.1)',
                  borderRadius: '16px',
                  padding: { xs: 3, sm: 4 },
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(93, 64, 55, 0.15)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    p: '3px'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid white'
                    }}
                  >
                    <img
                      src="/profilepic.webp"
                      alt="Profile"
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/logo192.png'; }}
                    />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  @sumit_meshram_02
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Full Stack Developer | Content Creator
                </Typography>

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
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      opacity: 0.9,
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  View Profile & Reels
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InstagramSection;
