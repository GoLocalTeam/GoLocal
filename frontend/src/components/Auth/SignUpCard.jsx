import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Mail, Lock, User, MapPin, Camera } from 'lucide-react';

function SignUpCard({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Optional, default value
    profilePicture: null, // Optional
    address: '', // Part of location, required
    longitude: '', // Part of location, required
    latitude: '' // Part of location, required
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.longitude || !formData.latitude) {
      setError('All fields marked with * are required');
      setLoading(false);
      return;
    }

    // Prepare form data for submission
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role); // Optional
    if (formData.profilePicture) {
      data.append('profilePicture', formData.profilePicture);
    }
    // Location as a nested object
    data.append('location[address]', formData.address);
    data.append('location[coordinates][0]', formData.longitude); // longitude
    data.append('location[coordinates][1]', formData.latitude);  // latitude

    try {
      const response = await fetch('http://localhost:5000/api/v1/signup', { // Replace with your actual API URL
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      setSuccess('Account created successfully! Please log in.');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        profilePicture: null,
        address: '',
        longitude: '',
        latitude: ''
      });
      setTimeout(() => onClose(), 2000); // Auto-close after 2 seconds
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 border border-teal-100 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Store className="h-8 w-8 text-teal-600" />
          <h2 className="text-2xl font-bold text-gray-900">Sign Up for LocalFinder</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-teal-100 text-teal-700 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="h-5 w-5 text-teal-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <div className="relative">
              <Mail className="h-5 w-5 text-teal-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="h-5 w-5 text-teal-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                disabled={loading}
              />
            </div>
          </div>

          {/* Role (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
          </div>

          {/* Profile Picture (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <div className="relative">
              <Camera className="h-5 w-5 text-teal-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/50 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                disabled={loading}
              />
            </div>
          </div>

          {/* Location (Required) */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Location *</label>
            <div className="relative">
              <MapPin className="h-5 w-5 text-teal-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="123 Main St, City"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                required
                placeholder="Longitude"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                disabled={loading}
              />
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                required
                placeholder="Latitude"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg transition-colors font-medium shadow-lg ${
              loading
                ? 'bg-teal-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-300/50'
            } text-white`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
            Log In
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUpCard;