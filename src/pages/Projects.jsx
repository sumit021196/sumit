import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Skeleton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import InfiniteScroll from 'react-infinite-scroll-component';

// Format GitHub repository data to match our project structure
const formatRepoData = (repo) => ({
  id: repo.id,
  title: repo.name.replace(/-/g, ' ').replace(/(^|\s)\S/g, t => t.toUpperCase()),
  description: repo.description || 'No description provided.',
  image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
  technologies: repo.topics && repo.topics.length > 0 
    ? repo.topics.slice(0, 3).map(topic => topic.charAt(0).toUpperCase() + topic.slice(1))
    : ['GitHub', 'Code'],
  github: repo.html_url,
  demo: repo.homepage || `https://github.com/${repo.full_name}`,
  details: repo.description || 'No detailed description available.',
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  language: repo.language || 'Code',
  updated: new Date(repo.updated_at).toLocaleDateString(),
  fullData: repo
});

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);

  const GITHUB_USERNAME = 'sumit021196'; // Your GitHub username
  const PER_PAGE = 9;

  const fetchRepos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${PER_PAGE}&page=${page}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setRepos(prevRepos => [...new Map([...prevRepos, ...data].map(item => [item.id, item])).values()]);
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
      }}
      id="projects"
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
            My Projects
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
          </Typography>
        </motion.div>

        {loading && repos.length === 0 ? (
          // Loading skeleton
          <Grid container spacing={4}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Skeleton variant="rectangular" height={200} animation="wave" />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton animation="wave" />
                  <Skeleton width="60%" animation="wave" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <InfiniteScroll
            dataLength={repos.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            }
            endMessage={
              <Typography variant="body1" align="center" sx={{ my: 4, color: 'text.secondary' }}>
                You've seen all my public repositories!
              </Typography>
            }
            style={{ overflow: 'visible' }}
          >
            <Grid container spacing={4}>
              {repos.map((repo, index) => {
                const project = formatRepoData(repo);
                return (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box 
                    onClick={() => handleOpen(project)}
                    sx={{ cursor: 'pointer', position: 'relative' }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                      }}
                    />
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Typography variant="h6" color="white" sx={{ fontWeight: 600 }}>
                        Click to Preview
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                      <Button
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<GitHubIcon />}
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          fontWeight: 500,
                          flex: 1,
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                          }
                        }}
                      >
                        View Code
                      </Button>
                      <Button
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          fontWeight: 500,
                          flex: 1,
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }}
                      >
                        Live Demo
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
              )})}
            </Grid>
          </InfiniteScroll>
        )}

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Want to see more of my work?
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GitHubIcon />}
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: 'none',
              borderRadius: '50px',
              px: 4,
              fontWeight: 600,
            }}
          >
            View GitHub Profile
          </Button>
        </Box>
      </Container>

      {/* Project Preview Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {selectedProject.title}
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedProject.image}
                    alt={selectedProject.title}
                    sx={{ borderRadius: 1, objectFit: 'cover' }}
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<StarIcon fontSize="small" />}
                      label={`${selectedProject.stars || 0} Stars`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<ForkRightIcon fontSize="small" />}
                      label={`${selectedProject.forks || 0} Forks`}
                      size="small"
                      variant="outlined"
                    />
                    {selectedProject.language && (
                      <Chip
                        label={selectedProject.language}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Last updated: {selectedProject.updated}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Repository Details
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedProject.details}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {selectedProject.technologies.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                          fontSize: '0.7rem',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                variant="outlined"
                sx={{ textTransform: 'none' }}
              >
                View on GitHub
              </Button>
              {selectedProject.demo && !selectedProject.demo.includes('github.com') && (
                <Button
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                  sx={{ textTransform: 'none', ml: 1 }}
                >
                  Live Demo
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Projects;
