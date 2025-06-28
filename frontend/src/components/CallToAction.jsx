import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Wrench, Package, ArrowRight, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  const actions = [
    {
      icon: <Store className="w-8 h-8 text-primary" />,
      title: 'Discover Local Shops',
      desc: 'Find amazing local businesses in your neighborhood',
      link: '/shops',
      color: 'from-primary/10 to-primary/20',
      buttonColor: 'bg-primary hover:bg-primary/90'
    },
    {
      icon: <Wrench className="w-8 h-8 text-secondary" />,
      title: 'Professional Services',
      desc: 'Connect with skilled professionals for all your needs',
      link: '/services',
      color: 'from-secondary/10 to-secondary/20',
      buttonColor: 'bg-secondary hover:bg-secondary/90'
    },
    {
      icon: <Package className="w-8 h-8 text-accent" />,
      title: 'Local Products',
      desc: 'Shop unique products from local artisans and businesses',
      link: '/products',
      color: 'from-accent/10 to-accent/20',
      buttonColor: 'bg-accent hover:bg-accent/90'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Explore Your Community?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who are already discovering and supporting local businesses in their area
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {actions.map((action, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br ${action.color} dark:from-darkCard dark:to-darkBg rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md">
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{action.desc}</p>
                <Link 
                  to={action.link}
                  className={`${action.buttonColor} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mt-4`}
                >
                  Start Exploring
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-8 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm">1000+ Local Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">4.8/5 Average Rating</span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Join our growing community and discover the best local businesses in your area
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction; 