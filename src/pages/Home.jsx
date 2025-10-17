import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import NewsSection from '../components/NewsSection';

const Home = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <HeroSection />
      <ServicesSection />
      <NewsSection />
    </Box>
  );
};

export default Home;