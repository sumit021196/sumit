import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, Box, CircularProgress, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import { WebsiteSchema, PersonSchema } from './components/StructuredData';
import theme from './theme';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/contact'));

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