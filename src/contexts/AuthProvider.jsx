// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const handleAuthChange = useCallback(async (event, session) => {
    console.log('=== AUTH STATE CHANGED ===', event);
    
    // Skip if no relevant change
    if (event === 'INITIAL_SESSION' && !session) return;
    
    if (event === 'SIGNED_OUT') {
      console.log('User signed out, clearing state');
      setUser(null);
      setRole(null);
      setSession(null);
      return;
    }
    
    if (!session?.user) {
      console.log('No user in session, clearing state');
      setUser(null);
      setRole(null);
      return;
    }
    
    console.log('Setting user and session in state');
    // Only update if user actually changed
    setUser(currentUser => {
      if (JSON.stringify(session?.user) !== JSON.stringify(currentUser)) {
        return session.user;
      }
      return currentUser;
    });
    setSession(currentSession => {
      if (JSON.stringify(session) !== JSON.stringify(currentSession)) {
        return session;
      }
      return currentSession;
    });
    
    try {
      // Check if profile exists
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) {
        console.warn('Profile not found, creating new profile with patient role');
        setRole('patient');
        
        try {
          // Create a new profile with patient role
          const { data, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                role: 'patient',
                full_name: session.user.email?.split('@')[0] || 'User',
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating profile:', createError);
            throw createError;
          }
          
          console.log('New profile created:', data);
        } catch (err) {
          console.error('Failed to create profile:', err);
          setRole(null);
        }
      } else {
        console.log('User profile:', profile);
        setRole(profile?.role || 'user');
      }
    } catch (error) {
      console.error('Error in auth state change:', error);
      setRole('user');
    }
  }, []); // No dependencies needed as we're using functional updates  

  // Initialize the auth state - runs only once on mount
  useEffect(() => {
    let isMounted = true;
    
    const authTimeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Auth check taking too long, forcing state update');
        setLoading(false);
        setRole(currentRole => currentRole || 'patient');
      }
    }, 5000);

    console.log('=== AUTH PROVIDER MOUNTED ===');
    
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Initial session:', session);
        
        if (error) throw error;
        
        if (session?.user) {
          console.log('Initial user:', session.user);
          setUser(session.user);
          
          // Try to get user profile
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (error) {
              console.warn('Error fetching profile, using default role:', error.message);
              setRole('user');
            } else {
              console.log('User profile:', profile);
              setRole(profile?.role || 'user');
              
              // If profile exists but is missing required fields, update it
              if (!profile?.full_name || !profile?.role) {
                console.log('Updating incomplete profile...');
                const updates = {
                  id: session.user.id,
                  updated_at: new Date().toISOString(),
                  ...(profile?.full_name ? {} : { full_name: session.user.email?.split('@')[0] || 'User' }),
                  ...(profile?.role ? {} : { role: 'user' })
                };
                
                const { error: updateError } = await supabase
                  .from('profiles')
                  .upsert(updates);
                  
                if (updateError) {
                  console.error('Error updating profile:', updateError);
                }
              }
            }
          } catch (profileError) {
            console.error('Error in profile fetch/update:', profileError);
            setRole('user');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change detected:', event);
      handleAuthChange(event, session);
    });

    return () => {
      isMounted = false;
      clearTimeout(authTimeout);
      subscription?.unsubscribe();
    };
  }, [handleAuthChange, loading]); // Include all dependencies

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  }, []);

  const value = {
    user,
    role,
    loading,
    signOut,
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
