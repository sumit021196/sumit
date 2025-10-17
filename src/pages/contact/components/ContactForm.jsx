import { useState } from 'react';
import { Grid, TextField, Box, Button, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import { alpha } from '@mui/material/styles';
import { submitContactForm } from '../../../supabaseClient';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContactForm(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StyledTextField = ({ name, label, type = 'text', multiline = false, rows = 1 }) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={formData[name]}
      onChange={handleChange}
      required
      variant="outlined"
      size="medium"
      multiline={multiline}
      rows={rows}
      InputProps={{
        sx: {
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(15, 23, 42, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(201, 168, 124, 0.3)',
            boxShadow: '0 0 0 3px rgba(201, 168, 124, 0.1)',
          },
          '&.Mui-focused': {
            borderColor: '#c9a87c',
            boxShadow: '0 0 0 3px rgba(201, 168, 124, 0.2)',
          },
        },
      }}
      InputLabelProps={{
        sx: {
          color: 'rgba(15, 23, 42, 0.8)',
          '&.Mui-focused': {
            color: '#c9a87c',
            fontWeight: 500,
          },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiInputBase-multiline': {
          padding: '16.5px 14px',
        },
      }}
    />
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ marginBottom: 16 }}
          >
            <Alert severity="success" variant="outlined">
              Message sent successfully! I'll get back to you soon.
            </Alert>
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ marginBottom: 16 }}
          >
            <Alert severity="error" variant="outlined">
              Failed to send message. Please try again or contact me directly.
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
          <StyledTextField name="name" label="Your Name" />
        </Grid>
        <Grid item xs={12} sm={6} component={motion.div} variants={itemVariants}>
          <StyledTextField name="email" label="Your Email" type="email" />
        </Grid>
        <Grid item xs={12} component={motion.div} variants={itemVariants}>
          <StyledTextField name="subject" label="Subject" />
        </Grid>
        <Grid item xs={12} component={motion.div} variants={itemVariants}>
          <StyledTextField 
            name="message" 
            label="Your Message" 
            multiline 
            rows={6} 
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          component={motion.div}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          sx={{ mt: 2 }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            startIcon={
              <motion.span
                animate={{
                  x: isSubmitting ? [0, 5, 0] : 0,
                }}
                transition={{
                  repeat: isSubmitting ? Infinity : 1,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <SendIcon />
              </motion.span>
            }
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #0f172a, #c9a87c)',
              color: '#fff',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(201, 168, 124, 0.3)',
              },
              '&.Mui-disabled': {
                background: 'rgba(201, 168, 124, 0.5)',
                color: '#fff',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
