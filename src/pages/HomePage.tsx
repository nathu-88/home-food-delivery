import React from 'react';
import Hero from '../components/home/Hero';
import MealGrid from '../components/meals/MealGrid';
import FeaturedCooks from '../components/home/FeaturedCooks';
import HowItWorks from '../components/home/HowItWorks';
import { meals } from '../data/meals';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      
      <div id="meals" className="container mx-auto px-4 py-12">
        <MealGrid meals={meals} title="Featured Meals" />
      </div>
      
      <div id="cooks">
        <FeaturedCooks />
      </div>
      
      <div id="how-it-works">
        <HowItWorks />
      </div>
    </div>
  );
};

export default HomePage