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
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3 },
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
      }}
      id="projects"
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              px: 2,
            }}
          >
            My Projects
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            sx={{ 
              mb: { xs: 4, sm: 6 },
              maxWidth: '700px',
              mx: 'auto',
              px: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
          </Typography>
        </motion.div>

        {loading && repos.length === 0 ? (
          // Loading skeleton
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton 
                  variant="rectangular" 
                  height={{ xs: 160, sm: 180, md: 200 }} 
                  animation="wave" 
                  sx={{ borderRadius: 2 }}
                />
                <Box sx={{ pt: 1, px: 1 }}>
                  <Skeleton animation="wave" width="80%" height={24} />
                  <Skeleton animation="wave" width="60%" height={20} sx={{ mt: 1 }} />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                    <Skeleton variant="rounded" width={60} height={24} />
                    <Skeleton variant="rounded" width={50} height={24} />
                  </Box>
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
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  my: 4, 
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                You've seen all my public repositories!
              </Typography>
            }
            style={{ overflow: 'visible' }}
          >
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {repos.map((repo, index) => {
                const project = formatRepoData(repo);
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.5) }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
                          },
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '1px solid rgba(0,0,0,0.05)'
                        }}
                      >
                        <Box 
                          onClick={() => handleOpen(project)}
                          sx={{ 
                            cursor: 'pointer', 
                            position: 'relative',
                            overflow: 'hidden',
                            pt: '56.25%', // 16:9 aspect ratio
                            bgcolor: 'background.paper'
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={project.image}
                            alt={project.title}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
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
                              background: 'rgba(25, 118, 210, 0.8)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              '&:hover': {
                                opacity: 1,
                              },
                            }}
                          >
                            <Typography 
                              variant="subtitle1" 
                              color="white" 
                              sx={{ 
                                fontWeight: 600,
                                p: 1.5,
                                bgcolor: 'rgba(0,0,0,0.3)',
                                borderRadius: 1,
                                backdropFilter: 'blur(4px)'
                              }}
                            >
                              View Details
                            </Typography>
                          </Box>
                        </Box>
                        <CardContent sx={{ 
                          flexGrow: 1, 
                          display: 'flex', 
                          flexDirection: 'column',
                          p: { xs: 2, sm: 2.5 }
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography 
                              variant="h6" 
                              component="h3" 
                              sx={{ 
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                lineHeight: 1.3,
                                pr: 1
                              }}
                            >
                              {project.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                <StarIcon fontSize="small" sx={{ fontSize: '1rem', mr: 0.25 }} />
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{project.stars}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', ml: 1 }}>
                                <ForkRightIcon fontSize="small" sx={{ fontSize: '1rem', mr: 0.25 }} />
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{project.forks}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2, 
                              flexGrow: 1,
                              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                              lineHeight: 1.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {project.description}
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 0.75,
                            mb: 1.5,
                            minHeight: 26
                          }}>
                            {project.technologies.slice(0, 3).map((tech, i) => (
                              <Chip
                                key={i}
                                label={tech}
                                size="small"
                                sx={{
                                  bgcolor: 'action.selected',
                                  color: 'text.primary',
                                  fontSize: '0.65rem',
                                  fontWeight: 500,
                                  height: 24,
                                  '& .MuiChip-label': {
                                    px: 1,
                                    py: 0.5
                                  }
                                }}
                              />
                            ))}
                            {project.technologies.length > 3 && (
                              <Chip
                                label={`+${project.technologies.length - 3}`}
                                size="small"
                                sx={{
                                  bgcolor: 'action.hover',
                                  color: 'text.secondary',
                                  fontSize: '0.65rem',
                                  height: 24,
                                  '& .MuiChip-label': {
                                    px: 1,
                                    py: 0.5
                                  }
                                }}
                              />
                            )}
                          </Box>
                          <Box sx={{ 
                            display: 'flex', 
                            gap: 1.5,
                            '& .MuiButton-root': {
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              px: 1.5,
                              minWidth: 'auto',
                              flex: 1,
                              py: 0.75
                            }
                          }}>
                            <Button
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              startIcon={<GitHubIcon fontSize="small" />}
                              variant="outlined"
                              size="small"
                              sx={{
                                color: 'text.primary',
                                borderColor: 'divider',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  bgcolor: 'primary.light',
                                  color: 'primary.contrastText',
                                }
                              }}
                            >
                              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>View </Box>Code
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.demo, '_blank', 'noopener,noreferrer');
                              }}
                              variant="contained"
                              size="small"
                              endIcon={<OpenInNewIcon fontSize="small" />}
                              sx={{
                                bgcolor: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'primary.dark',
                                }
                              }}
                            >
                              Demo
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mt: { xs: 4, sm: 6 },
            px: 2
          }}>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '0.9375rem', sm: '1rem' }
              }}
            >
              Want to see more of my work?
            </Typography>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                px: { xs: 3, sm: 4 },
                py: 1,
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                borderWidth: '1.5px',
                '&:hover': {
                  borderWidth: '1.5px',
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                }
              }}
            >
              View All on GitHub
            </Button>
          </Box>
        </motion.div>
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
