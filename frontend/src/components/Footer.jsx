import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => (
  <footer className="w-full py-6 px-4 bg-white dark:bg-darkCard shadow-inner flex flex-col md:flex-row items-center justify-between gap-4 mt-12 dark:text-darkTextSecondary">
    <span className="text-gray-700 dark:text-gray-300 font-semibold">&copy; {new Date().getFullYear()} GoLocal. All rights reserved.</span>
    <div className="flex gap-4">
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><Github className="w-5 h-5" /></a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><Linkedin className="w-5 h-5" /></a>
      <a href="https://golocal.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><Globe className="w-5 h-5" /></a>
    </div>
  </footer>
);

export default Footer; 