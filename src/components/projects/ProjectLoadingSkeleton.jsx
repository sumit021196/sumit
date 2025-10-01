import React from 'react';
import { Grid, Skeleton, Box } from '@mui/material';

const ProjectLoadingSkeleton = ({ count = 3 }) => {
  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box sx={{ height: '100%' }}>
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              sx={{ 
                borderRadius: 2, 
                height: 200,
                mb: 2
              }} 
            />
            <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
            <Skeleton width="60%" height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Skeleton width={60} height={24} />
              <Skeleton width={60} height={24} />
              <Skeleton width={60} height={24} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectLoadingSkeleton;
