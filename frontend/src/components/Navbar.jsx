import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ transparent = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially to set correct state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHeaderTransparent = transparent && !isScrolled;

  const getLinkClass = (path) => {
    const baseClass = "font-body-md text-body-md transition-colors ";
    const activeClass = isHeaderTransparent
      ? "text-gold-accent font-semibold border-b-2 border-gold-accent pb-1"
      : "text-primary font-semibold border-b-2 border-gold-accent pb-1";
    
    const inactiveClass = isHeaderTransparent
      ? "text-white/90 hover:text-gold-accent"
      : "text-on-surface-variant hover:text-primary";
    
    if (path === '/' && currentPath === '/') {
      return baseClass + activeClass;
    }
    if (path !== '/' && currentPath.startsWith(path)) {
      return baseClass + activeClass;
    }
    return baseClass + inactiveClass;
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 ${
        isHeaderTransparent 
          ? 'bg-[#000000]/25 backdrop-blur-sm border-b border-white/5 shadow-none' 
          : 'bg-surface/95 backdrop-blur-md shadow-[0px_4px_20px_rgba(10,35,66,0.05)] border-b border-outline-variant/30'
      }`}
    >
      <div className="max-w-container-max mx-auto px-gutter h-full flex justify-between items-center">
        <Link className="flex items-center gap-2 h-full py-2" to="/">
          <img src="/logo.jpg" alt="One Vendor Solutions" className="h-14 w-auto object-contain rounded" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/about" className={getLinkClass('/about')}>About Us</Link>
          <Link to="/catalog" className={getLinkClass('/catalog')}>Categories</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact Us</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Book a Service Button */}
          <Link to="/book-slot" className="hidden sm:flex bg-gold-accent text-primary font-label-md text-label-md px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all hover:bg-[#c5a02e] hover:scale-105 active:scale-95 shadow-md items-center justify-center">
            Book a Service / Enquiry
          </Link>

          {/* Profile / Login Button */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
                  isHeaderTransparent
                    ? 'border-white/40 bg-white/10 hover:bg-white/20 text-white'
                    : 'border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">person</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-2xl border border-outline-variant/20 overflow-hidden animate-fadeIn z-[60]">
                  <div className="px-4 py-3 bg-surface-container-lowest border-b border-outline-variant/20">
                    <p className="font-label-md text-label-md text-primary font-bold truncate">
                      {user?.fullName || 'Customer'}
                    </p>
                    <p className="text-[11px] text-on-surface-variant truncate">
                      {user?.email || 'customer@ovs.com'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/my-account"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-body-md text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">account_circle</span>
                      My Account
                    </Link>
                    <Link
                      to="/book-slot"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-body-md text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
                      My Bookings
                    </Link>
                    <Link
                      to="/enquiry"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-body-md text-on-surface hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">receipt_long</span>
                      My Enquiries
                    </Link>
                  </div>
                  <div className="border-t border-outline-variant/20 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-body-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
                isHeaderTransparent
                  ? 'border-white/40 bg-white/10 hover:bg-white/20 text-white'
                  : 'border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary'
              }`}
              title="Login / Sign Up"
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              isHeaderTransparent ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">{showMobileMenu ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-outline-variant/20 animate-fadeIn z-[55]">
          <nav className="flex flex-col p-4 gap-1">
            <Link to="/" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">home</span> Home
            </Link>
            <Link to="/about" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">info</span> About Us
            </Link>
            <Link to="/catalog" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">category</span> Categories
            </Link>
            <Link to="/contact" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">mail</span> Contact Us
            </Link>
            <div className="border-t border-outline-variant/20 mt-2 pt-2">
              <Link to="/book-slot" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold-accent text-primary font-bold text-body-md transition-colors">
                <span className="material-symbols-outlined text-[20px]">event_available</span> Book a Service / Enquiry
              </Link>
              {!isLoggedIn && (
                <Link to="/login" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md text-primary font-semibold hover:bg-surface-container-high transition-colors mt-1">
                  <span className="material-symbols-outlined text-[20px]">login</span> Login / Sign Up
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
