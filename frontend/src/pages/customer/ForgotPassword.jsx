import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Reset link resent successfully!');
    }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-secondary-container blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary-fixed-dim blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-[480px] mx-auto min-h-screen flex flex-col justify-center px-4">
        <div className="text-center mb-base">
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">One Vendor Solutions</h1>
        </div>
        <div className="bg-surface-container-lowest premium-card rounded-xl p-lg md:p-xl flex flex-col items-center">
          {step === 1 ? (
            <div className="w-full" id="step-1">
              <div className="text-center mb-lg">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Reset Password</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] mx-auto">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              <form className="space-y-md" id="reset-form" onSubmit={handleReset}>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="email">Work Email</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                    <input 
                      className="w-full h-14 pl-12 pr-4 bg-surface rounded-lg border border-outline-variant outline-none focus:border-secondary transition-all font-body-md text-body-md text-on-surface" 
                      id="email" 
                      placeholder="name@company.com" 
                      required 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  className="w-full h-14 bg-primary text-on-primary rounded-lg font-title-lg text-title-lg flex items-center justify-center gap-sm group hover:bg-[#0A2342] border-b-2 border-secondary transition-all active:scale-[0.98] disabled:opacity-55" 
                  id="submit-btn" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
              <div className="mt-lg text-center">
                <Link to="/login" className="font-label-md text-label-md text-on-surface-variant hover:text-primary flex items-center justify-center gap-xs transition-colors">
                  <span className="material-symbols-outlined text-[18px]">keyboard_backspace</span>
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full fade-in" id="step-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-secondary-container/20 rounded-full flex items-center justify-center mb-lg">
                  <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[40px]">check_circle</span>
                  </div>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Check your email</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
                  We've sent a password reset link to your inbox at <span className="font-semibold text-on-surface" id="display-email">{email}</span>. 
                  Please follow the instructions in the email to regain access to your account.
                </p>
                <div className="w-full space-y-md">
                  <button 
                    className="w-full h-14 border-2 border-primary text-primary rounded-lg font-title-lg text-title-lg hover:bg-primary-container/5 transition-all active:scale-[0.98] disabled:opacity-55" 
                    onClick={handleResend}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Resend Email'}
                  </button>
                  <div className="text-center">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Did not receive the email? Check your spam folder or{' '}
                      <Link to="/contact" className="text-secondary font-semibold hover:underline">Contact Support</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-xl text-center">
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest opacity-60">
            Premium B2B Procurement Infrastructure
          </p>
        </footer>
      </main>
    </>
  );
};

export default ForgotPassword;
