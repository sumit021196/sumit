import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Grid,
  Paper,
  IconButton,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Styled Components
const StyledButton = ({ children, ...props }) => (
  <Button
    {...props}
    sx={{
      padding: '12px 32px',
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

const ServiceCard = ({ icon, title, description, ...props }) => (
  <Paper
    elevation={0}
    {...props}
    sx={{
      padding: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
        borderColor: (theme) => theme.palette.primary.main,
      },
      '& .MuiSvgIcon-root': {
        fontSize: '3.5rem',
        mb: 2,
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      ...props.sx
    }}
  >
    {icon}
    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const Home = () => {
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

  const services = [
    {
      icon: <CodeIcon />,
      title: 'Web Development',
      description: 'Building responsive and scalable web applications using modern technologies like React, Next.js, and Node.js.'
    },
    {
      icon: <DesignServicesIcon />,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces with a focus on user experience and accessibility.'
    },
    {
      icon: <RocketLaunchIcon />,
      title: 'Performance',
      description: 'Optimizing applications for maximum speed, efficiency, and smooth user interactions.'
    },
    {
      icon: <BuildIcon />,
      title: 'Problem Solving',
      description: 'Analyzing complex problems and providing efficient, scalable solutions with clean code.'
    }
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/yourusername' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { icon: <EmailIcon />, label: 'Email', url: 'mailto:your.email@example.com' }
  ];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            zIndex: -1,
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
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
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
                    mb: 2,
                    color: 'primary.main',
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
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 2,
                    background: 'linear-gradient(45deg, #fff 30%, #90caf9 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Sumit
                </Typography>
                <Box sx={{ mb: 4 }}>
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
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      fontWeight: 500,
                      color: '#e0e0e0',
                      height: '2.5rem',
                      display: 'block',
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.1rem',
                    mb: 4,
                    maxWidth: '600px',
                  }}
                >
                  I build exceptional digital experiences with modern technologies and clean code.
                  Let's create something amazing together!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <StyledButton
                    component={Link}
                    to="/projects"
                    variant="contained"
                    size="large"
                    startIcon={<CodeIcon />}
                  >
                    View My Work
                  </StyledButton>
                  <StyledButton
                    component={Link}
                    to="/contact"
                    variant="outlined"
                    size="large"
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
                <Box sx={{ display: 'flex', gap: 2 }}>
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
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      paddingBottom: '125%',
                    },
                    '& img': {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  }}
                >
                  <img 
                    src="/profile.jpg" 
                    alt="Sumit - Full Stack Developer"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x600/0f0c29/ffffff?text=Sumit';
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
          <Box
            sx={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white',
              animation: 'bounce 2s infinite',
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main,
              },
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0) translateX(-50%)',
                },
                '40%': {
                  transform: 'translateY(-20px) translateX(-50%)',
                },
                '60%': {
                  transform: 'translateY(-10px) translateX(-50%)',
                },
              },
            }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
              });
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>Scroll Down</Typography>
            <ArrowDownwardIcon />
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        component="section"
        id="services"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'background.paper',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, rgba(15,12,41,1), rgba(15,12,41,0))',
            transform: 'translateY(-99%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: 2,
                  display: 'inline-block',
                  mb: 1,
                }}
              >
                What I Do
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                }}
              >
                My Expertise
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: '700px', mx: 'auto' }}
              >
                I offer a wide range of services to help you build and grow your digital presence
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard>
                    {service.icon}
                    <Typography variant="h6" component="h3" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </ServiceCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;