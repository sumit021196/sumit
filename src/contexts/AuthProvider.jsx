// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initializedRef = useRef(false);

  // Profile query function with caching
  const fetchProfile = useCallback(async (userId) => {
    if (!userId) throw new Error('No user ID provided');

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      // If profile doesn't exist (PGRST116), create it
      if (error.code === 'PGRST116') {
        // Get current user data for profile creation
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (!user) {
          throw new Error('No authenticated user found');
        }

        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            role: 'user'
          }])
          .single();

        if (createError) {
          throw createError;
        }

        return newProfile;
      } else {
        throw error;
      }
    }

    return data;
  }, []);

  // Profile query with React Query caching - with better error handling
  const { data: profile, error: profileError, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id || 'no-user'],
    queryFn: () => fetchProfile(user?.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true, // Refetch if connection is restored
    retry: (failureCount, error) => {
      // Don't retry if it's not a PGRST116 error (profile not found)
      if (error?.code !== 'PGRST116') return false;
      return failureCount < 2;
    },
    onSuccess: (data) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Profile loaded successfully');
      }
    },
    onError: (error) => {
      console.error('❌ Profile loading error:', error?.message);
    },
    onSettled: (data, error) => {
      if (process.env.NODE_ENV === 'development' && error) {
        console.log('🏁 Profile query completed with error');
      }
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async ({ userId, updates }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date() })
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (updatedProfile) => {
      // Update cache with updated profile
      queryClient.setQueryData(['profile', updatedProfile.id], updatedProfile);
    },
  });

  // Handle auth state changes - simplified to prevent loading issues
  const handleAuthState = useCallback(async (currentUser) => {
    if (currentUser) {
      // Session should already be valid from Supabase auth state change
      setUser(currentUser);

      // Let React Query handle profile fetching - no manual DB calls here
      // This prevents race conditions and cache conflicts
    } else {
      setUser(null);
      setRole(null);
      // Clear profile cache
      queryClient.removeQueries(['profile']);
    }

    setLoading(false);
    setInitialCheckComplete(true);
  }, [queryClient]);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (initializedRef.current) return; // Prevent duplicate initialization
      initializedRef.current = true;

      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (mounted) {
          await handleAuthState(session?.user || null);
        }
      } catch (error) {
        if (mounted) {
          await handleAuthState(null);
        }
      }
    };

    initializeAuth();

    // Auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          await handleAuthState(session?.user || null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [handleAuthState]);

  // Update role when profile changes
  useEffect(() => {
    if (profile) {
      setRole(profile.role || 'user');
    }
  }, [profile]);

  // Sign up function
  const signUp = async ({ email, password, full_name, ...otherData }) => {
    try {
      setLoading(true);

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

      if (authData.user) {
        // Create profile for new user directly (same logic as fetchProfile)
        try {
          await supabase
            .from('profiles')
            .insert([{
              id: authData.user.id,
              email,
              full_name,
              ...otherData,
              role: 'user'
            }]);
        } catch (error) {
          console.error('Error creating profile during signup:', error);
        }
      }

      return { user: authData.user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

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

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      queryClient.removeQueries(['profile']);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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

  const updateProfile = async (updates) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      setLoading(true);
      const updatedProfile = await updateProfileMutation.mutateAsync({
        userId: user.id,
        updates
      });
      return { profile: updatedProfile, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { profile: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    role,
    loading: loading || profileLoading, // Include profile loading state
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

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
