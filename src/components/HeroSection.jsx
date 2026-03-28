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
        minHeight: { xs: '65vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 0 },
        background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0f0c29 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(144,202,249,0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
          filter: 'blur(50px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(156,39,176,0.15) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
          filter: 'blur(60px)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ zIndex: 1, position: 'relative' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={0}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    mb: 2,
                    px: 2,
                    py: 0.5,
                    border: '1px solid rgba(144,202,249,0.3)',
                    borderRadius: '20px',
                    color: 'primary.light',
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    backgroundColor: 'rgba(144,202,249,0.05)',
                  }}
                >
                  🚀 Welcome to my digital space
                </Typography>
              </motion.div>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '1.8rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 900,
                  lineHeight: 1.1,
                  mb: { xs: 0.5, sm: 2 },
                  color: '#ffffff',
                }}
              >
                Hi, I'm{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(90deg, #90caf9 0%, #b39ddb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Sumit
                </Box>
              </Typography>
              <motion.div
                custom={1}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
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
                      fontSize: isMobile ? '1rem' : '1.3rem',
                      fontWeight: 500,
                      color: '#e0e0e0',
                      height: isMobile ? '1.2rem' : '2.2rem',
                      display: 'block',
                    }}
                  />
                </Box>
              </motion.div>
              <motion.div
                custom={2}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: { xs: '0.9rem', sm: '1.2rem' },
                    mb: { xs: 2, sm: 5 },
                    maxWidth: '600px',
                    lineHeight: { xs: 1.4, sm: 1.6 }
                  }}
                >
                  Crafting modern, scalable, and exceptional digital experiences through clean code and innovative design. Let's turn ideas into reality.
                </Typography>
              </motion.div>
              <motion.div
                custom={3}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap', mb: { xs: 1.5, sm: 4 } }}>
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
              </motion.div>
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
                    custom={index + 4}
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
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  perspective: '1000px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(144,202,249,0.2) 0%, rgba(156,39,176,0.2) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px) rotateX(5deg) rotateY(-5deg)' },
                      '50%': { transform: 'translateY(-20px) rotateX(-5deg) rotateY(5deg)' },
                    }
                  }}
                >
                  <CodeIcon sx={{ fontSize: 100, color: 'rgba(255,255,255,0.8)' }} />
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
