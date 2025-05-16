import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { meals } from '../../data/meals';
import { cooks } from '../../data/cooks';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    meals: typeof meals;
    locations: string[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults(null);
      setShowResults(false);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    
    // Search meals by name, description, category, and cook's location
    const filteredMeals = meals.filter(meal => 
      meal.name.toLowerCase().includes(lowercaseQuery) ||
      meal.description.toLowerCase().includes(lowercaseQuery) ||
      meal.category.toLowerCase().includes(lowercaseQuery) ||
      meal.cook?.location.toLowerCase().includes(lowercaseQuery)
    );

    // Get unique locations from cooks
    const locations = Array.from(new Set(
      cooks
        .filter(cook => 
          cook.location.toLowerCase().includes(lowercaseQuery)
        )
        .map(cook => cook.location)
    ));

    setSearchResults({ meals: filteredMeals, locations });
    setShowResults(true);
  };

  const handleResultClick = (type: 'meal' | 'location', value: string, mealId?: string) => {
    setSearchQuery(value);
    setShowResults(false);
    
    const mealsSection = document.getElementById('meals');
    if (mealsSection) {
      mealsSection.scrollIntoView({ behavior: 'smooth' });
      
      // If a specific meal was clicked, highlight it
      if (mealId) {
        setTimeout(() => {
          const mealElement = document.getElementById(`meal-${mealId}`);
          if (mealElement) {
            mealElement.classList.add('ring-4', 'ring-amber-500', 'ring-opacity-50');
            setTimeout(() => {
              mealElement.classList.remove('ring-4', 'ring-amber-500', 'ring-opacity-50');
            }, 2000);
          }
        }, 500);
      }
    }
  };

  return (
    <div className="relative h-[80vh] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1800')",
          filter: "brightness(0.7)"
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Homemade Food <br className="hidden md:block" />
          <span className="text-amber-400">Delivered to Your Door</span>
        </h1>
        
        <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Discover amazing meals cooked by talented home chefs in your neighborhood
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="flex bg-white rounded-full overflow-hidden shadow-lg p-1">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Enter your location or search for dishes..."
              className="flex-grow py-3 px-6 text-lg focus:outline-none"
            />
            <button
              onClick={() => handleSearch(searchQuery)}
              className="bg-amber-500 hover:bg-amber-600 transition-colors text-white rounded-full py-3 px-8 font-medium flex items-center"
            >
              <Search size={20} className="mr-2" />
              Search
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults && (searchResults.meals.length > 0 || searchResults.locations.length > 0) && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50 text-left">
              {searchResults.locations.length > 0 && (
                <div className="border-b">
                  <div className="px-4 py-2 text-sm font-medium text-gray-500">Locations</div>
                  {searchResults.locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick('location', location)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <Search size={16} className="mr-2 text-gray-400" />
                      <span>{location}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {searchResults.meals.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500">Dishes</div>
                  {searchResults.meals.slice(0, 5).map((meal) => (
                    <button
                      key={meal.id}
                      onClick={() => handleResultClick('meal', meal.name, meal.id)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center group"
                    >
                      <img 
                        src={meal.image} 
                        alt={meal.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium group-hover:text-amber-600 transition-colors">{meal.name}</div>
                        <div className="text-sm text-gray-500">{meal.cook?.location}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 flex justify-center space-x-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Mexican
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Thai
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Indian
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Vegetarian
            </span>
          </div>
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  );
};

export default Hero;