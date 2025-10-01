import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';

const ProjectDialog = ({ open, project, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          [theme.breakpoints.down('sm')]: {
            m: 1,
            width: 'calc(100% - 16px)'
          }
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {project.title}
        </Typography>
        <IconButton 
          onClick={onClose}
          aria-label="close"
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', pt: '56.25%', width: '100%', overflow: 'hidden' }}>
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 1 }}>
                Project Overview
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3, whiteSpace: 'pre-line' }}>
                {project.details}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: 'action.selected',
                        color: 'text.primary',
                        fontWeight: 500,
                        px: 1
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ 
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 20
              }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <CodeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {project.language}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                  <Typography variant="body2">
                    Last updated on {project.updated}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                  <StarIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                  <Typography variant="body2">
                    {project.stars} stars
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, color: 'text.secondary' }}>
                  <ForkRightIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                  <Typography variant="body2">
                    {project.forks} forks
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{ mb: 1.5, py: 1 }}
                >
                  View on GitHub
                </Button>

                {project.demo && (
                  <Button
                    fullWidth
                    variant="outlined"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<OpenInNewIcon />}
                    sx={{ py: 1 }}
                  >
                    Live Demo
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
