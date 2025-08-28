import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Helper: Fetch user + role
  const fetchUserAndRole = async (authUser) => {
    if (!authUser) {
      setUser(null);
      setRole(null);
      setLoading(false);
      return;
    }

    setUser(authUser);

    // profiles se role fetch karo
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authUser.id)
      .single();

    if (!error && profile) {
      setRole(profile.role);
    } else {
      setRole(null);
    }

    setLoading(false);
  };

  // ✅ Auth state listener
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      await fetchUserAndRole(user);
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await fetchUserAndRole(session?.user || null);
      }
    );

    return () => subscription?.subscription?.unsubscribe();
  }, []);

  // ✅ Signup
  const signUp = async (email, password, userData) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: userData.fullName } }
      });

      if (signUpError) throw signUpError;

      // profiles me entry create karo (role backend/RLS se enforce hona chahiye)
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: authData.user.id,
          email,
          full_name: userData.fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      return { data: authData.user, error: null };
    } catch (error) {
      console.error("Signup error:", error.message);
      return { data: null, error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
