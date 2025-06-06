import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const addToCart = (item) => {
    if (!user) {
      // Store the intended item in localStorage to add after login
      localStorage.setItem('pendingCartItem', JSON.stringify(item));
      // Redirect to login page
      navigate('/login');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Check for pending cart items after login
  React.useEffect(() => {
    if (user) {
      const pendingItem = localStorage.getItem('pendingCartItem');
      if (pendingItem) {
        addToCart(JSON.parse(pendingItem));
        localStorage.removeItem('pendingCartItem');
      }
    }
  }, [user]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 