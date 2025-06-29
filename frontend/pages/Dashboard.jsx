import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  Heart, 
  Star, 
  MapPin, 
  Search, 
  Users, 
  TrendingUp, 
  Package, 
  MessageCircle, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';
import { dashboardAPI } from '../src/services/api';
import DashboardShopkeeperCard from '../src/components/DashboardShopkeeperCard';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(userData);

        if (userData) {
          // Load stats based on user role
          const statsData = userData.role === 'shopkeeper' 
            ? await dashboardAPI.getShopkeeperStats()
            : await dashboardAPI.getCustomerStats();
          setStats(statsData);

          // Load recent activity
          const activityData = await dashboardAPI.getRecentActivity();
          setRecentActivity(activityData);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please login to access dashboard</h2>
          <a href="/login" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition">Login</a>
        </div>
      </div>
    );
  }

  const isShopkeeper = user.role === 'shopkeeper';

  // Helper function to get icon component
  const getIconComponent = (iconName) => {
    const icons = {
      users: Users,
      star: Star,
      package: Package,
      search: Search,
      heart: Heart,
    };
    return icons[iconName] || Clock;
  };

  // Helper function to get color classes
  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    };
    return colors[color] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 dark:from-darkCard/50 dark:to-darkBg/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Store className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {isShopkeeper ? 'Manage your shop and grow your business' : 'Discover amazing local shops and services'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {isShopkeeper && stats ? (
            // Shopkeeper Stats
            <>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Services</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCustomers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{stats.totalRevenue}K</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </>
          ) : !isShopkeeper && stats ? (
            // Customer Stats
            <>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Favorite Shops</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.favoriteShops}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Reviews Given</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.reviewsGiven}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Searches</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.searches}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Nearby Shops</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.nearbyShops}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Loading state for stats
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg animate-pulse">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            ))
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isShopkeeper && <DashboardShopkeeperCard />}
                {isShopkeeper ? (
                  <>
                    <button className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <Plus className="w-6 h-6 text-primary mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Service</span>
                    </button>
                    <button className="p-4 bg-secondary/10 dark:bg-secondary/20 rounded-lg hover:bg-secondary/20 dark:hover:bg-secondary/30 transition-colors">
                      <Package className="w-6 h-6 text-secondary mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Product</span>
                    </button>
                    <button className="p-4 bg-accent/10 dark:bg-accent/20 rounded-lg hover:bg-accent/20 dark:hover:bg-accent/30 transition-colors">
                      <MessageCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Messages</span>
                    </button>
                    <button className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                      <Settings className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      <Search className="w-6 h-6 text-primary mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Find Shops</span>
                    </button>
                    <button className="p-4 bg-secondary/10 dark:bg-secondary/20 rounded-lg hover:bg-secondary/20 dark:hover:bg-secondary/30 transition-colors">
                      <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nearby</span>
                    </button>
                    <button className="p-4 bg-accent/10 dark:bg-accent/20 rounded-lg hover:bg-accent/20 dark:hover:bg-accent/30 transition-colors">
                      <Heart className="w-6 h-6 text-accent mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Favorites</span>
                    </button>
                    <button className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                      <Star className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reviews</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => {
                    const IconComponent = getIconComponent(activity.icon);
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No recent activity
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Views</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Interactions</span>
                  <span className="font-semibold text-gray-900 dark:text-white">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Growth</span>
                  <span className="font-semibold text-green-600">+12%</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-darkCard rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Weekly Review</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Tomorrow at 10 AM</p>
                </div>
                <div className="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Customer Meeting</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Friday at 2 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 