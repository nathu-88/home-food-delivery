import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Clock, CreditCard, Truck, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'processing' | 'confirmed' | 'preparing' | 'delivering' | 'delivered'>('processing');

  const formatPrice = (price: number) => {
    return `₹${(price * 83).toFixed(2)}`;
  };

  const handlePlaceOrder = () => {
    if (!address) {
      alert('Please enter a delivery address');
      return;
    }
    setOrderPlaced(true);
    // Simulate order status updates
    setTimeout(() => setOrderStatus('confirmed'), 2000);
    setTimeout(() => setOrderStatus('preparing'), 4000);
    setTimeout(() => setOrderStatus('delivering'), 6000);
    setTimeout(() => {
      setOrderStatus('delivered');
      clearCart();
    }, 8000);
  };

  const getStatusStep = () => {
    switch (orderStatus) {
      case 'processing': return 1;
      case 'confirmed': return 2;
      case 'preparing': return 3;
      case 'delivering': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  if (!cartItems.length && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <Package size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some delicious meals to your cart first!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Browse Meals
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {orderPlaced ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order Status</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="space-y-8">
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    {['Order Received', 'Confirmed', 'Preparing', 'On the Way', 'Delivered'].map((step, index) => (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index + 1 <= getStatusStep() ? 'bg-amber-500 text-white' : 'bg-gray-200'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="text-sm mt-2 text-center">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${(getStatusStep() - 1) * 25}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {orderStatus === 'delivered' 
                      ? 'Your order has been delivered!' 
                      : 'Your order is being prepared'}
                  </p>
                  <p className="text-gray-600">
                    Delivering to: {address}
                  </p>
                </div>

                {orderStatus === 'delivered' && (
                  <div className="text-center">
                    <button
                      onClick={() => navigate('/')}
                      className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      Order More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your delivery address"
                      className="pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      className="pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option>As soon as possible</option>
                      <option>In 30 minutes</option>
                      <option>In 1 hour</option>
                      <option>In 2 hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      className="pl-10 w-full border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option>Cash on Delivery</option>
                      <option>Credit/Debit Card</option>
                      <option>UPI</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.mealId} className="flex items-center space-x-4">
                    <img
                      src={item.meal.image}
                      alt={item.meal.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.meal.name}</h3>
                      <p className="text-sm text-gray-500">{item.meal.cook?.name}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{formatPrice(item.meal.price * item.quantity)}</span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹49.00</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal + 49/83)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;