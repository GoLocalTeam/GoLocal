import React, { useState, useEffect } from 'react';
import { shopAPI } from '../services/api';
import { Plus, Edit, Trash2, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const initialForm = {
  name: '',
  description: '',
  category: '',
  contact: '',
  type: 'service',
  location: { address: '' },
  workingHours: { weekdays: { open: '', close: '' }, weekends: { open: '', close: '' } },
};

const MyShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [currentShopId, setCurrentShopId] = useState(null);

  // Fetch shops owned by the shopkeeper
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const res = await shopAPI.getAllShops();
      // Only show shops owned by the logged-in shopkeeper
      const myShops = res.data.data.filter(shop => shop.owner === user.id || shop.owner === user._id);
      setShops(myShops);
    } catch (err) {
      toast.error('Failed to load shops');
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setForm(initialForm);
    setEditMode(false);
    setShowModal(true);
  };

  const openEditModal = (shop) => {
    setForm({ ...shop, location: shop.location || { address: '' }, workingHours: shop.workingHours || { weekdays: { open: '', close: '' }, weekends: { open: '', close: '' } } });
    setEditMode(true);
    setCurrentShopId(shop._id);
    setShowModal(true);
  };

  const handleDelete = async (shopId) => {
    if (!window.confirm('Are you sure you want to delete this shop?')) return;
    try {
      await shopAPI.deleteShop(shopId);
      toast.success('Shop deleted');
      fetchShops();
    } catch (err) {
      toast.error('Failed to delete shop');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      setForm({ ...form, location: { ...form.location, [name.split('.')[1]]: value } });
    } else if (name.startsWith('workingHours.')) {
      const [_, day, field] = name.split('.');
      setForm({
        ...form,
        workingHours: {
          ...form.workingHours,
          [day]: { ...form.workingHours[day], [field]: value },
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await shopAPI.updateShop(currentShopId, form);
        toast.success('Shop updated');
      } else {
        await shopAPI.createShop(form);
        toast.success('Shop created');
      }
      setShowModal(false);
      fetchShops();
    } catch (err) {
      toast.error('Failed to save shop');
    }
  };

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-darkText flex items-center gap-2">
          <Store className="w-6 h-6 text-primary" /> My Shops
        </h2>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition">
          <Plus className="w-5 h-5" /> Add Shop
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : shops.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-darkTextSecondary py-12">No shops found. Click "Add Shop" to create your first shop.</div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map(shop => (
            <motion.div key={shop._id} className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2">
                <Store className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-darkText">{shop.name}</h3>
              </div>
              <div className="text-gray-600 dark:text-darkTextSecondary text-sm mb-2">{shop.description}</div>
              <div className="flex flex-wrap gap-2 text-xs mb-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">{shop.category}</span>
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded">{shop.type}</span>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded">{shop.status}</span>
              </div>
              <div className="text-gray-500 dark:text-darkTextSecondary text-xs mb-2">{shop.location?.address}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEditModal(shop)} className="flex-1 px-3 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => handleDelete(shop._id)} className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="relative bg-lightCard dark:bg-darkCard rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200 dark:scrollbar-thumb-darkBorder dark:scrollbar-track-gray-700"
            onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-primary dark:hover:text-primary text-2xl font-bold focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-darkText">{editMode ? 'Edit Shop' : 'Add Shop'}</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Shop Name" value={form.name} onChange={handleFormChange} className="p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" required />
              <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleFormChange} className="p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" />
              <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleFormChange} className="p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" required />
              <input type="text" name="contact" placeholder="Contact" value={form.contact} onChange={handleFormChange} className="p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" required />
              <select name="type" value={form.type} onChange={handleFormChange} className="p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary">
                <option value="service">Service</option>
                <option value="product">Product</option>
                <option value="both">Both</option>
              </select>
              <input type="text" name="location.address" placeholder="Address" value={form.location.address} onChange={handleFormChange} className="p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" required />
              <div className="flex gap-2">
                <input type="text" name="workingHours.weekdays.open" placeholder="Weekdays Open" value={form.workingHours.weekdays.open} onChange={handleFormChange} className="flex-1 p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" />
                <input type="text" name="workingHours.weekdays.close" placeholder="Weekdays Close" value={form.workingHours.weekdays.close} onChange={handleFormChange} className="flex-1 p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" />
              </div>
              <div className="flex gap-2">
                <input type="text" name="workingHours.weekends.open" placeholder="Weekends Open" value={form.workingHours.weekends.open} onChange={handleFormChange} className="flex-1 p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" />
                <input type="text" name="workingHours.weekends.close" placeholder="Weekends Close" value={form.workingHours.weekends.close} onChange={handleFormChange} className="flex-1 p-3 rounded border border-gray-300 dark:border-darkBorder bg-white dark:bg-darkBg text-gray-900 dark:text-darkText focus:outline-primary" />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">{editMode ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-darkBg text-gray-700 dark:text-darkTextSecondary rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-darkCard transition">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default MyShops; 