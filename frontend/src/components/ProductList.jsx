import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [newProduct, setNewProduct] = useState({
    shop: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Please log in to manage products');
        setLoading(false);
        toast.error('Please log in to manage products');
        navigate('/login');
        return;
      }
      try {
        const [productsResponse, shopsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/products', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/shops', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProducts(productsResponse.data);
        setShops(shopsResponse.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch data');
        setLoading(false);
        toast.error(err.response?.data?.message || 'Failed to fetch data');
      }
    };
    fetchData();
  }, [token, navigate]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/shops/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product created successfully!');
      setNewProduct({ shop: '', name: '', description: '', price: '', stock: '', category: '', image: '' });
      const response = await axios.get('http://localhost:8000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Create product error:', err);
      toast.error(err.response?.data?.message || 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/shops/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted successfully!');
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error('Delete product error:', err);
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Manage Products</h2>
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
          <select
            value={newProduct.shop}
            onChange={(e) => setNewProduct({ ...newProduct, shop: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>{shop.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition"
          >
            Add Product
          </button>
        </form>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">Products</h3>
        {products.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No products found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ${product.price}</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Stock:</strong> {product.stock}</p>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </div>
  );
};

export default ProductList;