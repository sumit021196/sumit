import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { Box } from '@mui/material';
import SEO from './components/SEO';
import { WebsiteSchema, PersonSchema } from './components/StructuredData';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

// Page components with SEO
const HomePage = () => (
  <>
    <SEO 
      title="Sumit | Full Stack Developer"
      description="Experienced Full Stack Developer specializing in modern web technologies. Check out my portfolio and projects."
    />
    <Home />
  </>
);

const AboutPage = () => (
  <>
    <SEO 
      title="About Me | Sumit - Full Stack Developer"
      description="Learn more about my skills, experience, and journey as a Full Stack Developer."
    />
    <About />
  </>
);

const ProjectsPage = () => (
  <>
    <SEO 
      title="My Projects | Sumit - Full Stack Developer"
      description="Explore my portfolio of web development projects and see my work in action."
    />
    <Projects />
  </>
);

const ContactPage = () => (
  <>
    <SEO 
      title="Contact Me | Sumit - Full Stack Developer"
      description="Get in touch with me for collaboration or any questions. I'd love to hear from you!"
    />
    <Contact />
  </>
);

function App() {
  // AnimatedRoutes component to handle page transitions
  const AnimatedRoutes = () => {
    const location = useLocation();
    
    const pageVariants = {
      initial: {
        opacity: 0,
        y: 20,
      },
      in: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
      out: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
        },
      },
    };

    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <HomePage />
              </motion.div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <AboutPage />
              </motion.div>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <ProjectsPage />
              </motion.div>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
              >
                <ContactPage />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    );
  };

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WebsiteSchema />
        <PersonSchema />
        <Router>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
            overflowX: 'hidden',
          }}>
            <Navbar />
            <Box 
              component="main" 
              sx={{ 
                flex: 1,
                py: 4,
                px: { xs: 2, sm: 3, md: 4 },
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%',
              }}
            >
              <AnimatedRoutes />
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
