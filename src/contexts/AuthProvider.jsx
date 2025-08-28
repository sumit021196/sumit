// src/contexts/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();
const DEFAULT_ROLE = 'patient';

// Ensure user profile exists
const ensureProfile = async (user) => {
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role, full_name, email')
    .eq('id', user.id)
    .single();

  if (profile) return profile;

  if (error?.code === "PGRST116") { // not found
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        // ❌ role yaha set mat karo → RLS/trigger se default assign hoga
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) throw createError;
    return newProfile;
  }

  if (error) throw error;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth state listener
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const profile = await ensureProfile(session.user);
        setRole(profile?.role || DEFAULT_ROLE);
      }
      setLoading(false);
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          const profile = await ensureProfile(session.user);
          setRole(profile?.role || DEFAULT_ROLE);
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, userData) => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: userData.fullName } }
      });

      if (error) throw error;

      // profile creation will be handled automatically on auth state change
      return { error: null, user: authData.user };
    } catch (error) {
      console.error("Signup error:", error.message);
      return { error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = { user, role, loading, signUp, signOut };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
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
