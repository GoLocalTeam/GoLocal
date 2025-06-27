import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80">
    <motion.div
      className="bg-lightCard dark:bg-darkCard rounded-xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Welcome to your Dashboard</h2>
      <p className="text-center text-gray-600 dark:text-gray-300">This is a placeholder dashboard. Role-based content will appear here soon!</p>
    </motion.div>
  </div>
);

export default Dashboard; 