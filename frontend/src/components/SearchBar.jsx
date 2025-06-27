import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(coords);
          localStorage.setItem('user-coordinates', JSON.stringify(coords));
        },
        (err) => {
          setError('Failed to fetch location. Please enable geolocation.');
          toast.error('Please enable geolocation to search by location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      toast.error('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please log in to search.');
      navigate('/login');
      return;
    }
    if (!keyword) {
      toast.error('Please enter a search keyword.');
      return;
    }
    if (!location) {
      toast.error('Location not available. Please enable geolocation.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/search', {
        params: { keyword, longitude: location.lon, latitude: location.lat },
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Failed to fetch search results');
      setLoading(false);
      toast.error(err.response?.data?.message || 'Search failed.');
    }
  };

  const handleResultClick = (item) => {
    if (item.shop) {
      const type = item.stock ? 'products' : 'services';
      navigate(`/shops/${type}/${item._id}`);
    } else {
      navigate(`/shops/${item._id}`);
    }
  };

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <motion.div
        className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-6 flex flex-col gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <form onSubmit={handleSearch} className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search shops, products, or services..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-1/2 pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {location && (
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
          </p>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </motion.div>
      {loading && <Loader />}
      {results.length > 0 && (
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {results.map((item) => (
            <div
              key={item._id}
              className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-6 flex flex-col gap-4 cursor-pointer hover:shadow-xl transition"
              onClick={() => handleResultClick(item)}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description || 'No description'}</p>
              {item.price && <p className="text-primary font-bold">₹{item.price}</p>}
              {item.distance && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Distance: {(item.distance / 1000).toFixed(2)} km
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Type: {item.shop ? (item.stock ? 'Product' : 'Service') : 'Shop'}
              </p>
            </div>
          ))}
        </motion.div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
    </section>
  );
};

export default SearchBar;