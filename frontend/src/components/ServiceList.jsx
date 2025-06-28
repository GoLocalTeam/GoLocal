import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
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
=======
import { Clock, DollarSign, Search, Filter, Star, MapPin } from 'lucide-react';
import { serviceAPI } from '../services/api';
import { toast } from 'react-toastify';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const response = await serviceAPI.getAllServices();
        setServices(response.data || []);
        setFilteredServices(response.data || []);
      } catch (error) {
        console.error('Error loading services:', error);
        toast.error('Failed to load services');
        setServices([]);
        setFilteredServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  useEffect(() => {
    // Filter services based on search term and price range
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(service => {
        if (max) {
          return service.price >= min && service.price <= max;
        } else {
          return service.price >= min;
        }
      });
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, priceRange]);

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1000' },
    { value: '1000-2000', label: '₹1000 - ₹2000' },
    { value: '2000-', label: 'Above ₹2000' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 dark:from-darkCard/50 dark:to-darkBg/50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Local Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover professional services from local businesses
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
              />
            </div>

            {/* Price Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary appearance-none"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-darkCard rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Service Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl text-white font-bold">
                        {service.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Service Image</p>
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {service.description || 'No description available'}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{service.price}
                    </span>
                  </div>

                  {/* Duration */}
                  {service.duration && (
                    <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  )}

                  {/* Availability */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      service.availability 
                        ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                        : 'text-red-600 bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {service.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">4.2</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">(12 reviews)</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                      Book Now
                    </button>
                    <button className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No services found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or browse all price ranges
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
>>>>>>> fb242a6 (Shops, Products, Services pages)

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