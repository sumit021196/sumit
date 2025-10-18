import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon Key. Please check your .env file.');
  console.error('Current configuration:', {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
  });
}

// Create and configure the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE flow for better security
    storage: typeof window !== 'undefined' ? window.localStorage : null,
    storageKey: 'sb-auth-token',
    debug: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  // Enable debug logging
  _debug: import.meta.env.DEV,
  // Add fetch implementation for Edge
  fetch: (...args) => fetch(...args).catch(err => {
    console.error('Fetch error:', err);
    throw err;
  })
});

// Log auth state changes for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event);
  // Don't log the entire session object as it may contain sensitive data
  if (session) {
    console.log('User:', {
      id: session.user?.id,
      email: session.user?.email,
      email_verified: session.user?.email_confirmed_at ? true : false
    });
  } else {
    console.log('No active session');
  }
});

// Export auth functions for convenience
export const signUp = (email, password, userData) => 
  supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData?.fullName || '',
        ...userData
      },
      emailRedirectTo: `${window.location.origin}/login`
    }
  });

export const signIn = (email, password) => 
  supabase.auth.signInWithPassword({
    email,
    password
  });

export const signOut = () => supabase.auth.signOut();

export const getCurrentUser = () => supabase.auth.getUser();

export const submitContactForm = async (formData) => {
  try {
    // Insert contact form data into a 'contact_messages' table
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString(),
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
