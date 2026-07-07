import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout } = useAdminAuth();
  const currentPath = location.pathname;

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/enquiries', icon: 'contact_support', label: 'Enquiries' },
    { path: '/admin/bookings', icon: 'event_available', label: 'Bookings' },
    { path: '/admin/products', icon: 'inventory_2', label: 'Catalog' },
    { path: '/admin/settings', icon: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#000d22] flex flex-col py-6 border-r border-gold-accent/20 shadow-xl z-50 text-white">
      <div className="px-6 mb-8 space-y-1">
        <h1 className="font-poppins font-extrabold text-xl text-gold-accent">One Vendor</h1>
        <p className="font-label-md text-[10px] text-surface-variant tracking-wider uppercase">Enterprise Admin</p>
      </div>

      <nav className="flex-grow space-y-1 overflow-y-auto px-4 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gold-accent/15 text-gold-accent border-l-4 border-gold-accent shadow-sm'
                  : 'text-surface-variant/70 hover:bg-primary-container hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-4 border-t border-outline-variant/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-lg text-xs font-bold text-surface-variant/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
