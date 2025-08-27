import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../supabaseClient';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctor's appointments
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
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
  }, [user?.id]); // Add user.id as a dependency

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
    if (user) {
      fetchAppointments();
    }
  }, [user, fetchAppointments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Doctor Dashboard</h2>
      {error && <div style={styles.error}>{error}</div>}
      
      <h3>Your Appointments</h3>
      <div style={styles.appointmentsList}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <p><strong>Patient:</strong> {appointment.patient_name}</p>
              <p><strong>Time:</strong> {new Date(appointment.appointment_time).toLocaleString()}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <div style={styles.buttonGroup}>
                <button 
                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                  disabled={appointment.status === 'confirmed'}
                >
                  Confirm
                </button>
                <button 
                  onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                  disabled={appointment.status === 'completed'}
                >
                  Mark as Completed
                </button>
                <button 
                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  disabled={appointment.status === 'cancelled'}
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
  error: {
    color: 'red',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
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
};

export default DoctorDashboard;
