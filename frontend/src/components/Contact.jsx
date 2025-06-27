import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    toast.success('Message sent! We will get back to you soon.');
    reset();
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">Contact Us</h2>
      <motion.div
        className="bg-lightCard dark:bg-darkCard rounded-xl shadow p-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          <textarea
            placeholder="Your Message"
            rows={4}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:outline-primary"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition self-end">Send Message</button>
        </form>
        <div className="flex flex-col md:flex-row gap-6 justify-between mt-6">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><Mail className="w-5 h-5 text-primary" /> support@golocal.com</div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><Phone className="w-5 h-5 text-primary" /> +91 98765 43210</div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><MapPin className="w-5 h-5 text-primary" /> India</div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
      </motion.div>
    </section>
  );
};

export default Contact; 