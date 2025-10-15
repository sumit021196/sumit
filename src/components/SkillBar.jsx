import React from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';

const SkillBar = ({ name, level, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ mr: 1, color }}>{icon}</Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, flexGrow: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {level}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={level}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
};

export default SkillBar;
