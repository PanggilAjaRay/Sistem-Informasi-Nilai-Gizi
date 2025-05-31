import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockFoodItems } from '../data/mockData';
import FoodCard from '../components/ui/FoodCard';
import Layout from '../components/common/Layout';

const BeveragesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter beverage items (only 'beverage' category)
  const beverageItems = mockFoodItems.filter(
    (item) => 
      item.category === 'beverage' && 
      (searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Beverages</h1>
          <p className="text-gray-600">
            Explore traditional beverages available at Alun Alun Kidul Yogyakarta and their nutritional information.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search beverages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Beverage items grid */}
        {beverageItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beverageItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No beverage items found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BeveragesPage;