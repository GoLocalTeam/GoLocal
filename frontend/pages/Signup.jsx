import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import Loader from '../src/components/Loader';
import { authAPI } from '../src/services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Add location field as required by backend
      const signupData = {
        ...data,
        location: 'Default Location', // This should be dynamic based on user input or geolocation
      };
      
      await authAPI.signup(signupData);
      toast.success('Account created! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80">
      <motion.div
        className="bg-lightCard dark:bg-darkCard rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Sign Up for GoLocal</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          <div className="flex gap-4 items-center mt-2">
            <label className="text-gray-700 dark:text-gray-200 font-medium">Role:</label>
            <select
              className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
          </div>
          {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition mt-2">{loading ? <Loader size={24} /> : 'Sign Up'}</button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300">Already have an account? <a href="/login" className="text-primary font-semibold hover:underline">Login</a></p>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default Signup; 