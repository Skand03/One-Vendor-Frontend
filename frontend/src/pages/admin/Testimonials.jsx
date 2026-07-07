import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api, { adminApi, uploadImage } from '../../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    imageUrl: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      content: '',
      rating: 5,
      imageUrl: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (t) => {
    setEditMode(true);
    setCurrentId(t.id);
    setFormData({
      name: t.name,
      position: t.position || '',
      company: t.company || '',
      content: t.content,
      rating: t.rating || 5,
      imageUrl: t.imageUrl || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        rating: parseInt(formData.rating)
      };

      if (editMode) {
        await adminApi.put(`/testimonials/${currentId}`, payload);
      } else {
        await adminApi.post('/testimonials', payload);
      }

      setShowModal(false);
      loadData();
    } catch (err) {
      console.error('Error saving testimonial:', err);
      alert('Failed to save testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await adminApi.delete(`/testimonials/${id}`);
      loadData();
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      alert('Failed to delete testimonial.');
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (t.content && t.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-poppins font-extrabold text-2xl text-primary">Client Testimonials</h3>
            <p className="text-xs text-on-surface-variant font-medium">Manage client references, feedback ratings, and corporate reviews.</p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add Testimonial
          </button>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search testimonials by client name or feedback..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-outline-variant/60 rounded-lg text-xs focus:ring-1 focus:ring-gold-accent focus:border-gold-accent"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
            <span className="text-xs text-on-surface-variant font-bold mt-2">Loading testimonials...</span>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">rate_review</span>
            <p className="text-xs text-on-surface-variant font-medium mt-2">No testimonials found. Add a review!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-outline-variant/20 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow relative"
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleOpenEditModal(t)}
                    className="p-1.5 bg-surface-dim hover:bg-surface-container-high text-primary rounded-full border border-outline-variant/20 transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[14px] block">edit</span>
                  </button>
                  <button 
                    onClick={(e) => handleDelete(t.id, e)}
                    className="p-1.5 bg-surface-dim hover:bg-red-50 text-red-600 rounded-full border border-outline-variant/20 transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-[14px] block">delete</span>
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-0.5 text-gold-accent mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px] fill-current">star</span>
                    ))}
                  </div>
                  <p className="text-xs text-on-surface-variant italic line-clamp-4">"{t.content}"</p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-dim">
                    <img 
                      src={t.imageUrl || '/logo.jpeg'} 
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-primary">{t.name}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      {t.position} {t.company ? `• ${t.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-[#000d22]/70 flex items-center justify-center p-4 z-[999] overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-t-4 border-gold-accent"
            >
              <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-[#000d22]/5">
                <h4 className="font-poppins font-extrabold text-base text-primary">
                  {editMode ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h4>
                <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Client Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Position</label>
                    <input 
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      placeholder="CEO, Director, Owner..."
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Company</label>
                    <input 
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Company/School Name..."
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Rating (1-5)</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Client Image / Logo</label>
                  <div className="flex gap-2 items-center">
                    <input 
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      placeholder="https://images.unsplash.com/... or upload"
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
                              const res = await uploadImage(e.target.files[0], 'images');
                              setFormData({...formData, imageUrl: res.url});
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
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Testimonial Content</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Enter the client feedback review..."
                    className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                  />
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 border border-outline-variant/50 hover:bg-surface-dim rounded-lg font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="bg-primary hover:bg-primary-container text-white px-5 py-3 rounded-lg font-bold text-xs shadow-md disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
