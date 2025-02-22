import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticCard from './MagneticCard';

function Reviews() {
  return (
    <section className="py-20 bg-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Real experiences from satisfied customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Homeowner",
              content: "Found an amazing plumber through LocalFinder. Quick response and professional service. Highly recommended!",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
            },
            {
              name: "Michael Chen",
              role: "Business Owner",
              content: "As a service provider, LocalFinder has helped me connect with new clients and grow my business significantly.",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
            },
            {
              name: "Emily Davis",
              role: "Student",
              content: "Found my math tutor here. The platform made it easy to compare different tutors and choose the best fit.",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
            }
          ].map((review, i) => (
            <MagneticCard key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg relative hover:shadow-xl transition-shadow duration-300"
              >
                <Quote className="absolute text-teal-100 h-24 w-24 -top-4 -left-4 -z-10" />
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-gray-600 text-sm">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{review.content}</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;