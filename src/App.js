import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthProvider';
import TestSignup from './test/TestSignup';
import PrivateRoute from './components/PrivateRoute';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleBasedRoute from './components/RoleBasedRoute';
import './App.css';

// Wrapper to handle initial loading state
const AppContent = () => {
  const { loading, user, role } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/test-signup'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!user && !isPublicRoute) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={role ? `/${role}` : '/login'} replace />} />
      
      {/* Public Routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${role}`} replace />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to={`/${role}`} replace />} />
      <Route path="/test-signup" element={<TestSignup />} />
      
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<RoleBasedRoute allowedRoles={['doctor']} />}>
          <Route path="/doctor/*" element={<DoctorDashboard />} />
        </Route>
        <Route element={<RoleBasedRoute allowedRoles={['patient']} />}>
          <Route path="/patient/*" element={<PatientDashboard />} />
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
