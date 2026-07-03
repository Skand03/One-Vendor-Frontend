import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      login(
        {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || data.user.email.split('@')[0]
        },
        data.session.access_token
      );

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      if (err.message?.toLowerCase().includes('email not confirmed')) {
        setError('Your email is not confirmed yet. Please check your inbox for a verification link, or ask the admin to disable email confirmation in Supabase Dashboard → Authentication → Providers → Email.');
      } else if (err.message?.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid email or password. Please check and try again.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="fixed inset-0 flex flex-col md:flex-row overflow-hidden">
      {/* Left Branding Panel */}
      <section className="relative hidden md:flex md:w-[42%] bg-primary-container flex-col justify-between p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-[#0c2b50] to-primary pointer-events-none opacity-90"></div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="One Vendor Solutions" className="h-10 w-auto object-contain rounded" />
            <h1 className="font-headline-md text-[20px] text-on-primary font-bold tracking-tight">One Vendor Solutions</h1>
          </Link>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
          <div className="w-full max-w-[260px]">
            <img alt="Procurement Management" className="w-full h-auto drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida/AP1WRLsEqxhunGaJEHEKZW_KKYKbOx63gnW1Hs_iwDb4OVR3d5T2YrWKCdSuwNvPxdiHWUJ5uJ6lIDFAQu3om6wqZPH1XvmLKbQ_XTe7A6J8nzaB20M39PpTwR_dJsLIB3nQN5gkxtmRpU-mUAAHGAasDOohEuamPgs069uR8YnmDTd6ABXQZ40Ldh49JniybZrTI6mRXpfi4khHDZ0Zydpiz6XyDcWWrqiMBA0oTOx0jDUrA31gMwC63SQK5kI"/>
          </div>
          <div className="mt-4 text-center">
            <h2 className="font-headline-lg text-[26px] leading-tight text-on-primary mb-1">Welcome Back!</h2>
            <p className="font-body-md text-body-md text-on-primary-container max-w-[240px] mx-auto">Manage your procurement with ease across all your needs.</p>
          </div>
        </div>
        <div className="relative z-10">
          <p className="font-label-md text-[10px] text-on-primary-container/60 uppercase tracking-widest">© 2024 One Vendor Solutions</p>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="flex-1 flex items-center justify-center p-6 bg-background overflow-hidden">
        <div className="w-full max-w-[420px] bg-surface-container-lowest p-6 rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] border border-outline-variant/30">
          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-2 mb-3">
            <img src="/logo.jpg" alt="OVS" className="h-8 w-auto rounded" />
            <span className="font-headline-md text-[18px] text-primary font-bold">One Vendor Solutions</span>
          </div>

          <header className="mb-4">
            <h3 className="font-headline-md text-headline-md text-primary mb-0.5">Customer Login</h3>
            <p className="font-body-md text-[13px] text-on-surface-variant">Enter your credentials to access your dashboard.</p>
          </header>

          {error && (
            <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[11px] text-on-surface-variant ml-0.5" htmlFor="login-email">Email</label>
              <input 
                className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-[14px] bg-surface-bright text-on-surface" 
                id="login-email" 
                placeholder="e.g. procurement@academy.edu" 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[11px] text-on-surface-variant ml-0.5" htmlFor="login-password">Password</label>
              <div className="relative">
                <input 
                  className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-[14px] bg-surface-bright text-on-surface" 
                  id="login-password" 
                  placeholder="••••••••" 
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input className="w-3.5 h-3.5 rounded border-outline-variant text-primary focus:ring-secondary transition-all" type="checkbox"/>
                <span className="text-[13px] text-on-surface-variant group-hover:text-primary">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-[12px] font-semibold text-secondary hover:text-on-secondary-fixed-variant transition-colors">Forgot Password?</Link>
            </div>

            <button 
              className="w-full bg-primary py-2.5 rounded-lg flex items-center justify-center gap-2 text-on-primary font-title-lg text-[16px] border-b-[3px] border-secondary hover:translate-y-[-1px] active:translate-y-[1px] active:scale-95 transition-all group disabled:opacity-55" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/50"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-surface-container-lowest px-3 text-on-tertiary-container">or continue with</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border-2 border-primary-container bg-surface-bright text-primary text-[15px] font-semibold hover:bg-surface-container-high transition-all active:scale-95" type="button">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Continue with Google
          </button>

          {/* Signup Link */}
          <div className="mt-3 text-center">
            <p className="text-[13px] text-on-surface-variant">
              New here? 
              <Link to="/signup" className="font-bold text-primary hover:text-secondary transition-colors ml-1">Create an Account →</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
