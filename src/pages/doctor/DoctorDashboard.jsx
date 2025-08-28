import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../supabaseClient';

const DoctorDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctor's appointments
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // clear previous errors
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', user.id)
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment status');
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user?.id, fetchAppointments]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading appointments...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Doctor Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      
      <h3>Your Appointments</h3>
      <div style={styles.appointmentsList}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <p><strong>Patient:</strong> {appointment.patient_name}</p>
              <p>
                <strong>Time:</strong>{' '}
                {new Date(appointment.appointment_time).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <div style={styles.buttonGroup}>
                <button 
                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                  disabled={appointment.status === 'confirmed'}
                  style={appointment.status === 'confirmed' ? styles.disabledButton : styles.actionButton}
                >
                  Confirm
                </button>
                <button 
                  onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                  disabled={appointment.status === 'completed'}
                  style={appointment.status === 'completed' ? styles.disabledButton : styles.actionButton}
                >
                  Mark as Completed
                </button>
                <button 
                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  disabled={appointment.status === 'cancelled'}
                  style={appointment.status === 'cancelled' ? styles.disabledButton : styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No appointments scheduled</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '18px',
    fontWeight: '500',
  },
  appointmentsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  appointmentCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  actionButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
  },
  disabledButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ccc',
    color: '#666',
    cursor: 'not-allowed',
  },
};

export default DoctorDashboard;
