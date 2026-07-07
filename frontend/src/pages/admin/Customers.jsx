import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';

const Customers = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLeadContacts = async () => {
      try {
        const [bookingsRes, messagesRes] = await Promise.all([
          adminApi.get('/bookings'),
          adminApi.get('/contact-messages')
        ]);

        const bookings = bookingsRes.data || [];
        const messages = messagesRes.data || [];

        // Consolidate distinct contacts by email
        const map = new Map();

        bookings.forEach(b => {
          if (!b.email) return;
          map.set(b.email.toLowerCase(), {
            fullName: b.fullName,
            email: b.email,
            phone: b.phone,
            source: 'Booking Schedule',
            address: b.address
          });
        });

        messages.forEach(m => {
          if (!m.email) return;
          const key = m.email.toLowerCase();
          if (!map.has(key)) {
            map.set(key, {
              fullName: m.fullName,
              email: m.email,
              phone: m.phone,
              source: 'RFQ Enquiry',
              address: 'Online Enquiry Sourcing'
            });
          }
        });

        setContacts(Array.from(map.values()));
      } catch (err) {
        console.error('Error loading corporate leads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeadContacts();
  }, []);

  const filteredContacts = contacts.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="w-full">
        {/* Header */}
        
        {/* Content Container */}
        <div className="space-y-6">
          <div>
            <h3 className="font-poppins font-extrabold text-2xl text-primary">Client Directory</h3>
            <p className="text-xs text-on-surface-variant">Active corporate procurement representatives, educational institutions, and leads.</p>
          </div>

          {/* Search bar */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
            <div className="relative w-full max-w-md">
              <input 
                type="text"
                placeholder="Search clients by name, email, or telephone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent pl-10 pr-4 py-2.5 text-xs"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[18px]">search</span>
            </div>
          </div>

          {/* Directory Table */}
          <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
                <span className="text-xs text-on-surface-variant font-bold">Consolidating contact database...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-dim/40 border-b">
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Representative Name</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Email Address</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Phone number</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Office / Site Address</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Source Channel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {filteredContacts.map((c, i) => (
                      <tr key={i} className="hover:bg-surface transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-primary">{c.fullName}</p>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">{c.email}</td>
                        <td className="px-6 py-4 text-on-surface-variant font-mono">{c.phone}</td>
                        <td className="px-6 py-4 text-on-surface-variant max-w-[240px] truncate" title={c.address}>
                          {c.address}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            c.source.includes('Booking') ? 'bg-blue-50 text-blue-700' : 'bg-gold-accent/15 text-primary'
                          }`}>
                            {c.source}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredContacts.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-on-surface-variant font-medium">No contacts match the parameters.</td>
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

export default Customers;
