import React from 'react';
import { Star, Clock, Plus } from 'lucide-react';
import { Meal } from '../../types';
import { useCart } from '../../context/CartContext';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(meal.id, 1);
  };

  const formatPrice = (price: number) => {
    return `₹${(price * 83).toFixed(2)}`;
  };

  return (
    <div id={`meal-${meal.id}`} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={meal.image} 
          alt={meal.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-amber-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-600"
          aria-label="Add to cart"
        >
          <Plus size={18} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1">{meal.name}</h3>
          <span className="text-amber-600 font-semibold">{formatPrice(meal.price)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meal.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock size={16} className="mr-1" />
          <span>{meal.prepTime} min prep</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star size={16} className="text-amber-500" />
            <span className="text-sm ml-1">{meal.rating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm ml-1">({meal.reviewCount})</span>
          </div>
          
          <div className="flex items-center">
            <img 
              src={meal.cook?.avatar} 
              alt={meal.cook?.name} 
              className="w-6 h-6 rounded-full mr-1 object-cover"
            />
            <span className="text-sm text-gray-600">
              {meal.cook?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;