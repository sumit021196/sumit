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
      padding: { xs: 1.5, sm: 2 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        background: 'rgba(255, 255, 255, 0.05)',
      },
      '& .MuiSvgIcon-root': {
        fontSize: { xs: '1.8rem', sm: '2.2rem' },
        mb: { xs: 0.75, sm: 1 },
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      ...(props.sx || {})
    }}
  >
    {React.cloneElement(icon, { 
      sx: { 
        fontSize: { xs: '2rem', sm: '2.5rem' },
        mb: { xs: 0.75, sm: 1 },
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
        fontSize: { xs: '0.95rem', sm: '1rem' },
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
        fontSize: { xs: '0.8rem', sm: '0.875rem' },
        lineHeight: 1.5
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
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: 'background.paper',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(15,12,41,1), rgba(15,12,41,0))',
          transform: 'translateY(-99%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 3, sm: 4, md: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                fontSize: { xs: '1.5rem', sm: '2rem' },
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

        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          {services.map((service, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
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
