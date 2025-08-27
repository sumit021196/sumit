import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import TestSignup from './test/TestSignup';
import PrivateRoute from './components/PrivateRoute';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleBasedRoute from './components/RoleBasedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test-signup" element={<TestSignup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleBasedRoute allowedRoles={['doctor']} />}>
              <Route path="/doctor" element={<DoctorDashboard />} />
            </Route>
            <Route element={<RoleBasedRoute allowedRoles={['patient']} />}>
              <Route path="/patient" element={<PatientDashboard />} />
            </Route>
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
