import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminApi } from '../../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Fetch all bookings
  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminApi.put(`/bookings/${id}/status`, { status });
      loadBookings(); // Refresh list
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status.');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking permanently?')) return;
    try {
      await adminApi.delete(`/bookings/${id}`);
      loadBookings(); // Refresh list
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete booking.');
    }
  };

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const humanizeTimeSlot = (slotStr) => {
    switch (slotStr) {
      case 'MORNING_10_TO_12': return '10:00 AM - 12:00 PM';
      case 'AFTERNOON_12_TO_3': return '12:00 PM - 03:00 PM';
      case 'AFTERNOON_3_TO_6': return '03:00 PM - 06:00 PM';
      case 'EVENING_6_TO_8': return '06:00 PM - 08:00 PM';
      default: return slotStr?.replace(/_/g, ' ') || 'ANYTIME';
    }
  };

  return (
    <div className="w-full">
        {/* Header */}
        
        {/* Content Container */}
        <div className="space-y-6">
          
          {/* Filters & Actions bar */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <input 
                  type="text"
                  placeholder="Search bookings by client, phone, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent pl-10 pr-4 py-2.5 text-xs"
                />
                <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[18px]">search</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-2.5 text-xs bg-white"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <button 
              onClick={loadBookings}
              className="border border-gold-accent text-primary px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold-accent/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Sync
            </button>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
                <span className="text-xs text-on-surface-variant font-bold">Retrieving booking schedules...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-dim/40 border-b">
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Client / Contact</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Address / Site</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Appointment</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-surface transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-primary">{b.fullName}</p>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">{b.email} • {b.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant max-w-[200px] truncate" title={b.address}>
                          {b.address}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-primary font-mono">{b.preferredDate}</p>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">{humanizeTimeSlot(b.timeSlot)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            b.status === 'PENDING' ? 'bg-red-50 text-red-600' :
                            b.status === 'CONFIRMED' ? 'bg-green-50 text-green-600' :
                            b.status === 'COMPLETED' ? 'bg-blue-50 text-blue-600' : 'bg-surface-variant text-on-surface-variant'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          {b.status === 'PENDING' && (
                            <button 
                              onClick={() => handleUpdateStatus(b.id, 'CONFIRMED')}
                              className="font-bold text-green-600 hover:underline uppercase"
                            >
                              Approve
                            </button>
                          )}
                          {b.status === 'CONFIRMED' && (
                            <button 
                              onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                              className="font-bold text-blue-600 hover:underline uppercase"
                            >
                              Complete
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteBooking(b.id)}
                            className="font-bold text-red-500 hover:underline uppercase"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-on-surface-variant font-medium">No bookings match the filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      );
};

export default Bookings;
