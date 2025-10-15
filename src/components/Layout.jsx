import React from 'react';
import { Box, Container, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title = 'Sumit - Portfolio' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Portfolio of Sumit - Full Stack Developer" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Navbar isMobile={isMobile} />
        <Container
          component="main"
          maxWidth={isSmallScreen ? 'sm' : 'lg'}
          sx={{
            flex: 1,
            py: isMobile ? 2 : 4,
            px: isMobile ? 2 : 4,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {children}
        </Container>
        <Footer isMobile={isMobile} />
      </Box>
    </>
  );
};

export default Layout;
