import React from "react";
import Hero from "../src/components/Hero";
import Features from "../src/components/Features";
import HowItWorks from "../src/components/HowItWorks";
import Reviews from "../src/components/Reviews";
import Stats from "../src/components/Stats";
import Contact from "../src/components/Contact";
import Footer from "../src/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
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
