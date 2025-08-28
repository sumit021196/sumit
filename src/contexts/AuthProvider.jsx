// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

// Default role for new users
const DEFAULT_ROLE = 'patient';

// Helper function to ensure user profile exists
const ensureProfile = async (user) => {
  if (!user) return null;

  // Check if profile exists
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    // If profile doesn't exist, create a new one using upsert to prevent race conditions
    console.warn('Profile not found, creating/updating profile with role:', DEFAULT_ROLE);
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          role: DEFAULT_ROLE,
          full_name: user.full_name || user.email?.split('@')[0] || 'User',
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (createError) {
      console.error('Error creating profile:', createError);
      throw createError;
    }
    
    console.log('New profile created:', newProfile);
    return { ...newProfile, isNew: true };
  }
  
  console.log('User profile found:', profile);
  return { ...profile, isNew: false };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, _setLoading] = useState(true);
  const loadingRef = useRef(loading);
  
  // Keep ref in sync with state
  const setLoading = useCallback((value) => {
    loadingRef.current = value;
    _setLoading(value);
  }, []);
  const [session, setSession] = useState(null);

  // Handle auth state changes - only manages session state
  const handleAuthChange = useCallback((event, newSession) => {
    console.log('=== AUTH STATE CHANGED ===', event);
    
    if (event === 'SIGNED_OUT' || !newSession?.user) {
      console.log('User signed out or no session, clearing state');
      setUser(null);
      setRole(null);
      setSession(null);
      return;
    }
    
    // Only update session and user state
    setSession(newSession);
    setUser(newSession.user);
  }, [setUser, setRole, setSession]);
  
  // Handle profile loading whenever user changes
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setRole(null);
        return;
      }
      
      try {
        setLoading(true);
        const profile = await ensureProfile(user);
        setRole(profile?.role || DEFAULT_ROLE);
      } catch (error) {
        console.error('Error loading profile:', error);
        setRole(DEFAULT_ROLE);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadProfile();
    }
  }, [user]); // Depend on the full user object

  // Initialize the auth state - runs only once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let isMounted = true;
    let subscription = null;
    
    const authTimeout = setTimeout(() => {
      if (isMounted && loadingRef.current) {
        console.warn('Auth check taking too long, forcing state update');
        setLoading(false);
      }
    }, 5000);

    console.log('=== AUTH PROVIDER MOUNTED ===');
    
    const setupAuth = async () => {
      try {
        setLoading(true);
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Set up the auth state change listener
        const { data } = supabase.auth.onAuthStateChange(handleAuthChange);
        
        subscription = data.subscription;
        
        // If we have a session, update the state
        if (session?.user) {
          console.log('Initial session found:', session.user.email);
          setSession(session);
          setUser(session.user);
        } else {
          console.log('No active session found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setupAuth();

    // Cleanup
    return () => {
      isMounted = false;
      clearTimeout(authTimeout);
      subscription?.unsubscribe();
    };
  }, [handleAuthChange, setSession, setUser]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // State will be updated by the auth state change listener
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  }, []);

  const signUp = async (email, password, userData) => {
    try {
      // Create user with email and password
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName
          }
        }
      });

      if (signUpError) throw signUpError;

      // Ensure profile exists for the new user
      const userWithFullName = {
        ...authData.user,
        full_name: userData.fullName
      };
      
      await ensureProfile(userWithFullName);

      return { error: null, user: authData.user };
    } catch (error) {
      console.error('Signup error:', error);
      return { error };
    }
  };

  const value = {
    user,
    role,
    loading,
    signOut,
    signUp,
    session
  };

  // Don't render children until we've checked the auth state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
