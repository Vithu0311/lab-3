// Product Data
const products = [
    {
        id: 1,
        name: "Air Runner Pro",
        category: "running",
        price: 129.99,
        description: "Lightweight running shoes with advanced cushioning",
        badge: "New"
    },
    {
        id: 2,
        name: "Classic Comfort",
        category: "casual",
        price: 89.99,
        description: "Everyday casual shoes for maximum comfort",
        badge: null
    },
    {
        id: 3,
        name: "Executive Elite",
        category: "formal",
        price: 159.99,
        description: "Premium leather formal shoes",
        badge: "Premium"
    },
    {
        id: 4,
        name: "Sport Max",
        category: "sports",
        price: 119.99,
        description: "High-performance athletic shoes",
        badge: null
    },
    {
        id: 5,
        name: "Urban Walker",
        category: "casual",
        price: 79.99,
        description: "Stylish casual sneakers for city life",
        badge: "Sale"
    },
    {
        id: 6,
        name: "Sprint Elite",
        category: "running",
        price: 149.99,
        description: "Professional running shoes for athletes",
        badge: "Premium"
    },
    {
        id: 7,
        name: "Oxford Classic",
        category: "formal",
        price: 139.99,
        description: "Traditional oxford shoes for business",
        badge: null
    },
    {
        id: 8,
        name: "Court King",
        category: "sports",
        price: 109.99,
        description: "Basketball shoes with superior grip",
        badge: "New"
    },
    {
        id: 9,
        name: "Flex Runner",
        category: "running",
        price: 99.99,
        description: "Flexible running shoes for natural movement",
        badge: null
    },
    {
        id: 10,
        name: "Lounge Premium",
        category: "casual",
        price: 69.99,
        description: "Comfortable slip-on casual shoes",
        badge: "Sale"
    },
    {
        id: 11,
        name: "Derby Deluxe",
        category: "formal",
        price: 169.99,
        description: "Handcrafted derby shoes",
        badge: "Premium"
    },
    {
        id: 12,
        name: "Trail Blazer",
        category: "sports",
        price: 134.99,
        description: "All-terrain outdoor sports shoes",
        badge: "New"
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    loadCart();
    updateCartUI();
});

// Load Products
function loadProducts(category = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="fas fa-shoe-prints"></i>
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        loadProducts(filter);
    });
});

// Category Card Click
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        
        // Update filter
        setTimeout(() => {
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
            loadProducts(category);
        }, 500);
    });
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Show feedback
    showNotification('Item added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        totalAmount.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <i class="fas fa-shoe-prints"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Save Cart to Local Storage
function saveCart() {
    localStorage.setItem('shoeCart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCart() {
    const savedCart = localStorage.getItem('shoeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Toggle Cart Modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Close cart when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showNotification(
        `Checkout successful! Total: $${total.toFixed(2)} for ${itemCount} item(s). Thank you for your purchase!`,
        'success'
    );
    
    cart = [];
    saveCart();
    updateCartUI();
    cartModal.classList.remove('active');
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Successfully subscribed to our newsletter!', 'success');
    newsletterForm.reset();
});

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.querySelector('.nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Add mobile menu styles dynamically
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 968px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            gap: 1rem;
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

console.log('SoleStyle Shoe Store - Loaded Successfully!');
console.log(`Total Products: ${products.length}`);
