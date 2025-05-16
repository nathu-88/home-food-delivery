import { Cook } from '../types';

export const cooks: Cook[] = [
  {
    id: '1',
    name: 'Maria Garcia',
    avatar: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=256',
    bio: 'Passionate chef specializing in authentic Mexican cuisine. Cooking has been my family tradition for generations.',
    rating: 4.8,
    reviewCount: 48,
    specialties: ['Mexican', 'Latin American', 'Vegan Options'],
    location: 'Austin, TX'
  },
  {
    id: '2',
    name: 'James Chen',
    avatar: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=256',
    bio: 'Former restaurant chef now sharing my love for Asian fusion dishes from my home kitchen.',
    rating: 4.9,
    reviewCount: 63,
    specialties: ['Asian Fusion', 'Thai', 'Japanese'],
    location: 'Portland, OR'
  },
  {
    id: '3',
    name: 'Sophia Williams',
    avatar: 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg?auto=compress&cs=tinysrgb&w=256',
    bio: 'Self-taught baker and comfort food specialist. I believe food should nourish both body and soul.',
    rating: 4.7,
    reviewCount: 35,
    specialties: ['Comfort Food', 'Baked Goods', 'Southern'],
    location: 'Nashville, TN'
  },
  {
    id: '4',
    name: 'Omar Hassan',
    avatar: 'https://images.pexels.com/photos/6419158/pexels-photo-6419158.jpeg?auto=compress&cs=tinysrgb&w=256',
    bio: 'Bringing the rich flavors of Mediterranean cuisine to your doorstep. Every dish tells a story.',
    rating: 4.9,
    reviewCount: 52,
    specialties: ['Mediterranean', 'Middle Eastern', 'Vegetarian'],
    location: 'Chicago, IL'
  },
  {
    id: '5',
    name: 'Priya Patel',
    avatar: 'https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=256',
    bio: 'Sharing family recipes passed down through generations. Specializing in authentic Indian cuisine.',
    rating: 4.8,
    reviewCount: 41,
    specialties: ['Indian', 'Vegetarian', 'Vegan'],
    location: 'Seattle, WA'
  }
];