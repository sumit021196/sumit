import React from 'react';
import { Box, Typography, Divider} from '@mui/material';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const contactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'Email',
    text: 'sumit@example.com',
    href: 'mailto:sumit@example.com'
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'Phone',
    text: '+91 78698 14754',
    href: 'tel:+917869814754'
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'Location',
    text: 'Mumbai, India',
    href: 'https://maps.google.com'
  }
];

const ContactInfo = () => (
  <Box sx={{ mb: 5 }}>
    {contactInfo.map((item, index) => (
      <motion.div 
        key={index}
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{ marginBottom: '1rem' }}
      >
        <Box 
          component="a"
          href={item.href}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            textDecoration: 'none',
            color: 'text.primary',
            backgroundColor: alpha('#0f172a', 0.03),
            border: '1px solid rgba(15, 23, 42, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: alpha('#0f172a', 0.05),
              transform: 'translateX(5px)',
              borderColor: 'rgba(201, 168, 124, 0.3)',
              boxShadow: '0 5px 20px rgba(15, 23, 42, 0.05)',
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: 'rgba(201, 168, 124, 0.1)',
            mr: 2,
            flexShrink: 0,
            transition: 'all 0.3s ease'
          }}>
            {React.cloneElement(item.icon, { 
              sx: { 
                color: '#c9a87c',
                fontSize: '1.5rem'
              } 
            })}
          </Box>
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600, 
                color: '#0f172a',
                mb: 0.5,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#2d3748',
                fontWeight: 500,
                fontSize: '1rem',
                opacity: 0.9
              }}
            >
              {item.text}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    ))}
  </Box>
);

export default ContactInfo;
