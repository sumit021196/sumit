import { useState } from 'react';
import { supabase } from '../supabaseClient';

const TestSignup = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testSignup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: "testuser@gmail.com",
        password: "Test@12345"
      });
      
      console.log("Signup result:", { data, error });
      setResult({ data, error: error ? error.message : null });
      
      if (error) {
        throw error;
      }
      
      // If signup is successful, check the auth state
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      
    } catch (err) {
      console.error("Test signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Test Signup</h2>
      <button 
        onClick={testSignup}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Signup'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TestSignup;
