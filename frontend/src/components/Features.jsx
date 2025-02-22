import React, { useEffect, useRef } from 'react';
import { MapPin, Star, Users, Shield } from 'lucide-react';
import VanillaTilt from 'vanilla-tilt';

function Features() {
  const tiltRefs = useRef([]);

  useEffect(() => {
    tiltRefs.current.forEach((element) => {
      if (element) {
        VanillaTilt.init(element, {
          max: 15,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
        });
      }
    });
  }, []);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Discover the wide range of services available in your area</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <MapPin className="h-8 w-8" />, title: "Home Services", desc: "Plumbers, electricians, and more" },
            { icon: <Star className="h-8 w-8" />, title: "Professional Services", desc: "Lawyers, accountants, consultants" },
            { icon: <Users className="h-8 w-8" />, title: "Personal Care", desc: "Salons, spas, fitness trainers" },
            { icon: <Shield className="h-8 w-8" />, title: "Education", desc: "Tutors and instructors" }
          ].map((service, i) => (
            <div 
              key={i} 
              ref={el => tiltRefs.current[i] = el}
              className="bg-teal-50 rounded-2xl p-6 text-center hover:bg-teal-100 transition-colors cursor-pointer transform-gpu"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-600 text-white mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;