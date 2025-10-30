import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import shoesData from '../data/shoes.json';

function ProductDetail({ addToCart }) {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = shoesData.shoes.find(shoe => shoe.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default selections
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }

    addToCart(product, selectedSize, selectedColor);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Show loading state while product is being fetched
  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        {/* Product Detail Grid */}
        <div className="product-detail-grid">
          {/* Product Image */}
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Product Information */}
          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            
            <p className="product-long-description">{product.longDescription}</p>

            {/* Color Selection */}
            <div className="selection-group">
              <label className="selection-label">Color</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="selection-group">
              <label className="selection-label">Size (US)</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="btn btn-primary btn-large"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="success-message">
                ✓ Added to cart successfully!
              </div>
            )}

            {/* Product Features */}
            <div className="product-features">
              <div className="feature-item">
                <strong>✓</strong> Free shipping on orders over $100
              </div>
              <div className="feature-item">
                <strong>✓</strong> 30-day return policy
              </div>
              <div className="feature-item">
                <strong>✓</strong> Premium quality guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
