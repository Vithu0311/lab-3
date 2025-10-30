import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shoesData from '../data/shoes.json';

function Products() {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load all shoes
    setShoes(shoesData.shoes);
    setFilteredShoes(shoesData.shoes);

    // Extract unique categories from shoes data
    const uniqueCategories = ['All', ...new Set(shoesData.shoes.map(shoe => shoe.category))];
    setCategories(uniqueCategories);
  }, []);

  // Filter shoes when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredShoes(shoes);
    } else {
      setFilteredShoes(shoes.filter(shoe => shoe.category === selectedCategory));
    }
  }, [selectedCategory, shoes]);

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">All Products</h1>
          <p className="page-subtitle">
            Browse our complete collection of premium footwear
          </p>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="results-count">
            Showing {filteredShoes.length} {filteredShoes.length === 1 ? 'product' : 'products'}
          </div>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {filteredShoes.map(shoe => (
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

        {/* Show message if no products found */}
        {filteredShoes.length === 0 && (
          <div className="no-results">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
