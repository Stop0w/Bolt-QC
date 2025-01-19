import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route 
            path="/" 
            element={!session ? <Auth /> : <Dashboard key={session.user.id} session={session} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
