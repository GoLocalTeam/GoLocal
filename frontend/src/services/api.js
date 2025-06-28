import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/signup', userData),
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.get('/logout'),
  getProfile: () => api.get('/getProfile'),
  getDashboard: () => api.get('/dashboard'),
};

// Shop API
export const shopAPI = {
  getAllShops: () => api.get('/shops'),
  getShopById: (shopId) => api.get(`/shops/${shopId}`),
  createShop: (shopData) => api.post('/shops', shopData),
  updateShop: (shopId, shopData) => api.put(`/shops/${shopId}`, shopData),
  deleteShop: (shopId) => api.delete(`/shops/${shopId}`),
  getShopsByOwner: (ownerId) => api.get(`/shops/owner/${ownerId}`),
};

// Service API
export const serviceAPI = {
  getAllServices: () => api.get('/services'),
  getServiceById: (shopId, serviceId) => api.get(`/shops/${shopId}/services/${serviceId}`),
  getServicesByShop: (shopId) => api.get(`/shops/${shopId}/services`),
  createService: (shopId, serviceData) => api.post(`/shops/${shopId}/services`, serviceData),
  updateService: (shopId, serviceId, serviceData) => api.put(`/shops/${shopId}/services/${serviceId}`, serviceData),
  deleteService: (shopId, serviceId) => api.delete(`/shops/${shopId}/services/${serviceId}`),
};

// Product API
export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductById: (shopId, productId) => api.get(`/shops/${shopId}/products/${productId}`),
  getProductsByShop: (shopId) => api.get(`/shops/${shopId}/products`),
  createProduct: (shopId, productData) => api.post(`/shops/${shopId}/products`, productData),
  updateProduct: (shopId, productId, productData) => api.put(`/shops/${shopId}/products/${productId}`, productData),
  deleteProduct: (shopId, productId) => api.delete(`/shops/${shopId}/products/${productId}`),
};

// Search API
export const searchAPI = {
  searchItems: (query) => api.get('/search', { params: query }),
};

// Dashboard API - Custom endpoints for dashboard data
export const dashboardAPI = {
  // Get dashboard stats for shopkeeper
  getShopkeeperStats: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user) throw new Error('User not found');

      // Get user's shops
      const shopsResponse = await shopAPI.getAllShops();
      const userShops = shopsResponse.data.data.filter(shop => shop.owner === user.id);

      // Get services and products for user's shops
      let totalServices = 0;
      let totalProducts = 0;
      let totalCustomers = 0; // This would need to be calculated from orders/inquiries
      let totalRevenue = 0; // This would need to be calculated from orders

      for (const shop of userShops) {
        const servicesResponse = await serviceAPI.getServicesByShop(shop._id);
        const productsResponse = await productAPI.getProductsByShop(shop._id);
        
        totalServices += servicesResponse.data.length;
        totalProducts += productsResponse.data.length;
      }

      return {
        totalShops: userShops.length,
        totalServices,
        totalProducts,
        totalCustomers,
        totalRevenue,
        averageRating: 4.8, // This would need to be calculated from reviews
      };
    } catch (error) {
      console.error('Error fetching shopkeeper stats:', error);
      return {
        totalShops: 0,
        totalServices: 0,
        totalProducts: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        averageRating: 0,
      };
    }
  },

  // Get dashboard stats for customer
  getCustomerStats: async () => {
    try {
      // These would typically come from user's activity data
      // For now, returning mock data that would be calculated from user interactions
      return {
        favoriteShops: 12,
        reviewsGiven: 8,
        searches: 23,
        nearbyShops: 15,
      };
    } catch (error) {
      console.error('Error fetching customer stats:', error);
      return {
        favoriteShops: 0,
        reviewsGiven: 0,
        searches: 0,
        nearbyShops: 0,
      };
    }
  },

  // Get recent activity for both user types
  getRecentActivity: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user) return [];

      if (user.role === 'shopkeeper') {
        // For shopkeeper, get recent shop activities
        const shopsResponse = await shopAPI.getAllShops();
        const userShops = shopsResponse.data.data.filter(shop => shop.owner === user.id);
        
        // This would typically include recent orders, reviews, etc.
        return [
          {
            type: 'customer_inquiry',
            message: 'New customer inquiry',
            time: '2 hours ago',
            icon: 'users',
            color: 'green',
          },
          {
            type: 'review',
            message: 'New 5-star review',
            time: '5 hours ago',
            icon: 'star',
            color: 'blue',
          },
          {
            type: 'service_update',
            message: 'Service updated',
            time: '1 day ago',
            icon: 'package',
            color: 'purple',
          },
        ];
      } else {
        // For customer, get recent search and interaction history
        return [
          {
            type: 'search',
            message: 'Searched for "bakery"',
            time: '1 hour ago',
            icon: 'search',
            color: 'blue',
          },
          {
            type: 'favorite',
            message: 'Added shop to favorites',
            time: '3 hours ago',
            icon: 'heart',
            color: 'red',
          },
          {
            type: 'review',
            message: 'Left a review',
            time: '1 day ago',
            icon: 'star',
            color: 'yellow',
          },
        ];
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  },
};

export default api; 