// Product Data
const products = [
    // Electronics
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 79.99, originalPrice: 129.99, rating: '⭐⭐⭐⭐⭐ (245)', emoji: '🎧', discount: 38 },
    { id: 2, name: 'Smartwatch Pro', category: 'Electronics', price: 199.99, originalPrice: 299.99, rating: '⭐⭐⭐⭐⭐ (189)', emoji: '⌚', discount: 33 },
    { id: 3, name: 'HD Camera', category: 'Electronics', price: 349.99, originalPrice: 499.99, rating: '⭐⭐⭐⭐ (156)', emoji: '📷', discount: 30 },
    { id: 4, name: 'Tablet 10"', category: 'Electronics', price: 249.99, originalPrice: 349.99, rating: '⭐⭐⭐⭐⭐ (203)', emoji: '📱', discount: 28 },
    
    // Fashion
    { id: 5, name: 'Premium T-Shirt', category: 'Fashion', price: 29.99, originalPrice: 49.99, rating: '⭐⭐⭐⭐ (312)', emoji: '👕', discount: 40 },
    { id: 6, name: 'Designer Jeans', category: 'Fashion', price: 59.99, originalPrice: 99.99, rating: '⭐⭐⭐⭐⭐ (428)', emoji: '👖', discount: 40 },
    { id: 7, name: 'Winter Jacket', category: 'Fashion', price: 89.99, originalPrice: 149.99, rating: '⭐⭐⭐⭐⭐ (267)', emoji: '🧥', discount: 40 },
    { id: 8, name: 'Running Sneakers', category: 'Fashion', price: 79.99, originalPrice: 129.99, rating: '⭐⭐⭐⭐⭐ (358)', emoji: '👟', discount: 38 },
    
    // Home & Garden
    { id: 9, name: 'Coffee Maker', category: 'Home & Garden', price: 49.99, originalPrice: 79.99, rating: '⭐⭐⭐⭐ (189)', emoji: '☕', discount: 37 },
    { id: 10, name: 'Luxury Bedding Set', category: 'Home & Garden', price: 99.99, originalPrice: 149.99, rating: '⭐⭐⭐⭐⭐ (445)', emoji: '🛏️', discount: 33 },
    { id: 11, name: 'Power Tool Kit', category: 'Home & Garden', price: 69.99, originalPrice: 119.99, rating: '⭐⭐⭐⭐ (234)', emoji: '🔧', discount: 41 },
    { id: 12, name: 'LED Desk Lamp', category: 'Home & Garden', price: 34.99, originalPrice: 59.99, rating: '⭐⭐⭐⭐ (156)', emoji: '💡', discount: 41 },
    
    // Sports & Outdoors
    { id: 13, name: 'Athletic Shoes', category: 'Sports', price: 89.99, originalPrice: 139.99, rating: '⭐⭐⭐⭐⭐ (378)', emoji: '🏃', discount: 35 },
    { id: 14, name: 'Yoga Mat Premium', category: 'Sports', price: 39.99, originalPrice: 69.99, rating: '⭐⭐⭐⭐ (267)', emoji: '🧘', discount: 42 },
    { id: 15, name: 'Mountain Bicycle', category: 'Sports', price: 299.99, originalPrice: 499.99, rating: '⭐⭐⭐⭐⭐ (523)', emoji: '🚴', discount: 40 },
    { id: 16, name: 'Basketball Pro', category: 'Sports', price: 49.99, originalPrice: 79.99, rating: '⭐⭐⭐⭐ (198)', emoji: '🏀', discount: 37 },
    
    // Books & Media
    { id: 17, name: 'Self-Help Bestseller', category: 'Books', price: 14.99, originalPrice: 24.99, rating: '⭐⭐⭐⭐⭐ (892)', emoji: '📚', discount: 40 },
    { id: 18, name: 'Fiction Novel Set', category: 'Books', price: 29.99, originalPrice: 49.99, rating: '⭐⭐⭐⭐⭐ (456)', emoji: '📖', discount: 40 },
    { id: 19, name: 'Cooking Cookbook', category: 'Books', price: 24.99, originalPrice: 39.99, rating: '⭐⭐⭐⭐ (234)', emoji: '👨‍🍳', discount: 37 },
    { id: 20, name: 'Online Courses Bundle', category: 'Books', price: 99.99, originalPrice: 199.99, rating: '⭐⭐⭐⭐⭐ (678)', emoji: '🎓', discount: 50 }
];

let currentFilter = 'All';
let currentMaxPrice = 500;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupHamburgerMenu();
});

// Display Products
function displayProducts(filteredProducts) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${product.rating}</div>
                <div class="product-price">
                    <div>
                        <span class="price">$${product.price}</span>
                        <span class="original-price">$${product.originalPrice}</span>
                    </div>
                    <span class="discount">-${product.discount}%</span>
                </div>
                <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter by Category
function filterByCategory(category) {
    currentFilter = category;
    updateFilters();
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(category) || (category === 'All' && btn.textContent === 'All Products')) {
            btn.classList.add('active');
        }
    });
}

// Filter by Price
function filterByPrice(price) {
    currentMaxPrice = price;
    document.getElementById('priceValue').textContent = price;
    updateFilters();
}

// Update Filters
function updateFilters() {
    let filtered = products;

    if (currentFilter !== 'All') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    filtered = filtered.filter(p => p.price <= currentMaxPrice);
    displayProducts(filtered);
}

// Reset Filters
function resetFilters() {
    currentFilter = 'All';
    currentMaxPrice = 500;
    document.getElementById('priceRange').value = 500;
    document.getElementById('priceValue').textContent = 500;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === 'All Products') {
            btn.classList.add('active');
        }
    });

    displayProducts(products);
}

// Add to Cart
function addToCart(productName, price) {
    alert(`✅ ${productName} added to cart!\nPrice: $${price}`);
}

// Handle Newsletter
function handleNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    const message = document.getElementById('newsletterMessage');
    
    if (email) {
        message.textContent = '✅ Thank you for subscribing! Check your email for exclusive offers.';
        message.classList.remove('error');
        message.classList.add('success');
        document.getElementById('newsletterEmail').value = '';
        
        setTimeout(() => {
            message.classList.remove('success');
        }, 4000);
    }
}

// Handle Contact Form
function handleContactForm(event) {
    event.preventDefault();
    const message = document.getElementById('contactMessage');
    
    message.textContent = '✅ Your message has been sent successfully! We\'ll get back to you soon.';
    message.classList.remove('error');
    message.classList.add('success');
    
    event.target.reset();
    
    setTimeout(() => {
        message.classList.remove('success');
    }, 4000);
}

// Hamburger Menu
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Close Promotional Banner
function closePromoBanner() {
    const banner = document.querySelector('.promo-banner');
    banner.style.display = 'none';
}

// Animate countdown timer (optional - for demo purposes)
function updateCountdown() {
    let seconds = 19395; // 5 hours 23 minutes 15 seconds
    
    setInterval(() => {
        seconds--;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        const timeElements = document.querySelectorAll('.time-left');
        if (timeElements[0]) {
            timeElements[0].textContent = `Ends in: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    }, 1000);
}

// Start countdown on page load
updateCountdown();