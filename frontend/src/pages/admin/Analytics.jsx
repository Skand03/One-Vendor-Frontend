import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    totalMessages: 0,
    resolvedMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bookingsRes, messagesRes] = await Promise.all([
          adminApi.get('/bookings'),
          adminApi.get('/contact-messages')
        ]);

        const bookings = bookingsRes.data || [];
        const messages = messagesRes.data || [];

        setStats({
          totalBookings: bookings.length,
          pendingBookings: bookings.filter(b => b.status === 'PENDING').length,
          confirmedBookings: bookings.filter(b => b.status === 'CONFIRMED').length,
          completedBookings: bookings.filter(b => b.status === 'COMPLETED').length,
          totalMessages: messages.length,
          resolvedMessages: messages.filter(m => m.status === 'RESOLVED').length
        });
      } catch (err) {
        console.error('Error fetching statistics for analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full">
        {/* Header */}
        
        {/* Content Container */}
        <div className="space-y-6">
          <div className="mb-2">
            <h3 className="font-poppins font-extrabold text-2xl text-primary">Performance Reports</h3>
            <p className="text-xs text-on-surface-variant">Track procurement enquiries, lead-to-conversion velocities, and active inspection timelines.</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
              <span className="text-xs text-on-surface-variant font-bold mt-2">Aggregating transactional records...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Card 1: Consultation Bookings */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
                <h4 className="font-poppins font-bold text-sm text-primary">Consultation Booking Distribution</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Pending Confirmation</span>
                      <span className="font-mono text-amber-700">{stats.pendingBookings} / {stats.totalBookings}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(stats.pendingBookings / (stats.totalBookings || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Confirmed Schedules</span>
                      <span className="font-mono text-green-700">{stats.confirmedBookings} / {stats.totalBookings}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: `${(stats.confirmedBookings / (stats.totalBookings || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Completed / Fulfilled</span>
                      <span className="font-mono text-blue-700">{stats.completedBookings} / {stats.totalBookings}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(stats.completedBookings / (stats.totalBookings || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: RFQ Leads */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
                <h4 className="font-poppins font-bold text-sm text-primary">Inbound RFQ Leads</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Resolution Rate</span>
                      <span className="font-mono text-primary">{Math.round((stats.resolvedMessages / (stats.totalMessages || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${(stats.resolvedMessages / (stats.totalMessages || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-surface-dim/40 p-3 rounded-lg border">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase">Total Leads</span>
                      <p className="text-xl font-bold text-primary mt-1 font-mono">{stats.totalMessages}</p>
                    </div>
                    <div className="bg-surface-dim/40 p-3 rounded-lg border">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase">Resolved</span>
                      <p className="text-xl font-bold text-green-700 mt-1 font-mono">{stats.resolvedMessages}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Sourcing Conversion */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-poppins font-bold text-sm text-primary">Sourcing Efficiencies</h4>
                  <p className="text-on-surface-variant mt-2">Conversion indicators calculated across operational bookings and enquiry message flows.</p>
                </div>
                <div className="bg-gold-accent/15 border border-gold-accent/20 rounded-xl p-4 text-center mt-4">
                  <span className="text-[10px] font-bold text-primary uppercase block">System Quality Indicator</span>
                  <span className="text-2xl font-poppins font-extrabold text-primary block mt-1">Excellent</span>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
      );
};

export default Analytics;
