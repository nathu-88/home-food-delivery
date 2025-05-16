import React from 'react';
import { cooks } from '../../data/cooks';
import { Star, ChefHat, MapPin } from 'lucide-react';

const FeaturedCooks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Home Chefs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Talented cooks who are passionate about sharing their family recipes and cultural traditions through delicious homemade meals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cooks.slice(0, 3).map(cook => (
            <div key={cook.id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-36 bg-amber-100">
                <div className="absolute top-0 right-0 p-3">
                  <div className="flex items-center bg-white px-3 py-1 rounded-full shadow">
                    <Star size={16} className="text-amber-500" />
                    <span className="ml-1 font-medium">{cook.rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-500 ml-1">({cook.reviewCount})</span>
                  </div>
                </div>
                <div className="absolute -bottom-10 left-6">
                  <img 
                    src={cook.avatar} 
                    alt={cook.name} 
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-12 pb-6 px-6">
                <h3 className="font-bold text-xl">{cook.name}</h3>
                
                <div className="flex items-center mt-1 text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{cook.location}</span>
                </div>
                
                <p className="mt-3 text-gray-600 line-clamp-3">
                  {cook.bio}
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-sm flex items-center text-gray-700">
                    <ChefHat size={14} className="mr-1" /> 
                    Specialties
                  </h4>
                  <div className="flex flex-wrap mt-2 gap-2">
                    {cook.specialties.map(specialty => (
                      <span 
                        key={specialty}
                        className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <a
                    href="#"
                    className="block text-center px-4 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
          >
            Browse All Cooks
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCooks;