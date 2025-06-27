import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader } from './Loader';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!token) {
        setError('Please log in to view product details');
        setLoading(false);
        toast.error('Please log in to view product details');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/api/shops/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Product fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch product details');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [productId, token, navigate]);

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
        {product && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{product.name}</h2>
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full max-w-md h-64 object-cover rounded-lg" />
            ) : (
              <div className="w-full max-w-md h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">No Image</span>
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-300">{product.description || 'No description'}</p>
            <p className="text-primary font-bold text-xl">₹{product.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Category: {product.category || 'N/A'}</p>
            <button
              onClick={() => navigate(`/shops/${product.shop}`)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
            >
              View Shop
            </button>
          </>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default ProductDetail;