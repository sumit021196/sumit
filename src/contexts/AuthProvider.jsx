// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  // Fetch role from profiles table
  const fetchUserRole = useCallback(async (userId) => {
    if (!userId) return null;

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

  // Handle auth state changes
  const handleAuthState = useCallback(async (currentUser) => {
    if (currentUser) {
      const userRole = await fetchUserRole(currentUser.id);
      setUser(currentUser);
      setRole(userRole);
    } else {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
    setInitialCheckComplete(true);
  }, [fetchUserRole]);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          await handleAuthState(session?.user || null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setUser(null);
          setRole(null);
          setLoading(false);
          setInitialCheckComplete(true);
        }
      }
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          await handleAuthState(session?.user || null);
        }
      }
    );
    
    // Cleanup function
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [handleAuthState]);

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Sign up function
  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            // Add any additional user data here
          }
        }
      });

      if (error) throw error;
      
      // Insert user profile
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              email: email,
              full_name: userData?.fullName || '',
              role: 'patient' // Default role
            }
          ]);

        if (profileError) throw profileError;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
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
      signIn,
      signUp,
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
