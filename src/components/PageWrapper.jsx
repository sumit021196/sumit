import React from 'react';
import { motion } from 'framer-motion';
import SEO from './SEO';

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

export default PageWrapper;
