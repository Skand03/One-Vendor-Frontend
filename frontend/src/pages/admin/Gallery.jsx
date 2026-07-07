import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api, { adminApi, uploadImage } from '../../services/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    imageUrl: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const [catsRes, galRes] = await Promise.all([
        api.get('/categories'),
        api.get('/gallery')
      ]);
      setCategories(catsRes.data);
      setGallery(galRes.data);
    } catch (err) {
      console.error('Error fetching gallery data:', err);
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
      title: '',
      categoryId: categories[0]?.id || '',
      imageUrl: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      categoryId: item.categoryId || '',
      imageUrl: item.imageUrl || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      alert('Please select a valid Category.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...formData,
        categoryId: parseInt(formData.categoryId)
      };

      if (editMode) {
        await adminApi.put(`/gallery/${currentId}`, payload);
      } else {
        await adminApi.post('/gallery', payload);
      }

      setShowModal(false);
      loadData();
    } catch (err) {
      console.error('Error saving gallery item:', err);
      alert('Failed to save item.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await adminApi.delete(`/gallery/${id}`);
      loadData();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
      alert('Failed to delete item.');
    }
  };

  const filteredGallery = gallery.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryId === 'ALL' || g.categoryId === parseInt(selectedCategoryId);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-poppins font-extrabold text-2xl text-primary">Media Gallery</h3>
            <p className="text-xs text-on-surface-variant font-medium">Manage corporate delivery proof, project photos, and product inventory showcases.</p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add Image to Gallery
          </button>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search images by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-outline-variant/60 rounded-lg text-xs focus:ring-1 focus:ring-gold-accent focus:border-gold-accent"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full border border-outline-variant/60 rounded-lg text-xs p-2 focus:ring-1 focus:ring-gold-accent"
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
            <span className="text-xs text-on-surface-variant font-bold mt-2">Loading gallery images...</span>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">photo_library</span>
            <p className="text-xs text-on-surface-variant font-medium mt-2">No gallery images found. Add some photos!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col group hover:shadow-md transition-shadow relative"
              >
                <div className="h-56 overflow-hidden relative bg-surface-dim">
                  <img 
                    src={item.imageUrl || '/logo.jpeg'} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 bg-white/95 hover:bg-white text-primary rounded-full shadow transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[16px] block">edit</span>
                    </button>
                    <button 
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 bg-white/95 hover:bg-red-50 text-red-600 rounded-full shadow transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[16px] block">delete</span>
                    </button>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-white border-t border-outline-variant/10">
                  <div className="truncate pr-4">
                    <h4 className="font-poppins font-bold text-sm text-primary truncate">{item.title}</h4>
                    <span className="text-[9px] font-bold text-gold-accent bg-gold-accent/10 px-1.5 py-0.5 rounded uppercase tracking-wider mt-1 inline-block">
                      {categories.find(c => c.id === item.categoryId)?.name || 'General'}
                    </span>
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
                  {editMode ? 'Edit Gallery Image' : 'Add New Gallery Image'}
                </h4>
                <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-primary">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Image Title</label>
                  <input 
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                  />
                </div>

                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Category Mapping</label>
                  <select 
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Image Upload</label>
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

export default Gallery;
