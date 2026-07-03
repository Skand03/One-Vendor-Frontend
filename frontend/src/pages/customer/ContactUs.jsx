import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';
import { supabase } from '../../services/supabaseClient';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setMetaTags(
      'Contact Us',
      'Get in touch with One Vendor Solutions. Reach our procurement specialist team for custom wholesale orders, vendor partnership details, and product information.'
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Error saving contact message:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-xl px-md md:px-lg">
        <div className="max-w-container-max mx-auto">
          <div className="mb-xl text-center md:text-left">
            <h1 className="font-display-lg text-display-lg text-primary mb-xs">Get in Touch</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Our procurement specialists are ready to assist your organization with tailored inventory solutions. Reach out via the form or contact details below.
            </p>
            <div className="w-24 h-1 bg-secondary mt-md rounded-full mx-auto md:mx-0"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
            <div className="lg:col-span-5 space-y-md">
              <div className="space-y-base">
                <h2 className="font-headline-md text-headline-md text-primary mb-sm">Contact Information</h2>

                <div className="space-y-sm">
                  <div className="flex items-start gap-sm group">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Address</p>
                      <p className="font-body-lg text-body-lg text-on-surface">Gorakhpur, Uttar Pradesh, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-sm group">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Phone</p>
                      <p className="font-body-lg text-body-lg text-on-surface">+91 85760 84127</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-sm group">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Email</p>
                      <p className="font-body-lg text-body-lg text-on-surface">onevendorsolutions@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-sm group">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">Business Hours</p>
                      <p className="font-body-lg text-body-lg text-on-surface">Mon-Fri: 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-lg">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden premium-shadow group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAhccbLOXogwe9TC0oa7exBuLvZ0lT4EQi4HrOT7Ku_Xpp-zKWq0xgNKoXtgCJxNuRFeDJj-AEYIdde5eLYOKTeS5Y2RCbeyVjcJs6-rOQT8CJUkVWYcEgXh39lKLxWZ3o9ToCLhi_wdbDzDdKj16ps8n5aFgV5K40SXailGJ4NrntVn2KyH3BUF6SX7W8VL5O6WT_JxX6r3PEpADaR7Eb27DMK0Y-VMJOXwGmDO6zGlUXpzr3hzQDQKF5i-Gq24R7EsPrfwD3Bys')"}}
                  ></div>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  <div className="absolute bottom-md left-md">
                    <a className="inline-flex items-center gap-xs bg-on-primary text-primary px-md py-sm rounded-lg font-label-md text-label-md premium-shadow hover:bg-secondary hover:text-on-secondary transition-all active:scale-95" href="https://maps.google.com" target="_blank" rel="noreferrer">
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-on-primary p-md md:p-xl rounded-lg premium-shadow border-t-[6px] border-secondary relative overflow-hidden">
                <div className="absolute top-0 right-0 p-lg opacity-[0.03] pointer-events-none">
                  <span className="material-symbols-outlined text-[120px] text-primary">contact_support</span>
                </div>
                
                <form className="space-y-md relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block">Full Name</label>
                      <input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-secondary focus:outline-none transition-colors bg-surface-container-lowest" 
                        placeholder="John Doe" 
                        required 
                        type="text"
                      />
                    </div>
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block">Email Address</label>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-secondary focus:outline-none transition-colors bg-surface-container-lowest" 
                        placeholder="john@company.com" 
                        required 
                        type="email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block">Phone Number</label>
                      <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-secondary focus:outline-none transition-colors bg-surface-container-lowest" 
                        placeholder="+91 85760 84127" 
                        type="tel"
                      />
                    </div>
                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block">Subject</label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-secondary focus:outline-none transition-colors bg-surface-container-lowest" 
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="quote">Request a Quote</option>
                        <option value="partnership">B2B Partnership</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant block">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-secondary focus:outline-none transition-colors bg-surface-container-lowest" 
                      placeholder="How can we help your organization today?" 
                      required 
                      rows="5"
                    ></textarea>
                  </div>

                  {status === 'success' && (
                    <div className="p-3 bg-green-100 text-green-800 rounded-lg text-body-md font-semibold">
                      Your message has been sent successfully! We will contact you soon.
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-body-md font-semibold">
                      Error sending message. Please try again.
                    </div>
                  )}
                  
                  <button 
                    disabled={loading}
                    className="w-full md:w-auto bg-secondary-container text-on-secondary-fixed font-bold font-label-md text-label-md py-sm px-xl rounded-lg premium-shadow hover:bg-secondary hover:text-on-secondary transition-all active:scale-[0.98] gold-border-gradient uppercase tracking-widest flex items-center justify-center gap-sm" 
                    type="submit"
                  >
                    {loading ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    )}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ContactUs;
