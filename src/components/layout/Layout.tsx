import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from '../cart/Cart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onCartClick={toggleCart} />
      
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <Footer />
      
      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Layout;