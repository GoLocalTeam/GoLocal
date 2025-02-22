import React from 'react';
import { DivideIcon } from 'lucide-react';

const CategoryButton = ({ name, Icon }) => {
  return (
    <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
      <Icon className="h-6 w-6 text-blue-600" />
      <span className="font-medium text-gray-900">{name}</span>
    </button>
  );
};

export default CategoryButton;
