import React from 'react';
import { Search, MapPin, Star, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: 'Powerful Search',
    desc: 'Find shops and services by category, location, keywords, and proximity.'
  },
  {
    icon: <MapPin className="w-8 h-8 text-secondary" />,
    title: 'Geolocation',
    desc: 'See nearby businesses on an interactive map with Google Maps integration.'
  },
  {
    icon: <Star className="w-8 h-8 text-accent" />,
    title: 'Reviews & Ratings',
    desc: 'Read and leave reviews to help others find the best local providers.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Secure Auth',
    desc: 'JWT-based authentication and role selection for customers and shopkeepers.'
  },
  {
    icon: <Users className="w-8 h-8 text-secondary" />,
    title: 'Community',
    desc: 'Connect with your neighborhood and support local businesses.'
  },
];

const Features = () => (
  <section id="features" className="py-16 px-4 max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">Features</h2>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {features.map((f, i) => (
        <motion.div
          key={i}
          className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-6 flex flex-col items-center text-center gap-4 transition-colors"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <div>{f.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{f.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Features; 