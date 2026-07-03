import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Subscribed to Global Sourcing updates!');
    e.target.reset();
  };

  return (
    <footer className="bg-primary pt-xl pb-10 text-white border-t border-gold-accent/40 relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-accent/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
          {/* Brand Info */}
          <div className="space-y-sm">
            <h3 className="font-headline-md text-headline-md font-bold text-white mb-sm">One Vendor Solutions</h3>
            <p className="font-body-md text-body-md text-surface-variant max-w-xs leading-relaxed">
              Redefining B2B procurement with excellence, reliability, and a focus on long-term partnerships. Your essentials, our priority.
            </p>
            <div className="flex space-x-3 pt-xs">
              <a className="w-10 h-10 rounded-full border border-gold-accent/30 flex items-center justify-center hover:bg-gold-accent hover:text-primary transition-all" href="#">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a className="w-10 h-10 rounded-full border border-gold-accent/30 flex items-center justify-center hover:bg-gold-accent hover:text-primary transition-all" href="#">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
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
                <span>Gorakhpur, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gold-accent text-sm">call</span>
                <span>+91 85760 84127</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gold-accent text-sm">mail</span>
                <span>onevendorsolutions@gmail.com</span>
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
          <span>© 2024 One Vendor Solutions. Premium B2B Procurement. All Rights Reserved.</span>
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
