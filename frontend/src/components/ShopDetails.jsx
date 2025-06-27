import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';

const ShopDetails = () => {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const { shopId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!token) {
        setError('Please log in to view shop details');
        setLoading(false);
        toast.error('Please log in to view shop details');
        navigate('/login');
        return;
      }
      try {
        const [shopResponse, productsResponse, servicesResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/shops/${shopId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8000/api/shops/products/shop/${shopId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8000/api/shops/services/shop/${shopId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setShop(shopResponse.data.data);
        setProducts(productsResponse.data);
        setServices(servicesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Shop details fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch shop details');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch shop details');
      }
    };
    fetchShopDetails();
  }, [token, shopId, navigate]);

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
        {shop && (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">{shop.name}</h2>
            <p className="text-gray-800 dark:text-white"><strong>Description:</strong> {shop.description}</p>
            <p className="text-gray-800 dark:text-white"><strong>Category:</strong> {shop.category}</p>
            <p className="text-gray-800 dark:text-white"><strong>Contact:</strong> {shop.contact}</p>
            <p className="text-gray-800 dark:text-white"><strong>Type:</strong> {shop.type}</p>
            <p className="text-gray-800 dark:text-white"><strong>Working Hours:</strong> {shop.workingHours}</p>
            <p className="text-gray-800 dark:text-white"><strong>Status:</strong> {shop.status}</p>
            {shop.location?.coordinates && (
              <p className="text-gray-800 dark:text-white">
                <strong>Location:</strong> Lat: {shop.location.coordinates[1]}, Lon: {shop.location.coordinates[0]}
              </p>
            )}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">Products</h3>
            {products.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No products available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
                    <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ${product.price}</p>
                    <p className="text-gray-600 dark:text-gray-300"><strong>Stock:</strong> {product.stock}</p>
                  </div>
                ))}
              </div>
            )}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">Services</h3>
            {services.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No services available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{service.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                    <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ${service.price}</p>
                    <p className="text-gray-600 dark:text-gray-300"><strong>Duration:</strong> {service.duration}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default ShopDetails;