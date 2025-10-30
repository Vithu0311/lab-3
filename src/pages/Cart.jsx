import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart, updateQuantity }) {
  // Calculate total price of all items in cart
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some amazing shoes to get started!</p>
            <Link to="/products" className="btn btn-primary">
              Shop Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.cartId} className="cart-item">
                {/* Product Image */}
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Details */}
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-meta">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </p>
                  <p className="cart-item-price">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="cart-item-quantity">
                  <label className="quantity-label">Quantity</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="cart-item-total">
                  <p className="item-total-label">Total</p>
                  <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Remove Button */}
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.cartId)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{totalPrice >= 100 ? 'FREE' : '$9.99'}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>
                ${(totalPrice + (totalPrice >= 100 ? 0 : 9.99) + (totalPrice * 0.08)).toFixed(2)}
              </span>
            </div>

            {/* Free shipping message */}
            {totalPrice < 100 && (
              <div className="shipping-notice">
                Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
              </div>
            )}

            <Link to="/checkout" className="btn btn-primary btn-large">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
