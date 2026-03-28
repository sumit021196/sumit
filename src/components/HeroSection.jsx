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
          opacity: 0.25,
        }
      }}
    >
      <img
        src="/cover.jpg"
        alt="Background"
        className="hero-bg-image"
      />
      <Container maxWidth="lg" sx={{ zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={0}
            >
              <Box
                sx={{
                  background: 'rgba(93, 64, 55, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: { xs: '20px', sm: '40px' },
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    display: 'inline-block',
                    mb: 1,
                    color: '#FFF8DC', // Cream
                    fontWeight: 600,
                    letterSpacing: 2,
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                  }}
                >
                  Hello, I'm
                </Typography>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.2rem', sm: '3.5rem', md: '4.5rem' },
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
                <Box sx={{ mb: { xs: 2, sm: 4 } }}>
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
                      fontSize: isMobile ? '1.1rem' : '1.5rem',
                      fontWeight: 500,
                      color: '#EFEBE9',
                      height: isMobile ? '1.5rem' : '2.2rem',
                      display: 'block',
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '0.95rem', sm: '1.2rem' },
                    mb: { xs: 3, sm: 5 },
                    maxWidth: '600px',
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                I build exceptional digital experiences with modern technologies and clean code.
                Let's create something amazing together!
              </Typography>
                <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap', mb: { xs: 3, sm: 5 }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <StyledButton
                    component={Link}
                    to="/projects"
                    variant="contained"
                    size={isMobile ? "medium" : "large"}
                    startIcon={<CodeIcon />}
                    sx={{
                      backgroundColor: '#5D4037',
                      color: '#FFF8DC',
                      '&:hover': {
                        backgroundColor: '#8D6E63'
                      }
                    }}
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
                      color: '#FFF8DC',
                      borderColor: 'rgba(255, 248, 220, 0.3)',
                      '&:hover': {
                        borderColor: '#FFF8DC',
                        backgroundColor: 'rgba(255, 248, 220, 0.1)'
                      }
                    }}
                  >
                    Contact Me
                  </StyledButton>
                </Box>
                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
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
                          color: '#FFF8DC',
                          backgroundColor: 'rgba(93, 64, 55, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(93, 64, 55, 0.8)',
                          },
                        }}
                        aria-label={social.label}
                      >
                        {React.cloneElement(social.icon, { fontSize: 'large' })}
                      </IconButton>
                    </motion.a>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
