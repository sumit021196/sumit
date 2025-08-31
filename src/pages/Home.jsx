import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
    image: 'https://source.unsplash.com/random/600x400?ecommerce',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    image: 'https://source.unsplash.com/random/600x400?task',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A modern portfolio website showcasing creative work and skills.',
    image: 'https://source.unsplash.com/random/600x400?portfolio',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Preload images for better performance
    projects.forEach(project => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      {/* Document title and meta tags are set in index.html */}

      <CssBaseline />
      
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sumit Meshram
          </Typography>
          <Button color="inherit" onClick={handleSignUp}>Sign Up</Button>
        </Toolbar>
      </AppBar>

      <Box component="main">
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            pt: 15,
            pb: 15,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Sumit Meshram
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
              Full Stack Developer | Tech Enthusiast
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={handleSignUp}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
          </Container>
        </Box>

        {/* Projects Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: 6,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '4px',
                background: theme.palette.primary.main,
                margin: '16px auto 0',
                borderRadius: '2px',
              },
            }}
          >
            My Projects
          </Typography>
          
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Sumit Meshram. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;
