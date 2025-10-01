import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const skills = [
  { name: 'Frontend', level: 90, icon: <CodeIcon /> },
  { name: 'Backend', level: 80, icon: <CodeIcon /> },
  { name: 'UI/UX Design', level: 75, icon: <DesignServicesIcon /> },
  { name: 'Mobile Development', level: 70, icon: <MobileFriendlyIcon /> },
];

const experiences = [
  {
    role: 'Senior Frontend Developer',
    company: 'TechCorp',
    period: '2022 - Present',
    description: 'Leading frontend development team and implementing modern web applications.',
    icon: <WorkIcon />,
  },
  {
    role: 'Full Stack Developer',
    company: 'WebSolutions Inc.',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple web applications using modern technologies.',
    icon: <WorkIcon />,
  },
  {
    role: 'Computer Science Degree',
    company: 'University of Technology',
    period: '2015 - 2019',
    description: 'Bachelor of Engineering in Electronics and Comuunication.',
    icon: <SchoolIcon />,
  },
];

const About = () => {
  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
      }}
      id="about"
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            Let me introduce myself and my journey in the world of technology.
          </Typography>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  mb: { xs: 4, md: 0 },
                  textAlign: 'center',
                }}
              >
                <Avatar
                  src="/profilepic.webp"
                  alt="Sumit"
                  sx={{
                    width: 250,
                    height: 250,
                    mx: 'auto',
                    border: '5px solid white',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Who Am I?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
                I'm a passionate Full Stack Developer with over 4 years of experience in building modern web applications.
                My journey in programming started when I was in college, and since then, I've been fascinated by the
                endless possibilities of technology.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
                I specialize in creating responsive, user-friendly interfaces and robust backend systems. I'm always
                eager to learn new technologies and methodologies to stay ahead in this ever-evolving field.
              </Typography>

              <Grid container spacing={3} sx={{ mt: 4 }}>
                {skills.map((skill, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.main',
                            mr: 1,
                          }}
                        >
                          {skill.icon}
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {skill.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          {skill.level}%
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 8,
                          bgcolor: 'grey.200',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${skill.level}%`,
                            bgcolor: 'primary.main',
                            borderRadius: 2,
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Experience & Education
          </Typography>

          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {exp.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                        {exp.role}
                      </Typography>
                      <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 500 }}>
                        {exp.company} • {exp.period}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, pl: 6 }}>
                    {exp.description}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
