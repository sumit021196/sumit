import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery, Divider } from '@mui/material';
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
    <Box sx={{ p: 0, m: 0 }}>
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Box sx={{ display: 'flex', mb: 3 }}>
            {/* Timeline dot and connector */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: exp.type === 'education' ? theme.palette.primary.main : theme.palette.secondary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 1,
                }}
              >
                {getIcon(exp.type)}
              </Box>
              {index < experiences.length - 1 && (
                <Box
                  sx={{
                    width: 2,
                    height: 60,
                    backgroundColor: theme.palette.divider,
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Typography variant="h6" component="h3">
                      {exp.title}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ mt: 0.5 }}>
                      {exp.company}
                    </Typography>
                  </Box>
                  {!isMobile && (
                    <Typography variant="caption" color="text.secondary">
                      {exp.period}
                    </Typography>
                  )}
                </Box>
                {isMobile && (
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    {exp.period}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {exp.description}
                </Typography>
              </Paper>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

export default ExperienceTimeline;
