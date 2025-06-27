import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import GetLocation from '../components/GetLocation'; // Assuming you have a GetLocation component for fetching user location

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
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
      const response = await axios.post('http://localhost:8000/api/signup', {
        name,
        email,
        password,
        role,
        location: {
          coordinates: [location.longitude, location.latitude],
          type: 'Point',
        },
      });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(err.response?.data?.message || 'Signup failed');
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
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
          >
            <option value="user">User</option>
            <option value="shopkeeper">Shopkeeper</option>
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default Signup;