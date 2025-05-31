import React from 'react';
import { Link } from 'react-router-dom';
import { FoodItem } from '../../types';

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
          <span className="text-green-600 font-semibold">{formatPrice(item.price)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {item.nutritionalValues.energy.value} {item.nutritionalValues.energy.unit}
          </div>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Protein: {item.nutritionalValues.protein.value}{item.nutritionalValues.protein.unit}
          </div>
          <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
            Carbs: {item.nutritionalValues.carbohydrates.value}{item.nutritionalValues.carbohydrates.unit}
          </div>
        </div>
        
        <Link 
          to={`/${item.category}s/${item.id}`}
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;