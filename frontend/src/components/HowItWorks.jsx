import React from 'react';
import { UserPlus, Search, Store, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-primary" />,
    title: 'Sign Up',
    desc: 'Create an account as a customer or shopkeeper.'
  },
  {
    icon: <Search className="w-8 h-8 text-secondary" />,
    title: 'Search',
    desc: 'Find local shops and services that match your needs.'
  },
  {
    icon: <Store className="w-8 h-8 text-accent" />,
    title: 'Connect',
    desc: 'Contact shopkeepers, book services, or visit shops.'
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: 'Review',
    desc: 'Leave reviews and help others in your community.'
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 px-4 max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">How It Works</h2>
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center gap-4 flex-1">
          <div className="bg-primary/10 dark:bg-secondary/10 rounded-full p-4 mb-2">
            {step.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">{step.desc}</p>
          {i < steps.length - 1 && (
            <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-primary to-secondary my-2" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks; 