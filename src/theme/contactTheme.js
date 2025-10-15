import { createTheme, alpha } from '@mui/material/styles';

export const contactTheme = createTheme({
  palette: {
    primary: {
      main: '#0f172a', // Deep navy
      light: '#1e293b',
      dark: '#020617',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c9a87c', // Gold
      light: '#d4b995',
      dark: '#b08a4e',
      contrastText: '#0f172a',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(15, 23, 42, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#c9a87c', 0.3),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c9a87c',
              boxShadow: `0 0 0 3px ${alpha('#c9a87c', 0.2)}`,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#c9a87c',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(19).fill('none'),
  ],
});

export const contactStyles = {
  section: {
    py: { xs: 6, md: 12 },
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(201, 168, 124, 0.1) 100%),
        url("/grid-pattern.svg")
      `,
      opacity: 0.8,
      zIndex: 0,
    },
  },
  container: {
    position: 'relative',
    zIndex: 1,
  },
  paper: {
    p: { xs: 2.5, md: 4 },
    height: '100%',
    borderRadius: 3,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(201, 168, 124, 0.15)',
    boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
      borderColor: 'rgba(201, 168, 124, 0.3)',
    },
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.02) 0%, rgba(201, 168, 124, 0.02) 100%)',
      zIndex: 0,
    },
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: 'rgba(201, 168, 124, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: 2,
    flexShrink: 0,
    '& svg': {
      color: '#c9a87c',
      fontSize: 28,
    },
  },
  heading: {
    fontWeight: 700,
    background: 'linear-gradient(45deg, #0f172a, #c9a87c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: { xs: '1.5rem', md: '1.75rem' },
  },
};
