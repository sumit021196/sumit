import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome to Your Dashboard</h2>
        <div style={styles.userInfo}>
          <p>Email: {user?.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          style={styles.button}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  userInfo: {
    margin: '1.5rem 0',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

export default Dashboard;
