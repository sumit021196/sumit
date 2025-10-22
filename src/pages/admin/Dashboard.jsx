import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import { 
  Person as PersonIcon, 
  AdminPanelSettings as AdminIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../supabaseClient';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0
  });
  
  const { user, profile, loading, initialCheckComplete } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin - only after auth validation is complete
  useEffect(() => {
    if (loading || !initialCheckComplete) return; // Wait for auth validation

    if (!user) {
      navigate('/');
      return;
    }

    if (profile?.role !== 'admin') {
      navigate('/');
    }
  }, [profile, navigate, loading, initialCheckComplete, user]);

  // Fetch users and stats
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersLoading(true);

        // Fetch users with their profiles only (no admin API needed)
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (usersError) throw usersError;

        // Since we can't access auth.admin.listUsers() in client-side,
        // we'll work with profile data only
        const combinedUsers = usersData.map(profile => ({
          ...profile,
          email: profile.email || 'No email',
          last_sign_in: 'Not available',
          is_active: true // Assume active if profile exists
        }));

        setUsers(combinedUsers);

        // Calculate stats
        setStats({
          totalUsers: combinedUsers.length,
          activeUsers: combinedUsers.length, // All profiles are considered active
          adminUsers: combinedUsers.filter(u => u.role === 'admin').length
        });

      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load user data');
      } finally {
        setUsersLoading(false);
      }
    };

    // Only fetch users if user is admin and auth validation is complete
    if (profile?.role === 'admin' && !loading && initialCheckComplete) {
      fetchUsers();
    }
  }, [profile, loading, initialCheckComplete]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditUser = (userId) => {
    // Navigate to user edit page or open edit dialog
    console.log('Edit user:', userId);
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      // In a real app, you would call an API to update the user status
      // For now, we'll just update the local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, is_active: !currentStatus } 
          : user
      ));
      
      // Show success message
      setError('');
    } catch (err) {
      console.error('Error updating user status:', err);
      setError('Failed to update user status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  // Show loading spinner while auth is being validated or users are being fetched
  if (loading || !initialCheckComplete || usersLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {loading || !initialCheckComplete ? 'Validating access...' : 'Loading dashboard...'}
        </Typography>
      </Box>
    );
  }

  // Redirect if not authenticated or not admin
  if (!user || profile?.role !== 'admin') {
    return null; // Will redirect via useEffect
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </div>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Active Users
                  </Typography>
                  <Typography variant="h4">{stats.activeUsers}</Typography>
                </div>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <CheckCircleIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Admin Users
                  </Typography>
                  <Typography variant="h4">{stats.adminUsers}</Typography>
                </div>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                  <AdminIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users Table */}
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          User Management
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar 
                          src={user.avatar_url} 
                          alt={user.full_name}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        >
                          {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                        </Avatar>
                        <div>
                          <Typography variant="subtitle2">
                            {user.full_name || 'No Name'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            @{user.username || 'nousername'}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role || 'user'}
                        color={user.role === 'admin' ? 'primary' : 'default'}
                        size="small"
                        icon={user.role === 'admin' ? <AdminIcon fontSize="small" /> : null}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit User">
                        <IconButton
                          size="small"
                          onClick={() => handleEditUser(user.id)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deactivate User">
                        <IconButton
                          size="small"
                          onClick={() => toggleUserStatus(user.id, user.is_active)}
                          color="error"
                        >
                          <BlockIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
