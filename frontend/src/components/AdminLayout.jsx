import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin } = useAdminAuth();

  return (
    <div className="min-h-screen bg-surface-dim font-body-md text-on-surface">
      
      {/* ─── DESKTOP SIDEBAR: fixed on left, always visible ─── */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-50">
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* ─── MOBILE SIDEBAR DRAWER ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <AdminSidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── MAIN AREA: offset by sidebar on desktop ─── */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        
        {/* ─── TOP HEADER ─── */}
        <header className="sticky top-0 z-30 h-16 bg-white flex items-center justify-between px-4 lg:px-8 border-b border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <h1 className="font-poppins font-extrabold text-sm sm:text-base text-primary line-clamp-1">
              Procurement Control Room
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-primary text-xs leading-tight truncate max-w-[160px]">
                {admin?.fullName || admin?.email || 'Senior Administrator'}
              </p>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                Lead Executive
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gold-accent text-primary flex items-center justify-center font-bold border border-gold-accent/60 shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            </div>
          </div>
        </header>

        {/* ─── PAGE CONTENT ─── */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
