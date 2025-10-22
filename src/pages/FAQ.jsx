import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FAQSEO from '../components/FAQSEO';

const faqs = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in modern web technologies including React, Node.js, Express, MongoDB, and Material-UI. I also have experience with Vite for build optimization and Supabase for backend services.'
  },
  {
    question: 'How can I contact you for a project?',
    answer: 'You can reach out through the contact form on this site, or email me directly at sumit@example.com. I typically respond within 24 hours.'
  },
  {
    question: 'Do you offer freelance services?',
    answer: 'Yes, I am available for freelance projects. Please check my projects section for examples of my work and contact me with details about your requirements.'
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on complexity. Simple websites can be completed in 1-2 weeks, while complex applications may take 1-3 months. I provide detailed timelines during consultation.'
  },
  {
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Absolutely! I offer maintenance packages and ongoing support to ensure your application runs smoothly. This includes bug fixes, updates, and feature enhancements.'
  }
];

const FAQ = () => (
  <>
    <FAQSEO faqs={faqs} />
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`faq${index}-content`}
            id={`faq${index}-header`}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  </>
);

export default FAQ;
