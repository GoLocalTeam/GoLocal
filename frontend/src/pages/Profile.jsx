import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Please log in to view profile');
        setLoading(false);
        toast.error('Please log in to view profile');
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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Profile</h2>
        {user && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-800 dark:text-white"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-800 dark:text-white"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-800 dark:text-white"><strong>Role:</strong> {user.role}</p>
            {user.profilePicture && (
              <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            )}
            {user.location?.coordinates && (
              <p className="text-gray-800 dark:text-white">
                <strong>Location:</strong> Lat: {user.location.coordinates[1]}, Lon: {user.location.coordinates[0]}
              </p>
            )}
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default Profile;