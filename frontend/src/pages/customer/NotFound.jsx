import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';

const NotFound = () => {
  useEffect(() => {
    setMetaTags(
      '404 - Page Not Found',
      'The page you are looking for could not be found on One Vendor Solutions. Return to our homepage to continue exploring bulk procurement solutions.',
      undefined,
      'website',
      { keywords: '404, page not found, error page', robots: 'noindex, nofollow' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#000d22] font-body-md text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-6 py-32 flex flex-col items-center justify-center text-center space-y-6 flex-grow">
        <div className="text-gold-accent text-8xl font-poppins font-extrabold tracking-tight">404</div>
        <div className="space-y-2">
          <h1 className="font-poppins font-bold text-xl">Page Not Found</h1>
          <p className="text-xs text-surface-variant leading-relaxed">
            The page you are looking for does not exist or has been relocated by the system administrator.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="bg-gold-accent hover:bg-[#c5a02e] text-primary px-6 py-3 rounded-lg text-xs font-bold shadow">
            Go Home
          </Link>
          <Link to="/catalog" className="border border-white/20 hover:bg-white/5 text-white px-6 py-3 rounded-lg text-xs font-bold">
            Browse Catalog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
