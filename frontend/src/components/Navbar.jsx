import React, { useState } from 'react';
import { Store, User, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'blueimp-md5';

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.split(' ');
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
}

function getGravatar(email) {
  if (!email) return null;
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  // Simulate auth state
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const avatarUrl = user?.avatar || getGravatar(user?.email);

  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between bg-white/80 dark:bg-darkCard/80 shadow-md backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <Store className="w-7 h-7 text-primary" />
        <span className="text-2xl font-bold text-primary tracking-tight">GoLocal</span>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-base font-medium">
        <a href="#features" className="hover:text-primary transition">Features</a>
        <a href="#shops" className="hover:text-primary transition">Shops</a>
        <a href="#services" className="hover:text-primary transition">Services</a>
        <a href="#contact" className="hover:text-primary transition">Contact</a>
      </div>
      {/* Auth/User Actions */}
      <div className="hidden md:flex items-center gap-4">
        {token && user ? (
          <div className="relative group">
            <button className="p-2 rounded-full bg-primary/10 dark:bg-secondary/10 flex items-center">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                  {getInitials(user.name)}
                </span>
              )}
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-darkCard rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold">{user.name || 'User'}</div>
              <Link to="/dashboard" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-secondary/10 transition">Dashboard</Link>
              <Link to="/profile" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-secondary/10 transition">Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition"><LogOut className="w-4 h-4" /> Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition">Login</Link>
            <Link to="/signup" className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition">Sign Up</Link>
          </>
        )}
      </div>
      {/* Mobile Hamburger */}
      <button className="md:hidden p-2 rounded hover:bg-primary/10 dark:hover:bg-secondary/10 transition" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white dark:bg-darkCard shadow-lg flex flex-col gap-6 p-6 animate-slide-in">
            <button className="self-end mb-2" onClick={() => setMobileOpen(false)}><X className="w-7 h-7" /></button>
            <a href="#features" className="hover:text-primary transition" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#shops" className="hover:text-primary transition" onClick={() => setMobileOpen(false)}>Shops</a>
            <a href="#services" className="hover:text-primary transition" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="#contact" className="hover:text-primary transition" onClick={() => setMobileOpen(false)}>Contact</a>
            <div className="flex flex-col gap-3 mt-4">
              {token && user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
                        {getInitials(user.name)}
                      </span>
                    )}
                    {user.name || 'User'}
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-secondary/10 transition" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-secondary/10 transition" onClick={() => setMobileOpen(false)}>Profile</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition"><LogOut className="w-4 h-4" /> Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/signup" className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 