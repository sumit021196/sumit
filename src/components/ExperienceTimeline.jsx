import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { School as SchoolIcon, Work as WorkIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: 'Developing and maintaining web applications using modern technologies.',
    type: 'work',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'WebCraft Studios',
    period: '2020 - 2022',
    description: 'Built responsive user interfaces and collaborated with design teams.',
    type: 'work',
  },
  {
    id: 3,
    title: 'Computer Science Degree',
    company: 'University of Technology',
    period: '2016 - 2020',
    description: 'Specialized in Web Development and Software Engineering.',
    type: 'education',
  },
];

const ExperienceTimeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getIcon = (type) => {
    switch (type) {
      case 'education':
        return <SchoolIcon color="primary" />;
      case 'work':
      default:
        return <WorkIcon color="secondary" />;
    }
  };

  return (
    <Timeline position={isMobile ? 'right' : 'alternate'} sx={{ p: 0, m: 0 }}>
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TimelineItem>
            {!isMobile && (
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                {exp.period}
              </TimelineOppositeContent>
            )}
            <TimelineSeparator>
              <TimelineDot color={exp.type === 'education' ? 'primary' : 'secondary'}>
                {getIcon(exp.type)}
              </TimelineDot>
              {index < experiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
                <Typography variant="h6" component="h3">
                  {exp.title}
                </Typography>
                <Typography variant="subtitle2" color="primary" sx={{ mt: 0.5, mb: 1 }}>
                  {exp.company}
                </Typography>
                {isMobile && (
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    {exp.period}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {exp.description}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </motion.div>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeline;
