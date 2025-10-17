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
  );
};

export default ServicesSection;
