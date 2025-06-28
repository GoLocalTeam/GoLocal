import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import Loader from '../src/components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/v1/login', data, { withCredentials: true });
      // Assuming backend returns { token, user }
      const { token, user } = res.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Logged in successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
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
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Login to GoLocal</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition mt-2">{loading ? <Loader size={24} /> : 'Login'}</button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300">Don't have an account? <a href="/signup" className="text-primary font-semibold hover:underline">Sign up</a></p>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default Login; 