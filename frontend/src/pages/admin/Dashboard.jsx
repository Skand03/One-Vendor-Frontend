import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../context/AdminAuthContext';
import api, { adminApi } from '../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();

  // Metric States
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingBookings: 0,
    activeBookings: 0,
    totalServices: 0
  });
  
  // List States
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Stats & Lists
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [bookingsRes, enquiriesRes, servicesRes] = await Promise.all([
          adminApi.get('/bookings'),
          adminApi.get('/contact-messages'),
          api.get('/services') // fallback admin or public fetch
        ]);

        const bookings = bookingsRes.data;
        const enquiries = enquiriesRes.data;
        const services = servicesRes.data;

        // Calculate statistics
        const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
        const activeBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS').length;

        setStats({
          totalEnquiries: enquiries.length,
          pendingBookings,
          activeBookings,
          totalServices: services.length
        });

        // Set recent lists (sorted by id desc)
        setRecentBookings(bookings.slice(0, 5));
        setRecentEnquiries(enquiries.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleUpdateBookingStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'PENDING' ? 'CONFIRMED' : 'COMPLETED';
    try {
      await adminApi.put(`/bookings/${id}/status`, { status: nextStatus });
      // Refresh list
      const res = await adminApi.get('/bookings');
      setRecentBookings(res.data.slice(0, 5));
      // Refresh stats
      setStats(prev => ({
        ...prev,
        pendingBookings: res.data.filter(b => b.status === 'PENDING').length,
        activeBookings: res.data.filter(b => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS').length
      }));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleUpdateMessageStatus = async (id) => {
    try {
      await adminApi.put(`/contact-messages/${id}/status`, { status: 'RESOLVED' });
      // Refresh list
      const res = await adminApi.get('/contact-messages');
      setRecentEnquiries(res.data.slice(0, 5));
    } catch (err) {
      console.error('Error updating message status:', err);
    }
  };

  return (
    <div className="w-full">
        {/* Header */}
        
        {/* Dashboard Grid Content */}
        <div className="space-y-8">
          
          {/* Welcome & Action Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-poppins font-extrabold text-primary">Welcome Back, Admin</h2>
              <p className="text-xs text-on-surface-variant mt-1">Here is a quick overview of enquiries and service bookings requiring validation.</p>
            </div>
            <Link 
              to="/admin/bookings" 
              className="bg-primary text-white hover:bg-primary-container px-6 py-3 rounded-lg font-bold text-xs shadow transition-all flex items-center gap-1.5 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Manage Sourcing Slots
            </Link>
          </div>

          {/* Core Metrics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 relative overflow-hidden group hover:border-gold-accent transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-[#000d22]/5 text-primary">
                  <span className="material-symbols-outlined text-[24px]">contact_support</span>
                </div>
                <span className="text-[9px] font-bold text-gold-accent bg-gold-accent/15 px-2 py-0.5 rounded-full uppercase tracking-wider">All-time</span>
              </div>
              <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Total RFQ Enquiries</p>
              <h3 className="font-poppins font-extrabold text-3xl text-primary mt-1">{stats.totalEnquiries}</h3>
              <p className="text-[10px] text-on-surface-variant mt-2 flex items-center gap-1 leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Lead generation active
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 relative overflow-hidden group hover:border-gold-accent transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-red-50 text-red-600">
                  <span className="material-symbols-outlined text-[24px]">event_busy</span>
                </div>
                <span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Action Needed</span>
              </div>
              <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Pending Bookings</p>
              <h3 className="font-poppins font-extrabold text-3xl text-red-600 mt-1">{stats.pendingBookings}</h3>
              <p className="text-[10px] text-on-surface-variant mt-2">Requires site inspector dispatch</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 relative overflow-hidden group hover:border-gold-accent transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <span className="material-symbols-outlined text-[24px]">event_available</span>
                </div>
                <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Scheduled</span>
              </div>
              <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Active SLA Bookings</p>
              <h3 className="font-poppins font-extrabold text-3xl text-green-600 mt-1">{stats.activeBookings}</h3>
              <p className="text-[10px] text-on-surface-variant mt-2">Turnkey work in pipeline</p>
            </div>

            {/* Metric 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 relative overflow-hidden group hover:border-gold-accent transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-[#000d22]/5 text-primary">
                  <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                </div>
                <span className="text-[9px] font-bold text-primary bg-primary-container/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Active SKUs</span>
              </div>
              <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Consolidated Services</p>
              <h3 className="font-poppins font-extrabold text-3xl text-primary mt-1">{stats.totalServices}</h3>
              <p className="text-[10px] text-on-surface-variant mt-2">Active catalog services</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3 bg-white rounded-2xl border border-outline-variant/20">
              <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
              <span className="text-xs text-on-surface-variant font-bold">Loading executive data structures...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Bookings Panel */}
              <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                  <h3 className="font-poppins font-bold text-sm text-primary">Recent Sourcing Slots</h3>
                  <Link to="/admin/bookings" className="text-xs text-gold-accent font-bold hover:underline">View All</Link>
                </div>
                
                <div className="overflow-x-auto flex-grow">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-dim/40 border-b">
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Client</th>
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Preferred Date</th>
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {recentBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-surface transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-bold text-primary">{b.fullName}</p>
                              <p className="text-[10px] text-on-surface-variant mt-0.5">{b.phone}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant font-mono">{b.preferredDate}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              b.status === 'PENDING' ? 'bg-red-50 text-red-600' :
                              b.status === 'CONFIRMED' ? 'bg-green-50 text-green-600' : 'bg-surface-variant text-on-surface-variant'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {b.status !== 'COMPLETED' && (
                              <button 
                                onClick={() => handleUpdateBookingStatus(b.id, b.status)}
                                className="text-[10px] font-bold text-gold-accent hover:underline uppercase"
                              >
                                {b.status === 'PENDING' ? 'Approve' : 'Complete'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {recentBookings.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-on-surface-variant">No slots booked yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Enquiries (Contact Messages) */}
              <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
                  <h3 className="font-poppins font-bold text-sm text-primary">Recent Lead Enquiries</h3>
                  <Link to="/admin/enquiries" className="text-xs text-gold-accent font-bold hover:underline">View All</Link>
                </div>
                
                <div className="overflow-x-auto flex-grow">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-dim/40 border-b">
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Lead Details</th>
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {recentEnquiries.map((m) => (
                        <tr key={m.id} className="hover:bg-surface transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-bold text-primary">{m.fullName}</p>
                              <p className="text-[10px] text-on-surface-variant mt-0.5">{m.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant truncate max-w-[120px]">{m.subject}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              m.status === 'PENDING' ? 'bg-amber-50 text-amber-700' : 'bg-surface-variant text-on-surface-variant'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {m.status === 'PENDING' && (
                              <button 
                                onClick={() => handleUpdateMessageStatus(m.id)}
                                className="text-[10px] font-bold text-gold-accent hover:underline uppercase"
                              >
                                Resolve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {recentEnquiries.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-on-surface-variant">No inquiries received.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        <footer className="px-8 py-6 max-w-container-max mx-auto text-on-surface-variant text-[11px] font-bold uppercase tracking-wider flex justify-between border-t border-outline-variant/20 mt-12">
          <p>© 2024 One Vendor Solutions | Administrative Dashboard</p>
        </footer>
      </div>
      );
};

export default Dashboard;
