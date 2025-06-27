import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [shops, setShops] = useState([]);
  const [newService, setNewService] = useState({
    shop: '',
    name: '',
    description: '',
    price: '',
    duration: '',
    availability: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Please log in to manage services');
        setLoading(false);
        toast.error('Please log in to manage services');
        navigate('/login');
        return;
      }
      try {
        const [servicesResponse, shopsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/services', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/shops', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setServices(servicesResponse.data);
        setShops(shopsResponse.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch data');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch data');
      }
    };
    fetchData();
  }, [token, navigate]);

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/shops/services', newService, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Service created successfully!');
      setNewService({ shop: '', name: '', description: '', price: '', duration: '', availability: '' });
      const response = await axios.get('http://localhost:8000/api/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    } catch (err) {
      console.error('Create service error:', err);
      toast.error(err.response?.data?.message || 'Failed to create service');
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:8000/api/shops/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Service deleted successfully!');
      setServices(services.filter((s) => s._id !== serviceId));
    } catch (err) {
      console.error('Delete service error:', err);
      toast.error(err.response?.data?.message || 'Failed to delete service');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-16">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80 py-16 px-4">
      <motion.div
        className="max-w-4xl mx-auto bg-lightCard dark:bg-darkCard rounded-xl shadow p-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Manage Services</h2>
        <form onSubmit={handleCreateService} className="flex flex-col gap-4">
          <select
            value={newService.shop}
            onChange={(e) => setNewService({ ...newService, shop: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>{shop.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <textarea
            placeholder="Description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="text"
            placeholder="Duration (e.g., 1 hour)"
            value={newService.duration}
            onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="text"
            placeholder="Availability (e.g., Mon-Fri)"
            value={newService.availability}
            onChange={(e) => setNewService({ ...newService, availability: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
          >
            Add Service
          </button>
        </form>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">Services</h3>
        {services.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No services found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{service.name}</h4>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ${service.price}</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Duration:</strong> {service.duration}</p>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default ServiceList;