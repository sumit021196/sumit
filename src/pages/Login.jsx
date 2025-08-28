// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthProvider";
import "./Login.css";

const ROUTES_BY_ROLE = {
  doctor: '/doctor',
  patient: '/patient',
  admin: '/admin',
  default: '/'
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect if already logged in
  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If there's a user and we have a role, redirect to the appropriate dashboard
    if (user && role) {
      const redirectPath = ROUTES_BY_ROLE[role] || ROUTES_BY_ROLE.default;
      // Only navigate if we're not already on the target path
      if (!location.pathname.startsWith(redirectPath)) {
        navigate(redirectPath, { replace: true });
      }
    } 
    // If there's a user but no role, something's wrong - log them out
    else if (user && !role) {
      console.warn('User is logged in but has no role. Logging out...');
      supabase.auth.signOut();
    }
    // If no user, make sure we're not in a loading state
    else if (!user) {
      setIsLoading(false);
    }
  }, [user, role, authLoading, navigate, location.pathname]);

  // Show loading state while checking auth
  if (isLoading || authLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading user session...</p>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      // Navigation will be handled by the auth state change in AuthProvider
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Invalid login credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please enter email and password for signup");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Add user to profiles table with default 'patient' role
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: data.user.id, 
            email, 
            role: 'patient' 
          }
        ]);

      if (profileError) throw profileError;

      // Show success message but don't redirect - user needs to verify email
      alert('Signup successful! Please check your email to verify your account before logging in.');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="login-button"
          disabled={isSubmitting || !email || !password}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="signup-option">
        <p>Don’t have an account?</p>
        <button onClick={handleSignup} disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
