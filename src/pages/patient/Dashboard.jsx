import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import { 
  Email, 
  Phone, 
  CalendarToday, 
  LocationOn, 
  MedicalServices,
  AccessTime,
  Bloodtype,
  EventAvailable,
  History,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch patient details from profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (error) throw error;
        
        setPatientData(data);
        
        // Simulate fetching upcoming appointments
        setUpcomingAppointments([
          {
            id: 1,
            doctor: 'Dr. Smith',
            specialty: 'Cardiology',
            date: '2023-09-15',
            time: '10:30 AM'
          },
          {
            id: 2,
            doctor: 'Dr. Johnson',
            specialty: 'Dermatology',
            date: '2023-09-20',
            time: '02:15 PM'
          }
        ]);
        
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPatientData();
    }
  }, [user]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Healthcare Portal
          </Typography>
          <Button 
            color="inherit"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome, {patientData?.full_name || 'Patient'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Here's your health summary
            </Typography>
          </Box>
        </Box>

      <Grid container spacing={3}>
        {/* Left Sidebar - Profile Card */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center', pt: 4 }}>
              <Avatar 
                alt={patientData?.full_name} 
                src={patientData?.avatar_url}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  margin: '0 auto 16px',
                  fontSize: '3rem'
                }}
              >
                {patientData?.full_name?.charAt(0) || 'P'}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {patientData?.full_name || 'Patient Name'}
              </Typography>
              <Chip 
                label="Patient" 
                color="primary" 
                size="small" 
                sx={{ mb: 2 }} 
              />
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon><Email color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={user?.email || 'N/A'}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Phone color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Phone" 
                    secondary={patientData?.phone || 'Not provided'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Bloodtype color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Blood Group" 
                    secondary={patientData?.blood_group || 'Not specified'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CalendarToday color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="Date of Birth" 
                    secondary={patientData?.date_of_birth || 'Not specified'}
                  />
                </ListItem>
                {patientData?.address && (
                  <ListItem>
                    <ListItemIcon><LocationOn color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Address" 
                      secondary={patientData.address}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Quick Actions */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  <EventAvailable />
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>Book Appointment</Typography>
                <Typography variant="body2" color="text.secondary">Schedule a new doctor's appointment</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                <Avatar sx={{ bgcolor: 'success.main', mb: 2 }}>
                  <History />
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>Medical History</Typography>
                <Typography variant="body2" color="text.secondary">View your medical records and history</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                <Avatar sx={{ bgcolor: 'warning.main', mb: 2 }}>
                  <MedicalServices />
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>Find a Doctor</Typography>
                <Typography variant="body2" color="text.secondary">Search and book appointments with specialists</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Upcoming Appointments */}
          <Card elevation={3} sx={{ mb: 3 }}>
            <CardHeader 
              title="Upcoming Appointments"
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Chip 
                  label={`${upcomingAppointments.length} Upcoming`} 
                  color="primary" 
                  variant="outlined" 
                  size="small"
                />
              }
            />
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <List>
                  {upcomingAppointments.map((appointment) => (
                    <React.Fragment key={appointment.id}>
                      <ListItem 
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'action.hover',
                            borderRadius: 1
                          } 
                        }}
                      >
                        <ListItemIcon>
                          <AccessTime color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Dr. ${appointment.doctor}`}
                          secondary={`${appointment.date} at ${appointment.time}`}
                        />
                        <Chip 
                          label={appointment.specialty} 
                          size="small" 
                          variant="outlined"
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography color="text.secondary">No upcoming appointments</Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Health Summary */}
          <Card elevation={3}>
            <CardHeader 
              title="Health Summary"
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      120/80
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Blood Pressure</Typography>
                    <Chip 
                      label="Normal" 
                      color="success" 
                      size="small" 
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      98.6°F
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Temperature</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      72
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Heart Rate (bpm)</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default PatientDashboard;
