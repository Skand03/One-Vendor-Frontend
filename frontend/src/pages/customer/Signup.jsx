import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            organization: orgName,
            phone: phone
          }
        }
      });

      if (signUpError) throw signUpError;
      setSuccess(true);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border-t-4 border-green-500 text-center mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600 text-[40px]">check_circle</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Registration Successful!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-5">
            Your account has been created. Please check your email for verification.
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-lg font-title-lg text-[16px] hover:bg-primary-container transition-all active:scale-95 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 flex flex-col md:flex-row overflow-hidden">
      {/* Left Branding Panel */}
      <section className="relative hidden md:flex md:w-[38%] bg-primary-container flex-col justify-between p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-[#0c2b50] to-primary pointer-events-none opacity-90"></div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="OVS" className="h-9 w-auto object-contain rounded" />
            <h1 className="font-headline-md text-[18px] font-bold text-secondary-fixed tracking-tight">One Vendor Solutions</h1>
          </Link>
          <h2 className="font-headline-lg text-[22px] text-on-primary-container leading-tight max-w-[280px] mt-4">
            Join us to track your enquiries &amp; bookings
          </h2>
          <div className="w-16 h-1 bg-secondary-fixed mt-3 rounded-full"></div>
        </div>
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="w-full max-w-[240px]">
            <img alt="OVS Logistics" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-zy3LMwr2ePnydu-dO7KaoCneLIXolUbNqNUDOzGrIohr4_aq0QwulHadUBKWszILvlgFY1y0IszYiT55QtHBi87VjzZeslYtNZSgkw__hEcYGx1DD3NrLhwah1rBd1GMqlrMw-sEFBowgt0atRd7O_YUpmUuJOAt0vKjwUjLcs-qvoSeaXkV94iSRh-2gm9Ec75sDdGhDnwIUzWLuN7qJr0bcVuf3Fz-bEoO9Zi4dJPMVFUxf-s04T2_xWW-5Fn-e-PCyC6kW6E"/>
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] text-on-primary-container/60 uppercase tracking-widest">Premium B2B procurement for schools, offices & organizations.</p>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="flex-1 flex items-center justify-center p-4 md:p-6 bg-surface overflow-hidden">
        {/* Mobile logo */}
        <div className="md:hidden absolute top-4 left-4 flex items-center gap-2">
          <img src="/logo.jpg" alt="OVS" className="h-8 w-auto rounded" />
          <span className="font-headline-md text-[16px] text-primary font-bold">One Vendor Solutions</span>
        </div>

        <div className="w-full max-w-[460px] bg-white p-5 md:p-6 rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] border-t-2 border-secondary-fixed-dim relative">
          <div className="mb-3">
            <h2 className="font-headline-md text-[22px] text-primary mb-0.5">Registration</h2>
            <p className="text-[13px] text-on-surface-variant">Provide your details to create an account.</p>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[12px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[15px]">error</span>
              {error}
            </div>
          )}

          <form className="space-y-2.5" onSubmit={handleSubmit}>
            {/* Row 1: Name + Org */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="space-y-0.5">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="full_name">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[16px]">person</span>
                  <input 
                    className="w-full pl-8 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-[13px] focus:outline-none focus:border-secondary transition-all" 
                    id="full_name" 
                    placeholder="John Doe" 
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="org_name">Organization (Optional)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[16px]">corporate_fare</span>
                  <input 
                    className="w-full pl-8 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-[13px] focus:outline-none focus:border-secondary transition-all" 
                    id="org_name" 
                    placeholder="Acme International" 
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="space-y-0.5">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="email">Work Email</label>
                <input 
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-[13px] focus:outline-none focus:border-secondary transition-all" 
                  id="email" 
                  placeholder="name@company.com" 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="phone">Phone Number</label>
                <input 
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-[13px] focus:outline-none focus:border-secondary transition-all" 
                  id="phone" 
                  placeholder="+91 85760 84127" 
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Password + Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div className="space-y-0.5">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="password">Password</label>
                <input 
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-[13px] focus:outline-none focus:border-secondary transition-all" 
                  id="password" 
                  placeholder="Min 6 characters"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="confirm_password">Confirm Password</label>
                <input 
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-[13px] focus:outline-none focus:border-secondary transition-all" 
                  id="confirm_password" 
                  placeholder="Re-enter password"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 pt-0.5">
              <input 
                className="w-4 h-4 rounded border-outline-variant text-primary-container focus:ring-secondary-fixed-dim" 
                id="terms" 
                required
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label className="text-[12px] text-on-surface-variant" htmlFor="terms">
                I agree to the <Link to="/terms-privacy" className="text-primary font-bold hover:underline">Terms &amp; Conditions</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full py-2.5 bg-primary text-on-primary text-[15px] font-semibold rounded-lg shadow-lg hover:bg-primary-container transition-all active:scale-[0.98] relative group overflow-hidden disabled:opacity-55 flex items-center justify-center gap-2" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  Registering...
                </>
              ) : (
                <>
                  Create Account
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-3 pt-3 border-t border-outline-variant/30 text-center">
            <p className="text-[13px] text-on-surface-variant">
              Already have an account? 
              <Link to="/login" className="text-primary font-bold hover:text-secondary transition-colors ml-1">Login →</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
