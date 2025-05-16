import React from 'react';
import { Search, Utensils, MapPin, Clock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How HomePlate Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting delicious homemade food delivered to your door is simple
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Browse Meals</h3>
            <p className="text-gray-600">
              Explore a variety of homemade dishes from talented cooks in your area
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Utensils size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Meal</h3>
            <p className="text-gray-600">
              Select your favorite dishes and customize your order to your preferences
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pickup or Delivery</h3>
            <p className="text-gray-600">
              Choose between convenient pickup or delivery options that work for you
            </p>
          </div>
          
          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enjoy Fresh Food</h3>
            <p className="text-gray-600">
              Receive your freshly prepared meal and enjoy authentic homemade flavors
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Become a Home Cook
              </h3>
              <p className="text-white/90 mb-6">
                Love cooking? Share your culinary creations with hungry customers in your neighborhood and earn money doing what you love.
              </p>
              <a
                href="#"
                className="inline-block self-start bg-white text-amber-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Learn More
              </a>
            </div>
            <div className="bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://images.pexels.com/photos/5677793/pexels-photo-5677793.jpeg?auto=compress&cs=tinysrgb&w=800')" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;