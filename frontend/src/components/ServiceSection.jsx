import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const services = [
  { name: "Plumbing", description: "Find expert plumbers near you." },
  { name: "Electrical", description: "Reliable electricians for your home." },
  { name: "Cleaning", description: "Book trusted cleaning services." },
];

export const ServicesSection = () => {
  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-semibold">Our Services</h2>
      <div className="flex justify-center gap-6 mt-6">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(cardRef.current, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-6 w-64 bg-white shadow-lg rounded-lg text-center transition-all hover:shadow-xl"
    >
      <h3 className="text-xl font-bold">{service.name}</h3>
      <p className="mt-2">{service.description}</p>
    </div>
  );
};
