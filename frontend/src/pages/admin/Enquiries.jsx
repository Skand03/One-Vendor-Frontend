import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminApi } from '../../services/api';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get('/contact-messages');
      setEnquiries(res.data);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleSelectEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDrawer(true);
  };

  const handleResolveMessage = async (id) => {
    try {
      await adminApi.put(`/contact-messages/${id}/status`, { status: 'RESOLVED' });
      setShowDrawer(false);
      loadEnquiries(); // Refresh
    } catch (err) {
      console.error('Error resolving enquiry:', err);
      alert('Failed to update enquiry status.');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry permanently?')) return;
    try {
      await adminApi.delete(`/contact-messages/${id}`);
      setShowDrawer(false);
      loadEnquiries(); // Refresh
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      alert('Failed to delete enquiry.');
    }
  };

  // Filter logic
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
    <div className="w-full">
        {/* Header */}
        
        {/* Content Area */}
        <div className="space-y-6">
          
          {/* Controls Strip */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <input 
                  type="text"
                  placeholder="Search enquiries by name, email, keyword..."
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
                <option value="ALL">All Enquiries</option>
                <option value="UNREAD">New / Unread</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <button 
              onClick={loadEnquiries}
              className="border border-gold-accent text-primary px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold-accent/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Sync
            </button>
          </div>

          {/* Enquiries Grid */}
          <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
                <span className="text-xs text-on-surface-variant font-bold">Retrieving corporate leads...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-dim/40 border-b">
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Client Name</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Message Abstract</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {filteredEnquiries.map((e) => (
                      <tr 
                        key={e.id} 
                        onClick={() => handleSelectEnquiry(e)}
                        className="hover:bg-surface transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <p className="font-bold text-primary">{e.fullName}</p>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          <p>{e.email}</p>
                          <p className="text-[10px] mt-0.5">{e.phone}</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-primary uppercase tracking-wider font-mono">
                          {e.subject}
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant max-w-[200px] truncate">
                          {e.message}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            e.status === 'UNREAD' 
                              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                              : 'bg-green-50 text-green-700 border border-green-200'
                          }`}>
                            {e.status === 'UNREAD' ? 'NEW' : 'RESOLVED'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(ev) => ev.stopPropagation()}>
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleSelectEnquiry(e)}
                              className="font-bold text-gold-accent hover:underline uppercase"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleDeleteEnquiry(e.id)}
                              className="font-bold text-red-500 hover:underline uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredEnquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-on-surface-variant font-medium">No enquiries match the filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Enquiry Detail Drawer */}
      <AnimatePresence>
        {showDrawer && selectedEnquiry && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-[60] border-l border-outline-variant/30 flex flex-col pt-20"
            >
              <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-dim">
                <h3 className="font-poppins font-extrabold text-sm text-primary">Enquiry Details</h3>
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="p-1.5 hover:bg-surface-container rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-gold-accent flex items-center justify-center font-bold text-base border border-gold-accent/25">
                    {selectedEnquiry.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-base">{selectedEnquiry.fullName}</h4>
                    <p className="text-xs text-on-surface-variant">{selectedEnquiry.email}</p>
                    <p className="text-xs text-on-surface-variant">{selectedEnquiry.phone}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wider block">Requirement Subject</span>
                  <p className="text-xs font-bold text-primary uppercase font-mono">{selectedEnquiry.subject}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wider block">Detailed message description</span>
                  <div className="bg-surface-container-low p-4 rounded-xl text-xs text-primary-container leading-relaxed whitespace-pre-line border border-outline-variant/15">
                    "{selectedEnquiry.message}"
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wider block">Submission Metadata</span>
                  <div className="bg-surface-dim/40 p-4 rounded-xl grid grid-cols-2 gap-4 text-[11px] border border-outline-variant/10">
                    <div>
                      <p className="text-on-surface-variant font-bold">Status</p>
                      <p className="font-bold text-primary uppercase tracking-wider mt-0.5">{selectedEnquiry.status}</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant font-bold">Reference ID</p>
                      <p className="font-bold text-primary font-mono mt-0.5">#RFQ-C{selectedEnquiry.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface-container-low border-t border-outline-variant/20 grid grid-cols-2 gap-4">
                {selectedEnquiry.status === 'PENDING' ? (
                  <button 
                    onClick={() => handleResolveMessage(selectedEnquiry.id)}
                    className="bg-primary hover:bg-primary-container text-white py-3 rounded-lg font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    Mark Resolved
                  </button>
                ) : (
                  <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-bold text-center py-3 rounded-lg">
                    Resolved Message
                  </div>
                )}
                
                <a 
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry.fullName)}%2C%20this%20is%20One%20Vendor%20Solutions.%20We%20received%20your%20enquiry%20regarding%20${encodeURIComponent(selectedEnquiry.subject)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-lg font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  WhatsApp Reply
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Enquiries;
