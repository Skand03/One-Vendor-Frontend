import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    alert('Logged out successfully (Supabase Simulation).');
    navigate('/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/enquiries', icon: 'contact_support', label: 'Enquiries' },
    { path: '/admin/bookings', icon: 'event_available', label: 'Bookings' },
    { path: '/admin/products', icon: 'inventory_2', label: 'Catalog' },
    { path: '/admin/settings', icon: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-primary-container dark:bg-primary-container flex flex-col py-md border-r border-secondary/30 shadow-md z-50 text-on-primary-container">
      <div className="px-6 mb-xl">
        <h1 className="font-headline-md text-headline-md font-bold text-surface">ProcureLink</h1>
        <p className="font-label-md text-label-md text-on-primary-container tracking-wider mt-xs">Enterprise Admin</p>
      </div>

      <nav className="flex-grow space-y-1 overflow-y-auto px-4 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-body-md text-body-md transition-all duration-200 ease-in-out ${
                isActive
                  ? 'bg-secondary-container/20 text-secondary-fixed font-bold border-r-4 border-secondary'
                  : 'text-on-primary-container/70 hover:bg-primary hover:text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto pt-md border-t border-on-primary-container/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-on-primary-container/70 hover:text-error transition-colors duration-200 ease-in-out font-body-md text-body-md"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
