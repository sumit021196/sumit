import React, { useState, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useScrollTrigger,
  Slide,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Login,
  PersonAdd,
  Logout,
  Person,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthProvider';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Projects', path: '/projects' },
  { text: 'Blog', path: '/blog' },
  { text: 'FAQ', path: '/faq' },
  { text: 'Contact', path: '/contact' },
];

const authItems = [
  { text: 'Sign In', path: '/login', icon: <Login /> },
  { text: 'Sign Up', path: '/signup', icon: <PersonAdd /> },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, profile, loading, initialCheckComplete, signOut } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const menuId = 'primary-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      {profile?.role === 'admin' && (
        <MenuItem 
          onClick={() => {
            handleMenuClose();
            navigate('/admin');
          }}
        >
          <ListItemIcon>
            <AdminPanelSettings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Admin Panel</ListItemText>
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleSignOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </MenuItem>
    </Menu>
  );

  const renderAuthButtons = useCallback(() => {
    // Show loading spinner while auth is being validated
    if (loading || !initialCheckComplete) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <CircularProgress size={24} color="inherit" />
        </Box>
      );
    }

    if (user) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            size="large"
          >
            {profile?.avatar_url ? (
              <Avatar
                src={profile.avatar_url}
                alt={profile.full_name || 'User'}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          component={RouterLink}
          to="/login"
          color="inherit"
          startIcon={<Login />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Sign In
        </Button>
        <Button
          component={RouterLink}
          to="/signup"
          variant="outlined"
          color="inherit"
          startIcon={<PersonAdd />}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            whiteSpace: 'nowrap'
          }}
        >
          Sign Up
        </Button>
      </Box>
    );
  }, [user, profile, loading, initialCheckComplete, menuId]);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        width: 280,
        height: '100%',
        background: 'linear-gradient(180deg, rgba(15, 12, 41, 0.95) 0%, rgba(48, 43, 99, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        color: 'white',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #fff 30%, #90caf9 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}
        >
          Sumit's Portfolio
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List sx={{ pt: 2, px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                textAlign: 'left',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        {!user && !loading && initialCheckComplete && (
          <Box sx={{ mt: 2, px: 1 }}>
            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            {authItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    textAlign: 'left',
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: item.text === 'Sign Up' ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                    border: item.text === 'Sign Up' ? '1px solid rgba(33, 150, 243, 0.3)' : 'none',
                    '&:hover': {
                      backgroundColor: item.text === 'Sign Up' ? 'rgba(33, 150, 243, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: item.text === 'Sign Up' ? '#90caf9' : 'rgba(255, 255, 255, 0.7)' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: item.text === 'Sign Up' ? '#90caf9' : 'rgba(255, 255, 255, 0.9)'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        )}
        
        {user && (
          <Box sx={{ mt: 2, px: 1 }}>
            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={handleProfileClick}
                sx={{ textAlign: 'left', px: 3, py: 1.5, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="My Profile" primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
            {profile?.role === 'admin' && (
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    handleMenuClose();
                    navigate('/admin');
                  }}
                  sx={{ textAlign: 'left', px: 3, py: 1.5, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'rgba(255, 255, 255, 0.7)' }}>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary="Admin Panel" primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSignOut}
                sx={{
                  textAlign: 'left',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  mt: 1,
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  color: '#ef5350',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.2)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          </Box>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={{
            background: 'rgba(15, 12, 41, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: { xs: 0.5, sm: 2 }, p: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 800,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #fff 30%, #90caf9 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                ml: { xs: 0.5, sm: 0 },
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              Sumit's Portfolio
            </Typography>
            {!isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', mr: 1 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        mx: 0.5,
                        px: 1.5,
                        minWidth: 'auto',
                        fontWeight: 500,
                        textTransform: 'none',
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: '#fff',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-1px)'
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ ml: 1 }}>
                  {renderAuthButtons()}
                </Box>
              </Box>
            ) : (
              <Box sx={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
                {renderAuthButtons()}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMenu}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar /> {/* This pushes content below the fixed AppBar */}
    </>
  );
}

export default Navbar;
