import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Search, Filter } from 'lucide-react';
import { shopAPI } from '../services/api';
import { toast } from 'react-toastify';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredShops, setFilteredShops] = useState([]);

  useEffect(() => {
    const loadShops = async () => {
      try {
        setLoading(true);
        const response = await shopAPI.getAllShops();
        setShops(response.data.data || []);
        setFilteredShops(response.data.data || []);
      } catch (error) {
        console.error('Error loading shops:', error);
        toast.error('Failed to load shops');
        setShops([]);
        setFilteredShops([]);
      } finally {
        setLoading(false);
      }
    };

    loadShops();
  }, []);

  useEffect(() => {
    // Filter shops based on search term and category
    let filtered = shops;

    if (searchTerm) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(shop => shop.category === selectedCategory);
    }

    setFilteredShops(filtered);
  }, [shops, searchTerm, selectedCategory]);

  const categories = ['all', ...new Set(shops.map(shop => shop.category))];

  const getStatusColor = (status) => {
    return status === 'open' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusText = (status) => {
    return status === 'open' ? 'Open' : 'Closed';
  };

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
            Discover Local Shops
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Find amazing local businesses in your area
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
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
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
            Found {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Shops Grid */}
        {filteredShops.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredShops.map((shop, index) => (
              <motion.div
                key={shop._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-darkCard rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Shop Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl text-white font-bold">
                        {shop.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Shop Image</p>
                  </div>
                </div>

                {/* Shop Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {shop.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(shop.status)} bg-green-100 dark:bg-green-900/20`}>
                      {getStatusText(shop.status)}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {shop.description || 'No description available'}
                  </p>

                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 rounded-full text-xs font-medium">
                      {shop.category}
                    </span>
                    <span className="px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-400 rounded-full text-xs font-medium">
                      {shop.type}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{shop.location?.address || 'Address not available'}</span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{shop.contact || 'Contact not available'}</span>
                  </div>

                  {/* Working Hours */}
                  {shop.workingHours && (
                    <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {shop.workingHours.weekdays?.open} - {shop.workingHours.weekdays?.close}
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">4.5</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">(24 reviews)</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-400 rounded-lg hover:bg-secondary/20 dark:hover:bg-secondary/30 transition-colors">
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
              No shops found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or browse all categories
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopList; 