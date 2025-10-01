import React from 'react';
import { Box, Button, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/cover.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.4)',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        width: '100%',
        py: 12,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
        color: 'white'
      }}>
      <Container maxWidth="md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Hi, I'm Sumit
          </Typography>
          
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h2"
            color="white"
            sx={{ mb: 4, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                1000,
                'Web Enthusiast',
                1000,
                'Problem Solver',
                1000,
                'Tech Lover',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
            />
          </Typography>

          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            color="rgba(255, 255, 255, 0.9)"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto', lineHeight: 1.8, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
          >
            I build exceptional digital experiences with modern technologies and clean code.
            Currently focused on creating impactful web applications that make a difference.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 8 }}>
            <Button
              component={Link}
              to="/projects"
              variant="contained"
              size="large"
              startIcon={<CodeIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: isMobile ? '0.9rem' : '1rem',
              }}
            >
              View My Work
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              startIcon={<RocketLaunchIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: isMobile ? '0.9rem' : '1rem',
              }}
            >
              Contact Me
            </Button>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 8,
          }}
        >
          {[
            {
              icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Web Development',
              description: 'Building responsive and performant web applications using modern technologies.',
            },
            {
              icon: <BuildIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Problem Solving',
              description: 'Analyzing complex problems and providing efficient, scalable solutions.',
            },
            {
              icon: <RocketLaunchIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
              title: 'Continuous Learning',
              description: 'Always exploring new technologies and best practices to stay ahead.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
      </Box>
    </Box>
  );
};

export default Home;
