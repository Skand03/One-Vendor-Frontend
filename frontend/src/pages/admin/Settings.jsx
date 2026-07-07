import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { adminApi, uploadImage } from '../../services/api';

const Settings = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    whatsappNumber: '',
    aboutText: '',
    logoUrl: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await api.get('/settings');
        if (res.data) {
          setFormData({
            companyName: res.data.companyName || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            address: res.data.address || '',
            whatsappNumber: res.data.whatsappNumber || '',
            aboutText: res.data.aboutText || '',
            logoUrl: res.data.logoUrl || ''
          });
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      await adminApi.put('/settings', formData);
      setStatus('success');
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
        {/* Header */}
        
        {/* Content Container */}
        <div className="p-8 max-w-2xl mx-auto space-y-6">
          <div className="mb-2">
            <h3 className="font-poppins font-extrabold text-2xl text-primary">Global Settings</h3>
            <p className="text-xs text-on-surface-variant">Update support coordinates, WhatsApp widgets, and company footer information.</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
              <span className="text-xs text-on-surface-variant font-bold mt-2">Loading core configurations...</span>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Company Name</label>
                    <input 
                      required
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Support Email Address</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Support Phone</label>
                    <input 
                      required
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">WhatsApp Sourcing Number</label>
                    <input 
                      required
                      type="text"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Company Address</label>
                  <input 
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                  />
                </div>

                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Logo URL or Upload Local Image</label>
                  <div className="flex gap-2 items-center">
                    <input 
                      type="text"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md font-mono"
                    />
                    <label className="bg-surface-dim hover:bg-surface-container cursor-pointer border border-outline-variant/50 text-primary px-4 py-3 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                      <input 
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            try {
                              const res = await uploadImage(e.target.files[0]);
                              setFormData({...formData, logoUrl: res.url});
                            } catch(err) {
                              alert('Upload failed: ' + err.message);
                            }
                          }
                        }}
                      />
                      Upload File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Company About Overview (Footer)</label>
                  <textarea 
                    rows="3"
                    name="aboutText"
                    value={formData.aboutText}
                    onChange={handleChange}
                    className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl font-bold animate-fadeIn">
                    Settings saved successfully! Fresh configs are active globally.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold animate-fadeIn">
                    Failed to save settings. Please check parameters and database state.
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-outline-variant/20">
                  <button 
                    type="submit"
                    disabled={saving}
                    className="bg-primary hover:bg-primary-container text-white px-8 py-3 rounded-lg font-bold text-xs shadow-lg flex items-center gap-1.5 active:scale-95"
                  >
                    {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>

              </form>
            </motion.div>
          )}
        </div>
      </div>
      );
};

export default Settings;
