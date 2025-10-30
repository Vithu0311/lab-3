# SoleStyle - Premium Shoe Selling Website

A modern, responsive shoe e-commerce website built with HTML, CSS, and JavaScript.

## Features

### 🎨 Beautiful Design
- Modern, clean UI with gradient accents
- Fully responsive design for all devices
- Smooth animations and transitions
- Professional color scheme

### 🛒 Shopping Cart
- Add products to cart
- Adjust quantities
- Remove items
- Persistent cart (saved in browser)
- Real-time total calculation
- Sliding cart modal

### 📦 Product Catalog
- 12 different shoe products
- 4 categories: Running, Casual, Formal, Sports
- Product filtering by category
- Product details with pricing
- Badge system (New, Premium, Sale)

### 🎯 Interactive Features
- Category quick-select cards
- Smooth scroll navigation
- Contact form
- Newsletter subscription
- Mobile-responsive menu
- Toast notifications for actions

## How to Use

1. **Open the Website**
   - Simply open `index.html` in your web browser
   - No server or installation required!

2. **Browse Products**
   - Scroll to the Products section
   - Use category filters to find specific types of shoes
   - Click on category cards for quick filtering

3. **Shopping Cart**
   - Click "Add" button on any product
   - Click the cart icon in the navigation to view your cart
   - Adjust quantities with +/- buttons
   - Remove items with the trash icon
   - Click "Proceed to Checkout" to complete purchase

4. **Navigation**
   - Use the top navigation menu to jump to sections
   - Click on category cards to filter products
   - All navigation uses smooth scrolling

## File Structure

```
/workspace/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactive functionality and cart logic
└── README.md       # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Interactive features
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family

## Product Categories

1. **Running** - Performance shoes for athletes
2. **Casual** - Everyday comfort and style
3. **Formal** - Elegant shoes for occasions
4. **Sports** - Specialized athletic footwear

## Key Features Explained

### Local Storage
- Cart data is automatically saved to browser's local storage
- Your cart persists even after closing the browser

### Responsive Design
- Mobile-first approach
- Breakpoints at 968px and 640px
- Adaptive navigation menu
- Optimized for all screen sizes

### Interactive Elements
- Product filtering with smooth transitions
- Add to cart with visual feedback
- Quantity controls
- Toast notifications for user actions

## Customization

### Adding New Products
Edit the `products` array in `script.js`:

```javascript
{
    id: 13,
    name: "Your Shoe Name",
    category: "running", // running, casual, formal, or sports
    price: 99.99,
    description: "Your description here",
    badge: "New" // optional: "New", "Premium", "Sale", or null
}
```

### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #f59e0b;
    /* ... other colors */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential features to add:
- Product detail pages
- User authentication
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Product search
- Size selection
- Color variants
- Order history
- Real-time inventory management

## Credits

Created with ❤️ by SoleStyle Team

---

**Note**: This is a frontend demo website. For a production version, you would need to integrate:
- Backend API for product management
- Database for product storage
- Payment processing (Stripe, PayPal, etc.)
- User authentication system
- Order management system
