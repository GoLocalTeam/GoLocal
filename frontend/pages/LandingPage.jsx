import React from "react";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServiceSection";
import { HowItWorks } from "../components/HowItWorks";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
    </div>
  );
};

export default LandingPage;
