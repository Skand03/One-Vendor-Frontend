import React, { createContext, useState, useContext } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Will hold admin user info when authenticated
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);

  const adminLogin = (adminData, token) => {
    setAdmin(adminData);
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const adminLogout = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  const isAdminLoggedIn = !!adminToken;

  return (
    <AdminAuthContext.Provider value={{ admin, adminToken, isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
