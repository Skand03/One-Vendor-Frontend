import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Footer = () => {
  const [settings, setSettings] = useState(null);
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (err) {
        console.error('Error loading settings in footer:', err);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Subscribed to Global Sourcing updates!');
    e.target.reset();
  };

  const defaultSettings = {
    companyName: 'One Vendor Solutions',
    email: 'onevendorsolutions@gmail.com',
    phone: '+91 85760 84127',
    address: 'Near water sport complex gorakhpur, Uttar Pradesh, India',
    instagramUrl: 'https://www.instagram.com/onevendor.solutions?igsh=dDNoMWw1eHhxdHRn',
    aboutText: 'Redefining B2B procurement with excellence, reliability, and a focus on long-term partnerships. Your essentials, our priority.'
  };

  const currentSettings = settings || defaultSettings;

  return (
    <footer className="bg-primary pt-xl pb-10 text-white border-t border-gold-accent/40 relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-accent/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
          {/* Brand Info */}
          <div className="space-y-sm">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src="/logo.jpeg" alt="One Vendor Solutions" className="h-12 w-auto object-contain rounded" />
            </Link>
            <p className="font-body-md text-body-md text-surface-variant max-w-xs leading-relaxed">
              {currentSettings.aboutText}
            </p>
            <div className="flex space-x-3 pt-xs">
              <a className="w-10 h-10 rounded-full border border-gold-accent/30 flex items-center justify-center hover:bg-gold-accent hover:text-primary transition-all" href="#" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {currentSettings.instagramUrl && (
                <a className="w-10 h-10 rounded-full border border-gold-accent/30 flex items-center justify-center hover:bg-gold-accent hover:text-primary transition-all" href={currentSettings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-sm">
            <h4 className="font-title-lg text-title-lg text-gold-accent font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-surface-variant font-body-md">
              <li><Link to="/" className="hover:text-gold-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold-accent transition-colors">About Us</Link></li>
              <li><a className="hover:text-gold-accent transition-colors" href="#">Vendor Onboarding</a></li>
              <li><Link to="/catalog" className="hover:text-gold-accent transition-colors">Product Categories</Link></li>
              <li><Link to="/terms-privacy" className="hover:text-gold-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-sm">
            <h4 className="font-title-lg text-title-lg text-gold-accent font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-surface-variant font-body-md">
              <li className="flex items-start space-x-2">
                <span className="material-symbols-outlined text-gold-accent text-sm mt-0.5">location_on</span>
                <span>{currentSettings.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gold-accent text-sm">call</span>
                <span>{currentSettings.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gold-accent text-sm">mail</span>
                <span>{currentSettings.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Sourcing */}
          <div className="space-y-sm">
            <h4 className="font-title-lg text-title-lg text-gold-accent font-semibold">Global Sourcing</h4>
            <p className="font-body-md text-body-md text-surface-variant leading-relaxed">
              Subscribe to get the latest bulk pricing updates and seasonal catalogues.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input 
                className="bg-primary-container border-none text-white p-3 rounded-l-lg w-full focus:ring-1 focus:ring-gold-accent focus:outline-none" 
                placeholder="Email Address" 
                required 
                type="email"
              />
              <button className="bg-gold-accent text-primary px-4 rounded-r-lg font-bold hover:bg-[#c5a02e] transition-colors" type="submit">
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-on-primary-container/20 pt-8 flex flex-col md:flex-row justify-between items-center text-on-primary-container font-label-md text-xs">
          <span>© {new Date().getFullYear()} {currentSettings.companyName}. Premium B2B Procurement. All Rights Reserved.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms-privacy" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/terms-privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
