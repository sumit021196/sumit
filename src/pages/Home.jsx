import React from 'react';
import { Box, Container, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import NewsSection from '../components/NewsSection';
import StockTicker from '../components/StockTicker/StockTicker';

const Home = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: 'background.default' }}>
      <HeroSection />

      {/* Stock Ticker directly below Hero for immediate live feel */}
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(15,12,41,0.5)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <StockTicker autoPlay={true} showHeader={false} />
          </motion.div>
        </Container>
      </Box>

      {/* Services Section with a fresh background gradient */}
      <Box sx={{ position: 'relative', py: { xs: 4, md: 8 }, background: 'linear-gradient(180deg, rgba(15,12,41,0) 0%, rgba(36,36,62,0.4) 100%)' }}>
        <ServicesSection />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* News Section */}
      <Box sx={{ position: 'relative', py: { xs: 4, md: 8 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <NewsSection />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;