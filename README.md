# Shoe Store - Modern E-Commerce Website

A beautiful, responsive shoe e-commerce website built with React and Vite.

## Features

✨ **Homepage** - Hero banner with featured products and company features
🛍️ **Products Page** - Browse all shoes with category filtering
🔍 **Product Details** - Detailed view with size/color selection
🛒 **Shopping Cart** - Add/remove items with quantity controls
💳 **Checkout** - Mock checkout form (no real payments)
📱 **Responsive Design** - Works perfectly on mobile and desktop
🎨 **Clean UI** - White background, bold fonts, smooth animations

## Project Structure

```
/workspace/
├── src/
│   ├── components/
│   │   └── Navigation.jsx          # Navigation bar with cart badge
│   ├── pages/
│   │   ├── Home.jsx                # Homepage with hero and featured products
│   │   ├── Products.jsx            # All products with filtering
│   │   ├── ProductDetail.jsx       # Individual product page
│   │   ├── Cart.jsx                # Shopping cart
│   │   └── Checkout.jsx            # Checkout form
│   ├── data/
│   │   └── shoes.json              # Fake product data
│   ├── styles/
│   │   └── index.css               # All CSS styles
│   ├── App.jsx                     # Main app with routing and cart logic
│   └── main.jsx                    # React entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies
└── vite.config.js                  # Vite configuration
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## How It Works

### Cart System
- Cart data is stored in React state and persisted to localStorage
- Each cart item has a unique `cartId` to handle duplicate products with different sizes/colors
- Quantity can be adjusted with + and - buttons
- Cart count badge appears in navigation

### Routing
- Uses React Router for client-side navigation
- Routes:
  - `/` - Homepage
  - `/products` - All products
  - `/product/:id` - Product detail page
  - `/cart` - Shopping cart
  - `/checkout` - Checkout form

### Data
- Product data is stored in `src/data/shoes.json`
- Includes 8 sample shoes with images, prices, descriptions, sizes, and colors
- Uses Unsplash images as placeholders

### Styling
- Clean, modern design with white background
- Bold Inter font family
- Smooth hover animations on cards and buttons
- Fully responsive with breakpoints for tablet (968px) and mobile (640px)
- CSS transitions and animations for polished UX

## Customization

### Adding New Products
Edit `src/data/shoes.json` and add new shoe objects:

```json
{
  "id": 9,
  "name": "Your Shoe Name",
  "price": 99.99,
  "category": "Running",
  "description": "Short description",
  "longDescription": "Detailed description",
  "image": "https://your-image-url.com",
  "featured": true,
  "colors": ["Black", "White"],
  "sizes": [8, 9, 10, 11, 12]
}
```

### Changing Colors
Update CSS custom properties in `src/styles/index.css`:
- Primary color: `#1a1a1a` (black)
- Background: `#ffffff` (white)
- Text: `#666` (gray)

## Technologies Used

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations
- **localStorage** - Cart persistence

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Free to use and modify for personal and commercial projects.

---

Enjoy building your shoe store! 👟
