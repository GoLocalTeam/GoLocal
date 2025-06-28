import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

const DashboardShopkeeperCard = () => (
  <Link
    to="/my-shops"
    className="flex flex-col items-center justify-center gap-2 p-5 bg-lightCard dark:bg-darkCard rounded-lg shadow hover:shadow-lg border border-gray-200 dark:border-darkBorder transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/20 group cursor-pointer h-full min-h-[120px]"
    title="Manage your shops"
  >
    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-1 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition">
      <Store className="w-7 h-7 text-primary" />
    </div>
    <span className="text-base font-semibold text-gray-900 dark:text-darkText group-hover:text-primary transition">Manage My Shops</span>
  </Link>
);

export default DashboardShopkeeperCard; 