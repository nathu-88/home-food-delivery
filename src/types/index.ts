export interface Cook {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  cookId: string;
  cook?: Cook;
  ingredients: string[];
  category: string;
  dietaryInfo: string[];
  prepTime: number;
  availability: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  mealId: string;
  quantity: number;
  meal: Meal;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress?: string;
  deliveryTime?: Date;
  isDelivery: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  orders: Order[];
  favorites: string[]; // meal ids
}