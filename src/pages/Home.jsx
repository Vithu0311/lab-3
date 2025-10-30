import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shoesData from '../data/shoes.json';

function Home() {
  // Get featured shoes from the data
  const [featuredShoes, setFeaturedShoes] = useState([]);

  useEffect(() => {
    // Filter shoes that are marked as featured
    const featured = shoesData.shoes.filter(shoe => shoe.featured);
    setFeaturedShoes(featured);
  }, []);

  return (
    <div className="home">
      {/* Hero Banner Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Step Into Style
          </h1>
          <p className="hero-subtitle">
            Discover our premium collection of footwear designed for comfort, performance, and style
          </p>
          <Link to="/products" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop" 
            alt="Hero shoe"
          />
        </div>
      </section>

      {/* Featured Shoes Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">
            Our hand-picked selection of premium footwear
          </p>

          {/* Featured Shoes Grid */}
          <div className="product-grid">
            {featuredShoes.map(shoe => (
              <Link 
                to={`/product/${shoe.id}`} 
                key={shoe.id}
                className="product-card"
              >
                <div className="product-image">
                  <img src={shoe.image} alt={shoe.name} />
                  {/* Category badge */}
                  <span className="product-badge">{shoe.category}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{shoe.name}</h3>
                  <p className="product-description">{shoe.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${shoe.price}</span>
                    <span className="product-link-text">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to action to view all products */}
          <div className="cta-section">
            <Link to="/products" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $100</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <h3>Premium Quality</h3>
              <p>Carefully curated brands</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💳</div>
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
