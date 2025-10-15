import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ContactHeader = () => (
  <Box textAlign="center" mb={{ xs: 6, md: 10 }}>
    <Typography
      variant="h3"
      component={motion.h2}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        fontWeight: 800,
        mb: 2,
        background: 'linear-gradient(45deg, #0f172a 30%, #c9a87c 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: { xs: '2.2rem', md: '3rem' },
        letterSpacing: '-0.5px',
        lineHeight: 1.2
      }}
    >
      Let's Work Together
    </Typography>
    <Typography
      variant="h6"
      component={motion.p}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      sx={{ 
        maxWidth: '700px', 
        mx: 'auto',
        fontSize: { xs: '1.1rem', md: '1.25rem' },
        color: '#2d3748',
        opacity: 0.9,
        fontWeight: 400,
        lineHeight: 1.6
      }}
    >
      Have a project in mind or want to chat? I'd love to hear from you and discuss how we can create something amazing together.
    </Typography>
  </Box>
);

export default ContactHeader;
