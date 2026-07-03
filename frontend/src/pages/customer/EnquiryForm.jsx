import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { setMetaTags } from '../../utils/seo';
import { supabase } from '../../services/supabaseClient';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    contactNumber: '',
    email: '',
    category: 'School Essentials',
    detailedRequirement: '',
    preferredSlot: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setMetaTags(
      'Request a Quote',
      'Request a custom wholesale price quote for School, Office, or Home bulk supplies. Upload your procurement list and get a response within 24 hours.'
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
      const { error } = await supabase.from('enquiries').insert([
        {
          full_name: formData.fullName,
          organization: formData.organization,
          contact_number: formData.contactNumber,
          email: formData.email,
          category: formData.category,
          detailed_requirement: formData.detailedRequirement,
          preferred_date: formData.preferredSlot
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        fullName: '',
        organization: '',
        contactNumber: '',
        email: '',
        category: 'School Essentials',
        detailedRequirement: '',
        preferredSlot: ''
      });
    } catch (err) {
      console.error('Error saving enquiry:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="max-w-container-max mx-auto px-gutter pt-32 pb-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          <div className="lg:col-span-5 space-y-md">
            <div className="space-y-sm">
              <span className="text-secondary font-label-md text-label-md tracking-widest uppercase">Premium Procurement</span>
              <h1 className="font-display-lg text-display-lg text-primary leading-tight">Get Your Custom Procurement Plan</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Simplify your supply chain with a dedicated partner. We provide bespoke sourcing solutions for institutions, offices, and large-scale residential needs.
              </p>
            </div>
            
            <div className="space-y-6 pt-md">
              <div className="flex items-start gap-4 p-md bg-white rounded-xl shadow-sm border-l-4 border-secondary">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{fontSize: "28px"}}>payments</span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-primary">Bulk Pricing Models</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Unlock exclusive wholesale rates tailored to your volume requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-md bg-white rounded-xl shadow-sm border-l-4 border-secondary">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{fontSize: "28px"}}>inventory_2</span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-primary">Single Vendor for All Needs</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">One invoice, one point of contact, thousands of categorized products.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-md bg-white rounded-xl shadow-sm border-l-4 border-secondary">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary" style={{fontSize: "28px"}}>speed</span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-primary">Fast Turnaround Times</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Priority processing and logistics for all corporate and educational accounts.</p>
                </div>
              </div>
            </div>

            <div className="pt-md">
              <div className="w-full h-48 rounded-xl bg-cover bg-center premium-card" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZrN-oeJuzdB-dBTI9tpKPe71f2I6vvdP-H3VIjZ2npsxwGos3u6JPK7a2ROs-mB7cMaXs0yymwS-ak6gujey3e4slFaAVerexM6mhKzpey5CRzGPDAyZ1ef-73gIkpIG9INTShcaFLlSlJhS6phvXdhHopk1V6_0cwFYuNt4p5kKPqwgnd_xC4A0nClcadkuVH0JkEXdymfLHeYce5QM0JzSQFVf3cti1XuuWLHSCJF-cQblep_KIr_pqR7KbfVEVVHLYVfYMdHY')"}}></div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-xl premium-card">
              <h2 className="font-headline-md text-headline-md text-primary mb-8">Request a Quotation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface-variant block">Full Name</label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none" 
                      placeholder="John Doe" 
                      required 
                      type="text"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface-variant block">Company/School/Organization</label>
                    <input 
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none" 
                      placeholder="Global Tech Corp" 
                      required 
                      type="text"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface-variant block">Contact Number</label>
                    <input 
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none" 
                      placeholder="+91 85760 84127" 
                      required 
                      type="tel"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface-variant block">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none" 
                      placeholder="john@company.com" 
                      required 
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Requirement Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none bg-white"
                  >
                    <option>School Essentials</option>
                    <option>Office Requirements</option>
                    <option>Home Essentials</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Detailed Requirement</label>
                  <textarea 
                    name="detailedRequirement"
                    value={formData.detailedRequirement}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none resize-none" 
                    placeholder="Describe your procurement needs in detail..." 
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Preferred Date/Slot for Consultation</label>
                  <input 
                    name="preferredSlot"
                    value={formData.preferredSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md gold-border-focus outline-none" 
                    type="datetime-local"
                  />
                </div>

                {status === 'success' && (
                  <div className="p-3 bg-green-100 text-green-800 rounded-lg text-body-md font-semibold">
                    Your quotation enquiry has been sent successfully! We will contact you shortly.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-body-md font-semibold">
                    Error sending request. Please check your network and try again.
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    disabled={loading}
                    className="w-full py-4 bg-primary text-on-primary font-title-lg text-title-lg rounded-lg shadow-lg hover:bg-opacity-90 hover:shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-2 group" 
                    type="submit"
                  >
                    {loading ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    ) : (
                      <>
                        Book My Slot / Send Enquiry
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center font-body-md text-body-md text-on-surface-variant italic mt-4">
                  "We'll contact you within 24 hours on WhatsApp or Call"
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default EnquiryForm;
