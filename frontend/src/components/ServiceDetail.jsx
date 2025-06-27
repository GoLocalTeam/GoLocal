import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader } from './Loader';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchService = async () => {
      if (!token) {
        setError('Please log in to view service details');
        setLoading(false);
        toast.error('Please log in to view service details');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/api/shops/services/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setService(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Service fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch service details');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch service details');
      }
    };
    fetchService();
  }, [serviceId, token, navigate]);

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
        {service && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{service.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{service.description || 'No description'}</p>
            <p className="text-primary font-bold text-xl">₹{service.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {service.duration || 'N/A'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Availability: {service.availability ? 'Available' : 'Not Available'}
            </p>
            <button
              onClick={() => navigate(`/shops/${service.shop}`)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
            >
              View Shop
            </button>
          </>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default ServiceDetail;