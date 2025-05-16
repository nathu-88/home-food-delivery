import React, { useState } from 'react';
import MealCard from './MealCard';
import { Meal } from '../../types';
import { ChevronDown, Filter } from 'lucide-react';

interface MealGridProps {
  meals: Meal[];
  title?: string;
}

const MealGrid: React.FC<MealGridProps> = ({ meals, title }) => {
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  
  const sortedMeals = [...meals].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default sort (recommended) is by rating and review count
    return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
  });

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
        >
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
        </button>
        
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div className="space-y-2">
              {['Mexican', 'Thai', 'Indian', 'Mediterranean', 'Southern'].map(category => (
                <label key={category} className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4" />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Spicy'].map(diet => (
                <label key={diet} className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4" />
                  <span className="ml-2 text-sm text-gray-700">{diet}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <div className="space-y-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <label key={day} className="flex items-center">
                  <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4" />
                  <span className="ml-2 text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMeals.map(meal => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealGrid;