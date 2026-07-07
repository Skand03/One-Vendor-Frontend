import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

const EnquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEnquiryDetails = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get(`/contact-messages`);
      const list = res.data || [];
      const item = list.find(x => x.id.toString() === id);
      if (item) {
        setEnquiry(item);
      }
    } catch (err) {
      console.error('Error fetching enquiry details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiryDetails();
  }, [id]);

  const handleResolveMessage = async () => {
    try {
      await adminApi.put(`/contact-messages/${id}/status`, { status: 'RESOLVED' });
      fetchEnquiryDetails(); // Reload details
    } catch (err) {
      console.error('Error resolving enquiry:', err);
      alert('Failed to update enquiry status.');
    }
  };

  return (
    <div className="w-full">
        {/* Header */}
        
        {/* Content Container */}
        <div className="p-8 max-w-2xl mx-auto space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
              <span className="text-xs text-on-surface-variant font-bold mt-2">Loading specification...</span>
            </div>
          ) : !enquiry ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
              <span className="material-symbols-outlined text-6xl text-outline-variant">error</span>
              <h3 className="text-lg font-bold text-primary">Enquiry Record Not Found</h3>
              <p className="text-xs text-on-surface-variant">The requested enquiry reference does not exist or has been deleted.</p>
              <Link to="/admin/enquiries" className="inline-block bg-primary text-white font-bold px-6 py-2 rounded-lg text-xs">
                Back to Enquiries
              </Link>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm space-y-6 text-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container text-gold-accent flex items-center justify-center font-bold text-base border">
                  {enquiry.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base">{enquiry.fullName}</h4>
                  <p className="text-on-surface-variant mt-0.5">{enquiry.email} • {enquiry.phone}</p>
                </div>
              </div>

              <div className="w-full h-px bg-outline-variant/20"></div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wider block">Subject Reference</span>
                <p className="font-bold text-primary uppercase font-mono text-sm">{enquiry.subject}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gold-accent uppercase tracking-wider block">Requirement Body</span>
                <div className="bg-surface-dim/50 p-4 rounded-xl text-primary leading-relaxed whitespace-pre-line border">
                  "{enquiry.message}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-dim/40 p-4 rounded-xl border">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">Status</span>
                  <p className="font-bold text-primary uppercase tracking-wider mt-1">{enquiry.status}</p>
                </div>
                <div className="bg-surface-dim/40 p-4 rounded-xl border">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">Enquiry ID</span>
                  <p className="font-bold text-primary font-mono mt-1">#RFQ-{enquiry.id}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex gap-4">
                {enquiry.status === 'PENDING' && (
                  <button 
                    onClick={handleResolveMessage}
                    className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-bold shadow transition-all active:scale-[0.98]"
                  >
                    Mark Resolved
                  </button>
                )}
                
                <a 
                  href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enquiry.fullName)}%2C%20this%20is%20One%20Vendor%20Solutions.%20We%20received%20your%20enquiry%20regarding%20${encodeURIComponent(enquiry.subject)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-lg font-bold text-center flex items-center justify-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  WhatsApp Reply
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      );
};

export default EnquiryDetail;
