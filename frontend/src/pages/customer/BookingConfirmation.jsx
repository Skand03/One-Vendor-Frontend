import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const categoryName = location.state?.categoryName || 'Sourcing vertical';
  const serviceName = location.state?.serviceName || 'Procurement service';

  // If accessed directly without a booking state, redirect back to Book Slot page
  if (!booking) {
    return <Navigate to="/book-slot" replace />;
  }

  // Format Date nicely
  const formatDate = (dateStr) => {
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (err) {
      return dateStr;
    }
  };

  // Humanize time slot enum
  const formatTimeSlot = (slotStr) => {
    switch (slotStr) {
      case 'MORNING_10_TO_12': return 'Morning (10:00 AM - 12:00 PM)';
      case 'AFTERNOON_12_TO_3': return 'Early Afternoon (12:00 PM - 03:00 PM)';
      case 'AFTERNOON_3_TO_6': return 'Late Afternoon (03:00 PM - 06:00 PM)';
      case 'EVENING_6_TO_8': return 'Evening (06:00 PM - 08:00 PM)';
      default: return slotStr?.replace(/_/g, ' ') || 'ANYTIME';
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar />

      <main className="max-w-xl mx-auto px-gutter pt-32 pb-xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20"
        >
          {/* Header Banner */}
          <div className="bg-primary text-center py-10 px-6 border-b-4 border-gold-accent relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-accent via-transparent to-transparent"></div>
            
            {/* Animated Checkmark Circle */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-gold-accent text-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <span className="material-symbols-outlined text-[36px] font-bold">check</span>
            </motion.div>
            
            <h2 className="text-2xl font-poppins font-extrabold text-white">Booking Confirmed!</h2>
            <p className="text-surface-variant text-xs mt-1">Thank you for choosing One Vendor Solutions.</p>
          </div>

          {/* Details Area */}
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center bg-[#000d22]/5 px-4 py-3 rounded-lg border border-gold-accent/15">
              <span className="text-xs font-bold text-primary font-label-md uppercase tracking-wider">Booking Ref:</span>
              <span className="text-xs font-bold text-gold-accent font-mono">#OVS-B{booking.id?.toString().padStart(4, '0')}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Sourcing Vertical:</span>
                <span className="font-bold text-primary">{categoryName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Selected Service:</span>
                <span className="font-bold text-primary">{serviceName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Inspection Date:</span>
                <span className="font-bold text-primary">{formatDate(booking.preferredDate)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Time Window:</span>
                <span className="font-bold text-primary">{formatTimeSlot(booking.timeSlot)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Client Name:</span>
                <span className="font-bold text-primary">{booking.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Site Phone:</span>
                <span className="font-bold text-primary">{booking.phone}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-on-surface-variant">Sourcing Address:</span>
                <span className="font-bold text-primary text-right max-w-[65%] truncate">{booking.address}</span>
              </div>
            </div>

            <div className="bg-[#25D366]/5 border border-[#25D366]/20 p-4 rounded-xl space-y-2">
              <h5 className="font-bold text-[#20ba5a] text-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">chat</span>
                Verify via WhatsApp
              </h5>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                We've logged your booking in our system. You can verify your slot directly with our relations executive to speed up file assignments.
              </p>
              <a 
                href={`https://wa.me/918576084127?text=Hello%20One%20Vendor%20Solutions,%20I%20have%20submitted%20a%20booking%20for%20${encodeURIComponent(serviceName)}%20on%20${encodeURIComponent(booking.preferredDate)}.%20Reference%20%23OVS-B${booking.id}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-1 shadow"
              >
                Send WhatsApp Verification
              </a>
            </div>

            <div className="pt-4 flex gap-4">
              <Link 
                to="/" 
                className="flex-1 bg-primary text-white text-center py-3.5 rounded-lg text-xs font-bold hover:bg-primary-container transition-all"
              >
                Back to Home
              </Link>
              <Link 
                to="/catalog" 
                className="flex-1 border border-outline-variant/35 text-center py-3.5 rounded-lg text-xs font-bold hover:bg-surface-container-low transition-all text-primary"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
