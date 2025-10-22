import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, Box, CircularProgress, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider, { useAuth } from './contexts/AuthProvider';
import Navbar from './components/Navbar';
import PageWrapper from './components/PageWrapper';
import { WebsiteSchema, PersonSchema } from './components/StructuredData';
import theme from './theme';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

// Protected Route component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Admin Route component
const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="admin">
    {children}
  </ProtectedRoute>
);

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

function AppContent() {
  const location = useLocation();

  return (
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
              path="/faq"
              element={
                <PageWrapper
                  title="FAQ | Sumit - Full Stack Developer"
                  description="Frequently asked questions about my services, technologies, and development process."
                >
                  <FAQ />
                </PageWrapper>
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route
              path="/login"
              element={
                <PageWrapper
                  title="Sign In | Sumit - Full Stack Developer"
                  description="Sign in to your account to access your profile and dashboard."
                >
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PageWrapper
                  title="Reset Password | Sumit - Full Stack Developer"
                  description="Reset your password to regain access to your account."
                >
                  <ForgotPassword />
                </PageWrapper>
              }
            />
            <Route
              path="/signup"
              element={
                <PageWrapper
                  title="Sign Up | Sumit - Full Stack Developer"
                  description="Create a new account to access your profile and dashboard."
                >
                  <Signup />
                </PageWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageWrapper
                    title="My Profile | Sumit - Full Stack Developer"
                    description="View and manage your profile information."
                  >
                    <Profile />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
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
  );
}

// Configure React Query client with caching and persistence
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch on mount if data is fresh - prevent cache issues
      refetchOnReconnect: true, // Refetch when network reconnects
    },
    mutations: {
      retry: false, // Don't retry mutations by default
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;