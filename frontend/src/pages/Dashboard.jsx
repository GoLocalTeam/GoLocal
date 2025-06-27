import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Please log in to view dashboard');
        setLoading(false);
        toast.error('Please log in to view dashboard');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/getProfile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch profile');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch profile');
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/logout', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Logout failed');
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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Dashboard</h2>
        {user && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-800 dark:text-white"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-800 dark:text-white"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-800 dark:text-white"><strong>Role:</strong> {user.role}</p>
            <div className="flex gap-4">
              <Link
                to="/shops"
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
              >
                View Shops
              </Link>
              {user.role === 'shopkeeper' && (
                <>
                  <Link
                    to="/create-shop"
                    className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold shadow hover:bg-secondary/90 transition"
                  >
                    Create Shop
                  </Link>
                  <Link
                    to="/products"
                    className="px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow hover:bg-accent/90 transition"
                  >
                    Manage Products
                  </Link>
                  <Link
                    to="/services"
                    className="px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow hover:bg-accent/90 transition"
                  >
                    Manage Services
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default Dashboard;