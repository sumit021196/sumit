import { styled, alpha } from '@mui/material/styles';
import { Button, Paper } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px 32px',
  borderRadius: '50px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`
  }
}));

export const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '3.5rem',
    marginBottom: theme.spacing(2),
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}));

export const bounceAnimation = {
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0) translateX(-50%)',
    },
    '40%': {
      transform: 'translateY(-20px) translateX(-50%)',
    },
    '60%': {
      transform: 'translateY(-10px) translateX(-50%)',
    },
  },
};

export const heroSectionStyles = (theme) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/grid-pattern.svg")',
    opacity: 0.1,
    zIndex: -1,
  }
});

export const servicesSectionStyles = (theme) => ({
  py: { xs: 8, md: 12 },
  backgroundColor: 'background.paper',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(to bottom, rgba(15,12,41,1), rgba(15,12,41,0))',
    transform: 'translateY(-99%)',
    zIndex: 1,
  },
});
