import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  IconButton,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

// Styled Components
const StyledButton = ({ children, ...props }) => (
  <Button
    {...props}
    sx={{
      padding: { xs: '10px 24px', sm: '12px 28px' },
      borderRadius: '50px',
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: (theme) => `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`
      },
      ...props.sx
    }}
  >
    {children}
  </Button>
);

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      },
    }),
  };

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/yourusername' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { icon: <EmailIcon />, label: 'Email', url: 'mailto:your.email@example.com' }
  ];

  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: '70vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #5D4037 0%, #A1887F 50%, #8D6E63 100%)',
          zIndex: -3,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/grid-pattern.svg")',
          opacity: 0.1,
          zIndex: -1,
        },
        '& .hero-bg-image': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          opacity: 0.4,
        }
      }}
    >
      <img
        src="/profile.jpg"
        alt="Background"
        className="hero-bg-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://uqdprscrscskfadbsvxz.supabase.co/storage/v1/object/public/images/leh/khardungla.jpg';
        }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={0}
            >
              <Typography
                variant="overline"
                sx={{
                  display: 'inline-block',
                  mb: 1,
                  color: 'secondary.light',
                  fontWeight: 600,
                  letterSpacing: 2,
                }}
              >
                Hello, I'm
              </Typography>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '1.8rem', sm: '3rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: { xs: 1, sm: 2 },
                  background: 'linear-gradient(45deg, #FFF8DC 30%, #D7CCC8 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sumit
              </Typography>
              <Box sx={{ mb: { xs: 1.5, sm: 4 } }}>
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    1500,
                    'UI/UX Enthusiast',
                    1500,
                    'Problem Solver',
                    1500,
                    'Tech Geek',
                    1500,
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    fontSize: isMobile ? '0.9rem' : '1.3rem',
                    fontWeight: 500,
                    color: '#EFEBE9',
                    height: isMobile ? '1.2rem' : '2.2rem',
                    display: 'block',
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: { xs: '0.85rem', sm: '1.1rem' },
                  mb: { xs: 2, sm: 4 },
                  maxWidth: '600px',
                }}
              >
                I build exceptional digital experiences with modern technologies and clean code.
                Let's create something amazing together!
              </Typography>
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap', mb: { xs: 2, sm: 4 } }}>
                <StyledButton
                  component={Link}
                  to="/projects"
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  startIcon={<CodeIcon />}
                >
                  View My Work
                </StyledButton>
                <StyledButton
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size={isMobile ? "medium" : "large"}
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Contact Me
                </StyledButton>
              </Box>
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    custom={index + 2}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                      aria-label={social.label}
                    >
                      {React.cloneElement(social.icon, { fontSize: 'large' })}
                    </IconButton>
                  </motion.a>
                ))}
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* This grid item is intentionally left empty for layout purposes */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
