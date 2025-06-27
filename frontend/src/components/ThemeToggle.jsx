import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-darkCard shadow-lg hover:bg-primary/10 dark:hover:bg-secondary/10 transition-colors"
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
    </button>
  );
};

export default ThemeToggle; 