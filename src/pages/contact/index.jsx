import { useState } from 'react';
import { Box, Container, Grid, Paper, Snackbar, Alert,Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { alpha } from '@mui/material/styles';

// Components
import ContactHeader from './components/ContactHeader';
import ContactInfo from './components/ContactInfo';
import SocialLinks from './components/SocialLinks';
import ContactForm from './components/ContactForm';

// Icons
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 6, md: 12 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(201, 168, 124, 0.1) 100%),
            url("/grid-pattern.svg")
          `,
          opacity: 0.8,
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <ContactHeader />

        <Grid 
          container 
          spacing={{ xs: 3, md: 6 }}
          component={motion.div} 
          variants={containerVariants} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Info Card */}
          <Grid item xs={12} md={5} component={motion.div} variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 4 },
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 168, 124, 0.15)',
                boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
                  borderColor: 'rgba(201, 168, 124, 0.3)',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.02) 0%, rgba(201, 168, 124, 0.02) 100%)',
                  zIndex: 0,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'rgba(201, 168, 124, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0
                  }}>
                    <ContactMailIcon sx={{ color: '#c9a87c', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" component="h3" sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #0f172a, #c9a87c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '1.5rem', md: '1.75rem' }
                    }}>
                      Contact Information
                    </Typography>
                  </Box>
                </Box>

                <ContactInfo />
                <SocialLinks />
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7} component={motion.div} variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 4 },
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 168, 124, 0.15)',
                boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
                  borderColor: 'rgba(201, 168, 124, 0.3)',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.02) 0%, rgba(201, 168, 124, 0.02) 100%)',
                  zIndex: 0,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'rgba(201, 168, 124, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0
                  }}>
                    <SendIcon sx={{ color: '#c9a87c', fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #0f172a, #c9a87c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.5rem', md: '1.75rem' }
                  }}>
                    Send Me a Message
                  </Typography>
                </Box>

                <ContactForm />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <AnimatePresence>
        {snackbar.open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1400
            }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{
                minWidth: 300,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: 2,
                '& .MuiAlert-message': {
                  fontWeight: 500,
                }
              }}
            >
              {snackbar.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Contact;
