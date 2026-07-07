import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { supabase } from '../../services/supabaseClient';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#000d22';
    document.body.style.overflow = 'hidden';

    if (isAdminLoggedIn) {
      navigate('/admin/dashboard');
    }

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        setError(authError.message || 'Invalid admin credentials. Please try again.');
        setLoading(false);
        return;
      }

      // The onAuthStateChange listener in AdminAuthContext will handle the session
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#000d22] overflow-hidden px-gutter">
      {/* Animated luxury background styling */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold-accent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-gold-accent relative overflow-hidden"
        >
          <div className="mb-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-gold-accent text-3xl font-bold">shield_person</span>
              <h1 className="font-poppins font-extrabold text-2xl text-primary">One Vendor</h1>
            </div>
            <div className="h-0.5 w-12 bg-gold-accent mx-auto"></div>
            <h2 className="font-poppins font-bold text-base text-primary-container">Admin Login Portal</h2>
            <p className="text-[10px] font-bold text-on-surface-variant/80 uppercase tracking-widest">Procurement Oversight</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs flex items-start gap-2.5"
            >
              <span className="material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5">error</span>
              <p>{error}</p>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1">
                Admin Username / Email
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent pl-10 pr-4 py-3 text-body-md"
                />
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant text-[18px]">person</span>
              </div>
            </div>

            <div>
              <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block mb-1">
                Security Password
              </label>
              <div className="relative">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent pl-10 pr-4 py-3 text-body-md"
                />
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant text-[18px]">lock</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-lg font-bold text-xs shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4 border-t border-outline-variant/30 pt-4 text-[10px] text-on-surface-variant/80 font-bold uppercase tracking-wider flex justify-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Secure SSL
            </span>
            <span className="w-1.5 h-1.5 bg-outline-variant/60 rounded-full mt-1.5"></span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">security</span>
              Spring Security
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLogin;
