import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      if (!token) {
        setError('Please log in to view shops');
        setLoading(false);
        toast.error('Please log in to view shops');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/shops', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShops(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Shops fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch shops');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch shops');
      }
    };
    fetchShops();
  }, [token, navigate]);

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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Shops</h2>
        {shops.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No shops found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shops.map((shop) => (
              <Link
                key={shop._id}
                to={`/shops/${shop._id}`}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{shop.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{shop.description}</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Category:</strong> {shop.category}</p>
              </Link>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default ShopList;