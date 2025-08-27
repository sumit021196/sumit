import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../supabaseClient';

const PatientDashboard = () => {
  const { user, signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_time: '',
    reason: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');

  // Fetch all doctors
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'doctor');

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Failed to load doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch patient's appointments
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', user.id)
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Handle booking a new appointment
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      setBookingError('');
      setBookingSuccess('');

      if (!formData.doctor_id || !formData.appointment_time) {
        throw new Error('Please fill in all required fields');
      }

      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            patient_id: user.id,
            doctor_id: formData.doctor_id,
            appointment_time: formData.appointment_time,
            reason: formData.reason,
            status: 'scheduled'
          }
        ]);

      if (error) throw error;

      setBookingSuccess('Appointment booked successfully!');
      setFormData({
        doctor_id: '',
        appointment_time: '',
        reason: ''
      });
      setShowBookingForm(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingError(error.message || 'Failed to book appointment. Please try again.');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle canceling an appointment
  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const { error } = await supabase
          .from('appointments')
          .update({ status: 'cancelled' })
          .eq('id', appointmentId);

        if (error) throw error;
        
        // Refresh appointments
        fetchAppointments();
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        setError('Failed to cancel appointment. Please try again.');
      }
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await Promise.all([
          fetchDoctors(),
          fetchAppointments()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user, fetchDoctors, fetchAppointments]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Render header
  const renderHeader = () => (
    <header style={styles.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <h1>Patient Dashboard</h1>
          <p>Welcome, {profile?.full_name || 'Patient'}</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            height: 'fit-content',
            ':hover': {
              backgroundColor: '#cc0000'
            }
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'confirmed':
        return { ...styles.statusBadge, backgroundColor: '#4CAF50' };
      case 'cancelled':
        return { ...styles.statusBadge, backgroundColor: '#f44336' };
      case 'completed':
        return { ...styles.statusBadge, backgroundColor: '#2196F3' };
      default:
        return { ...styles.statusBadge, backgroundColor: '#FFC107' };
    }
  };

  return (
    <div style={styles.container}>
      {renderHeader()}

      {error && (
        <div style={styles.errorMessage}>
          {error}
          <button 
            onClick={() => setError('')}
            style={styles.closeButton}
          >
            ×
          </button>
        </div>
      )}

      <div style={styles.dashboardContent}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Your Appointments</h2>
            <button 
              onClick={() => setShowBookingForm(!showBookingForm)}
              style={styles.primaryButton}
            >
              {showBookingForm ? 'Cancel' : 'Book New Appointment'}
            </button>
          </div>

          {showBookingForm && (
            <div style={styles.bookingForm}>
              <h3>Book New Appointment</h3>
              {bookingError && (
                <div style={styles.errorMessage}>
                  {bookingError}
                  <button 
                    onClick={() => setBookingError('')}
                    style={styles.closeButton}
                  >
                    ×
                  </button>
                </div>
              )}
              {bookingSuccess && (
                <div style={styles.successMessage}>
                  {bookingSuccess}
                  <button 
                    onClick={() => setBookingSuccess('')}
                    style={styles.closeButton}
                  >
                    ×
                  </button>
                </div>
              )}
              <form onSubmit={handleBookAppointment}>
                <div style={styles.formGroup}>
                  <label htmlFor="doctor_id">Doctor *</label>
                  <select
                    id="doctor_id"
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleInputChange}
                    required
                    style={styles.formControl}
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.full_name} ({doctor.specialization || 'General'})
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="appointment_time">Appointment Time *</label>
                  <input
                    type="datetime-local"
                    id="appointment_time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleInputChange}
                    required
                    style={styles.formControl}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="reason">Reason for Visit</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows="3"
                    style={styles.formControl}
                  />
                </div>
                <div style={styles.formActions}>
                  <button 
                    type="submit" 
                    style={styles.primaryButton}
                    disabled={!formData.doctor_id || !formData.appointment_time}
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          )}

          {appointments.length > 0 ? (
            <div style={styles.appointmentsList}>
              {appointments.map(appointment => (
                <div key={appointment.id} style={styles.appointmentCard}>
                  <div style={styles.appointmentHeader}>
                    <h3>Appointment with Dr. {appointment.doctor_name || 'Doctor'}</h3>
                    <span style={getStatusBadgeStyle(appointment.status)}>
                      {appointment.status}
                    </span>
                  </div>
                  <div style={styles.appointmentDetails}>
                    <p><strong>Date & Time:</strong> {formatDate(appointment.appointment_time)}</p>
                    {appointment.reason && <p><strong>Reason:</strong> {appointment.reason}</p>}
                  </div>
                  {appointment.status === 'pending' && (
                    <div style={styles.appointmentActions}>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        style={styles.dangerButton}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.noAppointments}>
              <p>You don't have any appointments yet.</p>
              <button 
                onClick={() => setShowBookingForm(true)}
                style={styles.primaryButton}
              >
                Book Your First Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px 20px',
    borderRadius: '4px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  successMessage: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px 20px',
    borderRadius: '4px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'inherit',
    padding: '0 5px',
  },
  dashboardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#1565c0',
    },
  },
  dangerButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#b71c1c',
    },
  },
  bookingForm: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formControl: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    marginTop: '5px',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  appointmentsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  appointmentCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  appointmentDetails: {
    marginBottom: '15px',
  },
  appointmentActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  noAppointments: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '15px',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default PatientDashboard;
