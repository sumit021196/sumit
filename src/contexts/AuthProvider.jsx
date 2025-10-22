// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const navigate = useNavigate();

  // Create or update user profile
  const createOrUpdateProfile = async (userId, updates = {}) => {
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (existingProfile) {
        // Update existing profile
        const { data, error } = await supabase
          .from('profiles')
          .update({ ...updates, updated_at: new Date() })
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        setProfile(data);
        setRole(data.role || 'user');
        return data;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('profiles')
          .insert([{ 
            id: userId, 
            ...updates,
            role: 'user' // Default role
          }])
          .single();
        
        if (error) throw error;
        setProfile(data);
        setRole(data.role || 'user');
        return data;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Fetch user profile
  const fetchUserProfile = useCallback(async (userId) => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      setProfile(data);
      setRole(data?.role || 'user');
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
      setRole(null);
      return null;
    }
  }, []);

  // Handle auth state changes
  const handleAuthState = useCallback(async (currentUser) => {
    if (currentUser) {
      const userProfile = await fetchUserProfile(currentUser.id);
      setUser(currentUser);
      
      // If no profile exists, create one
      if (!userProfile) {
        await createOrUpdateProfile(currentUser.id, {
          email: currentUser.email,
          full_name: currentUser.email.split('@')[0],
        });
      }
    } else {
      setUser(null);
      setProfile(null);
      setRole(null);
    }
    setLoading(false);
    setInitialCheckComplete(true);
  }, [fetchUserProfile]);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
        }

        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            // Fetch user profile
            await fetchUserProfile(session.user.id);
          }
          setLoading(false);
          setInitialCheckComplete(true);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setUser(null);
          setProfile(null);
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
        console.log('Auth state changed:', event, session?.user?.email);

        if (mounted) {
          setUser(session?.user ?? null);

          if (session?.user) {
            await fetchUserProfile(session.user.id);
          } else {
            setProfile(null);
            setRole(null);
          }

          setLoading(false);
          setInitialCheckComplete(true);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchUserProfile]);

  // Sign up function
  const signUp = async ({ email, password, full_name, ...otherData }) => {
    try {
      setLoading(true);
      
      // Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            ...otherData
          }
        }
      });

      if (signUpError) throw signUpError;
      
      // Create user profile
      if (authData.user) {
        await createOrUpdateProfile(authData.user.id, {
          email,
          full_name,
          ...otherData
        });
      }

      return { user: authData.user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async ({ email, password }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setRole(null);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update password function
  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (updates) => {
    if (!user) return { error: 'Not authenticated' };
    
    try {
      setLoading(true);
      const updatedProfile = await createOrUpdateProfile(user.id, updates);
      return { profile: updatedProfile, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { profile: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Auth context value
  const value = {
    user,
    profile,
    role,
    loading,
    initialCheckComplete,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
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
