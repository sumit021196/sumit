import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, createTheme, Box, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import { WebsiteSchema, PersonSchema } from './components/StructuredData';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/contact'));

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

// Loading component for Suspense fallback
const Loading = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '80vh' 
  }}>
    <CircularProgress />
  </Box>
);

// Page wrapper with animation and SEO
const PageWrapper = ({ children, title, description }) => {
  return (
    <>
      <SEO title={title} description={description} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <WebsiteSchema />
          <PersonSchema />
          <Suspense fallback={<Loading />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route 
                  path="/" 
                  element={
                    <PageWrapper
                      title="Sumit | Full Stack Developer"
                      description="Experienced Full Stack Developer specializing in modern web technologies. Check out my portfolio and projects."
                    >
                      <Home />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/about" 
                  element={
                    <PageWrapper
                      title="About Me | Sumit - Full Stack Developer"
                      description="Learn more about my skills, experience, and journey as a Full Stack Developer."
                    >
                      <About />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <PageWrapper
                      title="My Projects | Sumit - Full Stack Developer"
                      description="Explore my portfolio of web development projects, including full-stack applications and responsive websites."
                    >
                      <Projects />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <PageWrapper
                      title="Contact Me | Sumit - Full Stack Developer"
                      description="Get in touch with me for any inquiries or collaboration opportunities."
                    >
                      <Contact />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    <PageWrapper
                      title="Page Not Found"
                      description="The page you are looking for does not exist."
                    >
                      <Box sx={{ textAlign: 'center', py: 10 }}>
                        <h1>404 - Page Not Found</h1>
                        <p>The page you are looking for does not exist or has been moved.</p>
                      </Box>
                    </PageWrapper>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </Box>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;