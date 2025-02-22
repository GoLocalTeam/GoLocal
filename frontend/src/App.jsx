import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <Stats />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;