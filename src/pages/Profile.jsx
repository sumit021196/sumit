import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  CircularProgress,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthProvider';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, profile, updateProfile, updatePassword, signOut } = useAuth();
  const navigate = useNavigate();

  // Initialize form with user data
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!fullName) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await updateProfile({ full_name: fullName });
      if (error) throw error;
      
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // First, sign in with current password to verify
      const { user: currentUser, error: signInError } = await signIn({ 
        email: user.email, 
        password: currentPassword 
      });
      
      if (signInError) throw new Error('Current password is incorrect');
      
      // If sign in is successful, update password
      const { error: updateError } = await updatePassword(newPassword);
      if (updateError) throw updateError;
      
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">Please sign in to view your profile</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Personal Information</Typography>
          {!isEditing ? (
            <IconButton 
              color="primary" 
              onClick={() => setIsEditing(true)}
              aria-label="edit profile"
            >
              <EditIcon />
            </IconButton>
          ) : (
            <Box>
              <IconButton 
                color="primary" 
                onClick={handleProfileUpdate}
                disabled={isLoading}
                aria-label="save changes"
              >
                <SaveIcon />
              </IconButton>
              <IconButton 
                onClick={() => {
                  setIsEditing(false);
                  setError('');
                  setMessage('');
                  // Reset form
                  setFullName(profile.full_name || '');
                }}
                disabled={isLoading}
                aria-label="cancel editing"
              >
                <CancelIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box display="flex" alignItems="center" mb={4}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              fontSize: '2rem',
              bgcolor: 'primary.main',
              mr: 3
            }}
          >
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          
          <Box>
            {isEditing ? (
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
                fullWidth
              />
            ) : (
              <Typography variant="h6">
                {profile?.full_name || 'No name provided'}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        
        <Box component="form" onSubmit={handlePasswordUpdate} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
      
      <Box textAlign="center" mt={4}>
        <Button 
          variant="outlined" 
          color="error"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
}
