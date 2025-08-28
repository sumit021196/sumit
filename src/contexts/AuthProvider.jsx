// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const ROUTES_BY_ROLE = {
  doctor: '/doctor',
  patient: '/patient',
  admin: '/admin',
  default: '/'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Fetch role from profiles table
  const fetchUserRole = useCallback(async (userId) => {
    if (!userId) {
      setRole(null);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) throw error;
      
      const userRole = data?.role || null;
      setRole(userRole);
      return userRole;
    } catch (error) {
      console.error("Error fetching role:", error);
      setRole(null);
      return null;
    }
  }, []);

  // ✅ Handle redirects based on auth state and role
  const handleAuthRedirect = useCallback(async (currentUser, currentRole) => {
    if (!currentUser) {
      // If not logged in and not on login/signup page, redirect to login
      if (!['/login', '/signup'].includes(location.pathname)) {
        navigate('/login', { replace: true });
      }
      return;
    }

    // If we have a user but no role yet, try to fetch it
    if (!currentRole) {
      currentRole = await fetchUserRole(currentUser.id);
    }

    // If still no role, log out the user as something's wrong
    if (!currentRole) {
      await supabase.auth.signOut();
      return;
    }

    // If trying to access auth pages while logged in, redirect to role-based dashboard
    if (['/login', '/signup'].includes(location.pathname)) {
      navigate(ROUTES_BY_ROLE[currentRole] || ROUTES_BY_ROLE.default, { replace: true });
      return;
    }

    // Check if current path matches user's role
    const rolePath = ROUTES_BY_ROLE[currentRole];
    if (rolePath && !location.pathname.startsWith(rolePath)) {
      navigate(rolePath, { replace: true });
    }
  }, [fetchUserRole, location.pathname, navigate]);

  // Initialize auth state and set up listener
  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    const initializeAuth = async (isRetry = false) => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        const currentUser = session?.user || null;
        
        if (!mounted) return;

        setUser(currentUser);
        
        if (currentUser) {
          try {
            const userRole = await fetchUserRole(currentUser.id);
            if (mounted) {
              setRole(userRole);
              await handleAuthRedirect(currentUser, userRole);
            }
          } catch (roleError) {
            console.error('Error fetching user role:', roleError);
            // If role fetch fails, sign out to prevent infinite loading
            if (mounted) {
              await supabase.auth.signOut();
              setUser(null);
              setRole(null);
              navigate('/login', { replace: true });
            }
          }
        } else {
          // If no user but we're not on login/signup, redirect to login
          if (mounted && !['/login', '/signup'].includes(window.location.pathname)) {
            navigate('/login', { replace: true });
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          // If we have retries left and this isn't a retry, try again
          if (!isRetry && retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying auth initialization (${retryCount}/${MAX_RETRIES})...`);
            setTimeout(() => initializeAuth(true), 1000 * retryCount);
            return;
          }
          
          // If we've exhausted retries or this was a retry, reset and go to login
          setUser(null);
          setRole(null);
          if (window.location.pathname !== '/login') {
            navigate('/login', { replace: true });
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialCheckComplete(true);
        }
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (currentUser) {
          try {
            const userRole = await fetchUserRole(currentUser.id);
            if (mounted) {
              setRole(userRole);
              await handleAuthRedirect(currentUser, userRole);
            }
          } catch (error) {
            console.error('Error in auth state change:', error);
            if (mounted) {
              await supabase.auth.signOut();
              setUser(null);
              setRole(null);
              navigate('/login', { replace: true });
            }
          }
        } else {
          // User signed out
          if (mounted) {
            setRole(null);
            // Only redirect if not already on login/signup pages
            if (!['/login', '/signup'].includes(window.location.pathname)) {
              navigate('/login', { replace: true });
            }
          }
        }
      }
    );

    // Cleanup function
    return () => {
      mounted = false;
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, [fetchUserRole, handleAuthRedirect, navigate]);

  // Expose signOut function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Only render children after initial auth check is complete
  if (!initialCheckComplete) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      loading, 
      signOut,
      refreshRole: () => user && fetchUserRole(user.id)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
