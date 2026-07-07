import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on load
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAdmin({ id: session.user.id, email: session.user.email });
        setAdminToken(session.access_token);
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAdmin({ id: session.user.id, email: session.user.email });
          setAdminToken(session.access_token);
        } else {
          setAdmin(null);
          setAdminToken(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const adminLogout = async () => {
    await supabase.auth.signOut();
  };

  const isAdminLoggedIn = !!adminToken;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#000d22] text-white">Loading Admin...</div>;
  }

  return (
    <AdminAuthContext.Provider value={{ admin, adminToken, isAdminLoggedIn, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
