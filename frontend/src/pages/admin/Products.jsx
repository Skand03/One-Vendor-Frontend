import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api, { adminApi, uploadImage } from '../../services/api';

const Products = () => {
  // Catalog Data States
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & Edit States
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    imageUrl: '',
    description: ''
  });

  const [saving, setSaving] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');

  const loadCatalogData = async () => {
    setLoading(true);
    try {
      const [catsRes, servsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/services')
      ]);
      setCategories(catsRes.data);
      setServices(servsRes.data);
    } catch (err) {
      console.error('Error fetching catalog data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  const handleOpenAddModal = () => {
    setEditMode(false);
    setCurrentServiceId(null);
    setFormData({
      name: '',
      categoryId: categories[0]?.id || '',
      imageUrl: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (service) => {
    setEditMode(true);
    setCurrentServiceId(service.id);
    setFormData({
      name: service.name,
      categoryId: service.categoryId,
      imageUrl: service.imageUrl || '',
      description: service.description
    });
    setShowModal(true);
  };

  const handleSaveService = async (e) => {
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
        await adminApi.put(`/services/${currentServiceId}`, payload);
      } else {
        await adminApi.post('/services', payload);
      }

      setShowModal(false);
      loadCatalogData(); // Refresh list
    } catch (err) {
      console.error('Error saving service:', err);
      alert(err.response?.data?.message || 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id, e) => {
    e.stopPropagation(); // Avoid triggering edit trigger on row
    if (!window.confirm('Are you sure you want to delete this service from the catalog?')) return;
    
    try {
      await adminApi.delete(`/services/${id}`);
      loadCatalogData(); // Refresh list
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('Failed to delete service.');
    }
  };

  // Filter logic
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategoryId === 'ALL' || s.categoryId === parseInt(selectedCategoryId);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <div className="w-full">
        {/* Header */}
        
        {/* Content Container */}
        <div className="space-y-6">
          
          {/* Header Action Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-poppins font-extrabold text-2xl text-primary">Catalog Management</h3>
              <p className="text-xs text-on-surface-variant">Configure product offerings, site inspection tasks, and base prices.</p>
            </div>
            <button 
              onClick={handleOpenAddModal}
              className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Add New Service SKU
            </button>
          </div>

          {/* Quick Filters */}
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow">
              <div className="relative w-full max-w-md">
                <input 
                  type="text"
                  placeholder="Search service title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent pl-10 pr-4 py-2.5 text-xs"
                />
                <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[18px]">search</span>
              </div>

              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-2.5 text-xs bg-white"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Catalog Listing */}
          <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <span className="material-symbols-outlined animate-spin text-3xl text-gold-accent">sync</span>
                <span className="text-xs text-on-surface-variant font-bold">Loading active catalog catalog...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-dim/40 border-b">
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Image</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Service Title</th>
                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider">Category</th>

                      <th className="px-6 py-4 font-bold text-primary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {filteredServices.map((s) => (
                      <tr 
                        key={s.id} 
                        onClick={() => handleOpenEditModal(s)}
                        className="hover:bg-surface transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20">
                            <img 
                              src={s.imageUrl || "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=100"} 
                              alt={s.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-primary">{s.name}</p>
                          <p className="text-[10px] text-on-surface-variant mt-0.5 line-clamp-1 max-w-sm">{s.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary-container/10 text-primary border border-primary-container/20">
                            {s.categoryName}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleOpenEditModal(s)}
                              className="font-bold text-gold-accent hover:underline uppercase"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={(e) => handleDeleteService(s.id, e)}
                              className="font-bold text-red-500 hover:underline uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredServices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-on-surface-variant font-medium">No items found in the catalog catalog.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit / Add Service Modal overlay */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border-t-4 border-gold-accent pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-dim">
                  <h4 className="font-poppins font-extrabold text-sm text-primary">
                    {editMode ? 'Edit Catalog Service Details' : 'Add New Service Offering'}
                  </h4>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-surface-container rounded-full"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant">close</span>
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="flex-grow overflow-y-auto p-6 space-y-4 text-xs">
                  <div>
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Service Title / Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Science Lab Setup"
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Procurement Category</label>
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
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Service Image URL or Upload Local Image</label>
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
                    <label className="font-label-md text-[10px] text-on-surface-variant font-bold uppercase block mb-1">Detailed Description</label>
                    <textarea 
                      required
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Detailed capability description for catalog layout..."
                      className="w-full rounded-lg border-outline-variant focus:border-gold-accent focus:ring-1 focus:ring-gold-accent p-3 text-body-md"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded-lg text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-primary hover:bg-primary-container text-white px-6 py-2 rounded-lg font-bold text-xs shadow flex items-center gap-1 active:scale-95"
                    >
                      {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                      {saving ? 'Saving...' : 'Save SKU'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;
