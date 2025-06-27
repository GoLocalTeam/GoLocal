import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import GetLocation from './GetLocation';
import Loader from './Loader';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleLocationFetched = (coords) => {
    if (coords.error) {
      toast.error(coords.error);
      setError(coords.error);
    } else {
      setLocation(coords);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to search');
      toast.error('Please log in to search');
      navigate('/login');
      return;
    }
    if (!location || !location.latitude || !location.longitude) {
      toast.error('Location is required. Please allow location access.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/search', {
        params: { keyword, latitude: location.latitude, longitude: location.longitude },
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Failed to search');
      setLoading(false);
      toast.error(err.response?.data?.message || 'Failed to search');
    }
  };

  if (error) return <div className="text-center text-red-500 py-16">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80 py-16 px-4">
      <GetLocation onLocationFetched={handleLocationFetched} />
      <motion.div
        className="max-w-4xl mx-auto bg-lightCard dark:bg-darkCard rounded-xl shadow p-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Search</h2>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search for shops, products, or services..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {loading ? (
          <Loader />
        ) : results.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No results found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <div key={item._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Type:</strong> {item.shop ? 'Product/Service' : 'Shop'}</p>
                {item.distance && (
                  <p className="text-gray-600 dark:text-gray-300"><strong>Distance:</strong> {(item.distance / 1000).toFixed(2)} km</p>
                )}
                {item.shop ? (
                  <Link to={`/shops/${item.shop._id}`} className="text-primary hover:underline">View Shop</Link>
                ) : (
                  <Link to={`/shops/${item._id}`} className="text-primary hover:underline">View Shop</Link>
                )}
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default Search;