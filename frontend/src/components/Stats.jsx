import React from 'react';
import { Users, Store, Star } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    label: 'Active Users',
    value: '10,000+'
  },
  {
    icon: <Store className="w-8 h-8 text-secondary" />,
    label: 'Shops Listed',
    value: '2,500+'
  },
  {
    icon: <Star className="w-8 h-8 text-accent" />,
    label: 'Reviews',
    value: '8,000+'
  },
];

const Stats = () => (
  <section className="py-16 px-4 max-w-4xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {stats.map((stat, i) => (
        <div key={i} className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-8 flex flex-col items-center gap-4 transition-colors">
          {stat.icon}
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
          <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats; 