import React from 'react';
import { Link } from 'react-router-dom';
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

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const avatarUrl = user?.avatar || getGravatar(user?.email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 dark:from-darkCard/80 dark:to-darkBg/80">
      <div className="bg-lightCard dark:bg-darkCard rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-2 overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-white font-bold">{getInitials(user?.name)}</span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
        <div className="text-gray-700 dark:text-gray-300">{user?.email}</div>
        <div className="text-gray-500 dark:text-gray-400">Role: {user?.role || 'N/A'}</div>
        <Link to="/dashboard" className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Profile; 