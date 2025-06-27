import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import GetLocation from './GetLocation';

const CreateShop = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState('physical');
  const [location, setLocation] = useState(null);
  const [workingHours, setWorkingHours] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLocationFetched = (coords) => {
    if (coords.error) {
      toast.error(coords.error);
    } else {
      setLocation(coords);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !location.latitude || !location.longitude) {
      toast.error('Location is required. Please allow location access.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:8000/api/shops',
        {
          owner: user._id,
          name,
          description,
          category,
          contact,
          type,
          location: {
            coordinates: [location.longitude, location.latitude],
            type: 'Point',
          },
          workingHours,
          status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Shop created successfully!');
      navigate('/shops');
    } catch (err) {
      console.error('Create shop error:', err);
      toast.error(err.response?.data?.message || 'Failed to create shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80 py-16 px-4">
      <GetLocation onLocationFetched={handleLocationFetched} />
      <motion.div
        className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Create Shop</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Shop Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
          >
            <option value="physical">Physical</option>
            <option value="online">Online</option>
          </select>
          <input
            type="text"
            placeholder="Working Hours (e.g., 9AM-5PM)"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Shop'}
          </button>
        </form>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default CreateShop;