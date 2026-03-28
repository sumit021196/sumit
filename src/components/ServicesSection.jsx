import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

// Styled Components
const ServiceCard = ({ icon, title, description, ...props }) => (
  <Paper
    elevation={0}
    {...props}
    sx={{
      padding: { xs: 1, sm: 2 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '10px',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '50%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        transform: 'skewX(-20deg)',
        transition: 'all 0.6s ease',
      },
      '&:hover': {
        transform: 'translateY(-10px) scale(1.02)',
        boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
        borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
        '&::before': {
          left: '200%',
        }
      },
      '& .MuiSvgIcon-root': {
        fontSize: { xs: '1.5rem', sm: '2.2rem' },
        mb: { xs: 0.5, sm: 1 },
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      ...(props.sx || {})
    }}
  >
    {React.cloneElement(icon, { 
      sx: { 
        fontSize: { xs: '1.8rem', sm: '2.5rem' },
        mb: { xs: 0.5, sm: 1 },
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      } 
    })}
    <Typography 
      variant="subtitle1" 
      component="h3" 
      gutterBottom 
      sx={{ 
        fontWeight: 600, 
        color: 'text.primary',
        fontSize: { xs: '0.85rem', sm: '1rem' },
        mt: { xs: 0.5, sm: 1 },
        mb: { xs: 0.5, sm: 1 }
      }}
    >
      {title}
    </Typography>
    <Typography 
      variant="body2" 
      color="text.secondary"
      sx={{
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        lineHeight: { xs: 1.3, sm: 1.5 }
      }}
    >
      {description}
    </Typography>
  </Paper>
);

const ServicesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  return (
    <Box component="section" id="services" sx={{ position: 'relative', zIndex: 2 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 2, sm: 4, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: 1.5,
                display: 'inline-block',
                mb: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              What I Do
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: { xs: 0.5, sm: 1 },
                background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.2rem', sm: '2rem' },
                lineHeight: 1.2
              }}
            >
              My Expertise
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                px: { xs: 1, sm: 0 },
                opacity: 0.9
              }}
            >
              I offer a wide range of services to help you build and grow your digital presence
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {services.map((service, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
