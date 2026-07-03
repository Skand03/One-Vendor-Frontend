import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';
import { supabase } from '../../services/supabaseClient';

const BookSlot = () => {
  const [selectedDay, setSelectedDay] = useState(10);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirementType, setRequirementType] = useState('Consultation');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setMetaTags(
      'Book a Sourcing Consultation Slot',
      'Schedule a personalized B2B sourcing consultation slot with our verified vendor experts. Select your preferred date, time, and requirement category.'
    );
  }, []);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleConfirmBooking = async () => {
    if (!fullName || !phone) {
      alert('Please fill in your Full Name and Phone Number first!');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const { error } = await supabase.from('bookings').insert([
        {
          full_name: fullName,
          phone: phone,
          requirement_type: requirementType,
          date: `2024-10-${selectedDay.toString().padStart(2, '0')}`,
          time_slot: selectedTimeSlot
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFullName('');
      setPhone('');
    } catch (err) {
      console.error('Error saving booking:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if a day is selectable
  const calendarDays = [
    { num: 29, currentMonth: false },
    { num: 30, currentMonth: false },
    { num: 1, currentMonth: true },
    { num: 2, currentMonth: true },
    { num: 3, currentMonth: true },
    { num: 4, currentMonth: true },
    { num: 5, currentMonth: true },
    { num: 6, currentMonth: true },
    { num: 7, currentMonth: true },
    { num: 8, currentMonth: true },
    { num: 9, currentMonth: true },
    { num: 10, currentMonth: true },
    { num: 11, currentMonth: true },
    { num: 12, currentMonth: true },
    { num: 13, currentMonth: true },
    { num: 14, currentMonth: true },
    { num: 15, currentMonth: true },
    { num: 16, currentMonth: true },
    { num: 17, currentMonth: true },
    { num: 18, currentMonth: true },
    { num: 19, currentMonth: true },
    { num: 20, currentMonth: true },
    { num: 21, currentMonth: true },
    { num: 22, currentMonth: true },
    { num: 23, currentMonth: true },
    { num: 24, currentMonth: true },
    { num: 25, currentMonth: true },
    { num: 26, currentMonth: true }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter pt-32 pb-xl">
        <div className="mb-lg">
          <h1 className="text-display-lg font-display-lg text-primary mb-xs">Book a Service Slot</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">Streamline your procurement process by scheduling a consultation or inspection with our verified vendor network.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Calendar Selector */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] p-md gold-border-top h-full">
              <div className="flex justify-between items-center mb-md px-2">
                <h2 className="text-headline-md font-headline-md text-primary">October 2024</h2>
                <div className="flex gap-sm">
                  <button className="p-2 hover:bg-surface-container rounded-full transition-all">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="p-2 hover:bg-surface-container rounded-full transition-all">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
              
              <div className="calendar-grid text-center font-label-md text-outline mb-sm">
                <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
              </div>

              <div className="calendar-grid gap-2">
                {calendarDays.map((day, idx) => {
                  if (!day.currentMonth) {
                    return (
                      <div key={idx} className="h-14 flex items-center justify-center text-outline-variant">
                        {day.num}
                      </div>
                    );
                  }
                  
                  const isSelected = selectedDay === day.num;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleDaySelect(day.num)}
                      className={`h-14 flex items-center justify-center rounded-lg font-semibold cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-primary text-on-primary border-2 border-gold-accent shadow-md' 
                          : 'bg-surface-container text-primary hover:bg-surface-container-high border-transparent'
                      }`}
                    >
                      {day.num}
                    </div>
                  );
                })}
              </div>

              <div className="mt-md flex items-center gap-md text-label-md">
                <div className="flex items-center gap-xs"><span className="w-3 h-3 bg-primary border border-gold-accent rounded-sm"></span> Selected</div>
                <div className="flex items-center gap-xs"><span className="w-3 h-3 bg-surface-container rounded-sm"></span> Available</div>
                <div className="flex items-center gap-xs"><span className="w-3 h-3 bg-white border border-outline-variant rounded-sm"></span> Booked</div>
              </div>
            </div>
          </div>

          {/* Time Slot & Summary */}
          <div className="lg:col-span-5 flex flex-col gap-md">
            <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] p-md gold-border-top">
              <h2 className="text-title-lg font-title-lg text-primary mb-md">Select Time Slot</h2>
              
              <div className="space-y-md">
                <div>
                  <span className="font-label-md text-on-surface-variant uppercase mb-sm block">Morning</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
                    {['09:00 AM', '10:30 AM', '11:00 AM'].map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`px-4 py-2 rounded-full border text-body-md font-semibold transition-all ${
                            isSelected 
                              ? 'bg-primary text-on-primary border-primary' 
                              : 'border-outline-variant text-body-md hover:border-gold-accent hover:text-primary'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="font-label-md text-on-surface-variant uppercase mb-sm block">Afternoon</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
                    {['01:30 PM', '03:00 PM', '04:30 PM'].map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`px-4 py-2 rounded-full border text-body-md font-semibold transition-all ${
                            isSelected 
                              ? 'bg-primary text-on-primary border-primary' 
                              : 'border-outline-variant text-body-md hover:border-gold-accent hover:text-primary'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="font-label-md text-on-surface-variant uppercase mb-sm block">Evening</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
                    {['06:00 PM', '07:30 PM'].map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className={`px-4 py-2 rounded-full border text-body-md font-semibold transition-all ${
                            isSelected 
                              ? 'bg-primary text-on-primary border-primary' 
                              : 'border-outline-variant text-body-md hover:border-gold-accent hover:text-primary'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-primary text-on-primary rounded-xl p-md shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[100px]">event_available</span>
              </div>
              <h3 className="text-title-lg font-title-lg mb-md relative z-10">Booking Summary</h3>
              
              <div className="space-y-sm mb-lg relative z-10">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary-fixed">calendar_today</span>
                  <span className="text-body-lg">Thursday, Oct {selectedDay}th, 2024</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary-fixed">schedule</span>
                  <span className="text-body-lg">{selectedTimeSlot}</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary-fixed">verified</span>
                  <span className="text-body-lg">{requirementType}</span>
                </div>
              </div>

              {status === 'success' && (
                <div className="p-3 bg-green-100/10 text-green-300 rounded-lg text-body-md font-semibold mb-4">
                  Booking confirmed successfully! We will contact you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 bg-red-50/10 text-red-600 rounded-lg text-body-md font-semibold mb-4">
                  Booking error. Please check database tables and try again.
                </div>
              )}

              <div className="space-y-sm relative z-10">
                <button 
                  disabled={loading}
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-secondary-fixed text-primary rounded-lg font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md border-b-2 border-gold-accent flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                  ) : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details Form */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(10,35,66,0.05)] p-md gold-border-top">
              <h2 className="text-title-lg font-title-lg text-primary mb-md">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md items-end">
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant">Full Name</label>
                  <input 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 focus:ring-1 focus:ring-gold-accent focus:border-gold-accent outline-none" 
                    placeholder="John Doe" 
                    type="text"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant">Phone Number</label>
                  <input 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 focus:ring-1 focus:ring-gold-accent focus:border-gold-accent outline-none" 
                    placeholder="+91 85760 84127" 
                    type="tel"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant">Requirement Type</label>
                  <select 
                    value={requirementType}
                    onChange={(e) => setRequirementType(e.target.value)}
                    className="w-full border border-outline-variant rounded-lg p-3 focus:ring-1 focus:ring-gold-accent focus:border-gold-accent outline-none bg-white"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Vendor Audit">Vendor Audit</option>
                    <option value="Sample Review">Sample Review</option>
                    <option value="Contract Signing">Contract Signing</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-headline-md font-headline-md text-primary mb-sm">Why Book with One Vendor?</h2>
            <ul className="space-y-md">
              <li className="flex items-start gap-md">
                <div className="bg-surface-container-low p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h4 className="font-bold text-body-lg">Verified Professionals</h4>
                  <p className="text-body-md text-on-surface-variant">Every vendor in our system undergoes a rigorous 50-point compliance check.</p>
                </div>
              </li>
              <li className="flex items-start gap-md">
                <div className="bg-surface-container-low p-2 rounded-lg text-primary">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div>
                  <h4 className="font-bold text-body-lg">Real-time Tracking</h4>
                  <p className="text-body-md text-on-surface-variant">Monitor your service status and deliverables through our integrated dashboard.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-xl aspect-video relative group">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-all z-10"></div>
            <img className="w-full h-full object-cover" alt="Corporate meeting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUYzC5fUrEdaOphkhrhxxkr2q-opOKDszOZKQkIjoiP8xMYxLe9SGxJGMEnIm1M-FUA6h28FytsacS8ZQOXATIf_WVAavSZTEKLUllZFgYvyDw_hnm1XYyel2etkBMheFEeH3TOhaCyTa0M5d4rne93AVVcGKhYnAk7Tkm2bHamOj0krGuqS7iOWL2PDHDilOHSS5UGMywDNqciUTgewEoA5mZR4HuNob7JfDeMB5Raeg8MTYXm3r1iH2QRHDDRW_c6FtNhXP94ik"/>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BookSlot;
