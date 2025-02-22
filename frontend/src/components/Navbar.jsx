import React, { useState } from 'react';
import { Store } from 'lucide-react';
import { motion } from 'framer-motion';
import SignUpCard from './Auth/SignUpCard';

function Navbar() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleCloseSignUp = () => setIsSignUpOpen(false);

  return (
    <>
      <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-teal-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-bold text-gray-900">LocalFinder</span>
            </div>
            <div className="hidden sm:flex items-center space-x-8">
              <a href="#discover" className="text-gray-600 hover:text-gray-900 relative group">
                <span>Discover</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 relative group">
                <span>Services</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 relative group">
                <span>About</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-teal-600 hover:text-teal-700 font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Log In</span>
                <div className="absolute inset-0 bg-teal-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsSignUpOpen(true)}
                className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium shadow-lg hover:shadow-teal-300/50"
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
      {isSignUpOpen && <SignUpCard onClose={handleCloseSignUp} />}
    </>
  );
}

export default Navbar;