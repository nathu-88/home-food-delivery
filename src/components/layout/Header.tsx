import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gradient-to-b from-black/70 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-amber-600' : 'text-white'}`}>
            HomePlate
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleNavClick('meals')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            Browse Meals
          </button>
          <button 
            onClick={() => handleNavClick('cooks')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            Our Cooks
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-amber-500 transition-colors`}
          >
            How It Works
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            className={`relative p-2 rounded-full ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
            onClick={onCartClick}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="relative">
            <button 
              className={`p-2 rounded-full ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="User profile"
            >
              <User size={20} />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {user && (
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Signed in as<br />
                      <span className="font-medium">{user.email}</span>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button 
            className={`md:hidden p-2 rounded-full ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          <nav className="flex flex-col space-y-3 py-3">
            <button 
              onClick={() => handleNavClick('meals')}
              className="text-gray-700 hover:text-amber-500 transition-colors text-left"
            >
              Browse Meals
            </button>
            <button 
              onClick={() => handleNavClick('cooks')}
              className="text-gray-700 hover:text-amber-500 transition-colors text-left"
            >
              Our Cooks
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="text-gray-700 hover:text-amber-500 transition-colors text-left"
            >
              How It Works
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header