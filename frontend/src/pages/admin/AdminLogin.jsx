import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { supabase } from '../../services/supabaseClient';

// Admin email whitelist
const ADMIN_EMAILS = ['onevendorsolutions@gmail.com'];

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#0a2342';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if email is in admin whitelist
    if (!ADMIN_EMAILS.includes(email.toLowerCase().trim())) {
      setError('Access denied. This email is not authorized for admin access.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      adminLogin(
        {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || 'Admin'
        },
        data.session.access_token
      );

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login error:', err);
      if (err.message?.toLowerCase().includes('email not confirmed')) {
        setError('Email not confirmed. Please disable email confirmation in Supabase Dashboard → Authentication → Providers → Email.');
      } else if (err.message?.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid password. Please check and try again.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute inset-0 gold-pattern pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-fixed opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-fixed-dim opacity-10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <main className="fixed inset-0 z-10 flex items-center justify-center px-gutter">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-xl p-8 flex flex-col items-center transition-all duration-500 hover:shadow-2xl">

            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary text-4xl">shield_person</span>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">One Vendor</h1>
              </div>
              <div className="h-0.5 w-12 bg-secondary-fixed-dim mx-auto mb-3"></div>
              <h2 className="font-title-lg text-title-lg text-on-surface-variant font-medium">Admin Login</h2>
              <p className="font-label-md text-label-md text-on-tertiary-container mt-1 uppercase tracking-widest">Procurement Oversight</p>
            </div>

            {error && (
              <div className="w-full mb-4 bg-error-container text-on-error-container p-3 rounded-lg font-body-md text-body-md flex items-start gap-3 border border-error/20">
                <span className="material-symbols-outlined text-[18px] mt-0.5 flex-shrink-0">error</span>
                <p className="text-[13px]">{error}</p>
              </div>
            )}

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="relative flex flex-col">
                <label className="font-label-md text-[11px] text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="admin-email">
                  Admin Email
                </label>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3 bg-surface border-b-2 border-outline-variant/30 text-on-surface focus:border-secondary focus:ring-0 transition-all outline-none rounded-t-lg text-[14px]" 
                    id="admin-email" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="onevendorsolutions@gmail.com"
                  />
                  <div className="absolute right-4 top-3.5 text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col">
                <label className="font-label-md text-[11px] text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="admin-password">
                  Admin Password
                </label>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3 bg-surface border-b-2 border-outline-variant/30 text-on-surface focus:border-secondary focus:ring-0 transition-all outline-none rounded-t-lg text-[14px]" 
                    id="admin-password" 
                    required 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <div className="absolute right-4 top-3.5 text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-sm">lock</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-secondary" type="checkbox"/>
                  <span className="text-[13px] text-on-surface-variant group-hover:text-primary transition-colors">Remember device</span>
                </label>
                <Link to="/forgot-password" className="text-[12px] font-semibold text-secondary hover:text-on-secondary-fixed-variant transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button 
                className="w-full bg-primary-container text-on-primary py-3.5 rounded-lg font-title-lg text-[16px] shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden transition-all duration-300 active:scale-[0.98] disabled:opacity-55" 
                type="submit"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10"></div>
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <span className="group-hover:text-on-secondary transition-colors duration-300">Login to Dashboard</span>
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 group-hover:text-on-secondary transition-all">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="font-label-md text-label-md text-on-tertiary-container flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">security</span>
                Secured by Supabase Auth
              </p>
              <div className="flex items-center justify-center gap-4 text-xs font-label-md text-on-surface-variant/60 uppercase tracking-widest border-t border-outline-variant/10 pt-3">
                <a className="hover:text-secondary transition-colors" href="#">Security Policy</a>
                <span className="w-1 h-1 bg-outline-variant/40 rounded-full"></span>
                <Link to="/contact" className="hover:text-secondary transition-colors">Contact Admin</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminLogin;
