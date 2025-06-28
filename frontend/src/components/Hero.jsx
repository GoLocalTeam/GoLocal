import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Store, Package, Wrench } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
      className="w-full flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight min-h-[90px]">
          <Typewriter
            words={['Connect with Local Shops', 'Find Services Near You', 'Support Your Neighborhood']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl">
          Discover, connect, and support your neighborhood businesses. Find the best shops and services, all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link 
            to="/shops" 
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            <Store className="w-5 h-5" />
            Find Shops
          </Link>
          <Link 
            to="/services" 
            className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold shadow hover:bg-secondary/90 transition flex items-center justify-center gap-2"
          >
            <Wrench className="w-5 h-5" />
            Find Services
          </Link>
          <Link 
            to="/products" 
            className="px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow hover:bg-accent/90 transition flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <span className="absolute -top-6 -left-6 w-16 h-16 bg-primary/20 rounded-full blur-2xl" />
          <span className="absolute -bottom-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full blur-2xl" />
          <Store className="w-48 h-48 md:w-64 md:h-64 text-primary drop-shadow-xl" />
          <MapPin className="absolute bottom-4 right-4 w-10 h-10 text-accent" />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero; 