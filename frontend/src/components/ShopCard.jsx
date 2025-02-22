import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';

const ShopCard = ({ shop }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
          {shop.distance}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
          <span className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-600">
            {shop.category}
          </span>
        </div>
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-900">{shop.rating}</span>
          <span className="text-sm text-gray-500">({shop.reviews} reviews)</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {shop.address}
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span className={`text-sm ${shop.isOpen ? 'text-green-600' : 'text-red-600'}`}>
            {shop.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
