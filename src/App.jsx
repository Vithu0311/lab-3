import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  // Cart state - stores all items added to cart
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('shoeCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoeCart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product, size, color) => {
    const newItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      cartId: Date.now() + Math.random(), // Unique ID for each cart item
      quantity: 1
    };
    setCart([...cart, newItem]);
  };

  // Remove item from cart by cartId
  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  // Update quantity of an item
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      {/* Navigation bar appears on all pages */}
      <Navigation cartCount={cartCount} />
      
      {/* Route definitions for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={<Checkout cart={cart} clearCart={clearCart} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
