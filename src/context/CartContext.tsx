import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Meal } from '../types';
import { meals } from '../data/meals';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (mealId: string, quantity: number) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // Calculate totals whenever cart items change
    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.meal.price,
      0
    );
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cartItems]);

  const getMealById = (id: string): Meal | undefined => {
    return meals.find(meal => meal.id === id);
  };

  const addToCart = (mealId: string, quantity: number) => {
    const meal = getMealById(mealId);
    if (!meal) return;

    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.mealId === mealId);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { mealId, quantity, meal }];
      }
    });
  };

  const removeFromCart = (mealId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.mealId !== mealId));
  };

  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(mealId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.mealId === mealId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};