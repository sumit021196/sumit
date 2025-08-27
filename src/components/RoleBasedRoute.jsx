import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function RoleBasedRoute({ allowedRoles }) {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Verifying your access...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!role) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Check if user's role is allowed
  const hasAccess = allowedRoles.includes(role);
  
  if (!hasAccess) {
    // Redirect to a 'not authorized' page or back to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
