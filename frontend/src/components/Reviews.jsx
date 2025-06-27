import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Amit Sharma',
    text: 'GoLocal helped me find the best bakery in my area! The interface is so easy to use and the reviews are super helpful.',
    rating: 5
  },
  {
    name: 'Priya Singh',
    text: 'As a shopkeeper, I love how simple it is to manage my shop profile and connect with new customers.',
    rating: 4
  },
  {
    name: 'Rahul Verma',
    text: 'The geolocation feature is a game changer. I can always find what I need nearby!',
    rating: 5
  },
];

const Reviews = () => (
  <section className="py-16 px-4 max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">What Our Users Say</h2>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {reviews.map((review, i) => (
        <motion.div
          key={i}
          className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-6 flex flex-col items-center gap-4 transition-colors"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <Quote className="w-8 h-8 text-primary mb-2" />
          <p className="text-gray-700 dark:text-gray-200 text-center">"{review.text}"</p>
          <div className="flex gap-1 mt-2">
            {[...Array(review.rating)].map((_, idx) => (
              <Star key={idx} className="w-5 h-5 text-accent fill-accent" />
            ))}
          </div>
          <span className="mt-2 font-semibold text-gray-900 dark:text-white">{review.name}</span>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default Reviews; 