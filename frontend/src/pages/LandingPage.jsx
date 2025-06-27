import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Reviews from '../components/Reviews';
import Stats from '../components/Stats';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <nav className="bg-primary p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Marketplace</h1>
          <div className="flex gap-4">
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
            <Link to="/search" className="text-white hover:underline">Search</Link>
          </div>
        </div>
      </nav>
      <Hero />
      <Features />
      <HowItWorks />
      <Reviews />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;