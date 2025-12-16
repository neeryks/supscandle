// ===================================
// MAIN JAVASCRIPT - Global Functionality
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initScrollReveal();
    initEnhancedEffects();
});

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('menu-open', isActive);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Prevent menu clicks from closing it
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// ===================================
// SCROLL EFFECTS
// ===================================

function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) return;
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format Instagram DM link
function createInstagramDMLink(productName, size = 'Medium (220g)') {
    const instagramHandle = 'your_handle'; // Replace with actual Instagram handle
    const message = encodeURIComponent(
        `Hi! I'd like to order the "${productName}" candle 🕯️\nSize: ${size}`
    );
    return `https://instagram.com/${instagramHandle}?text=${message}`;
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: var(--color-bg-elevated);
        color: var(--color-text-primary);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Loading state
function setLoading(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// Format price (if needed in the future)
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card stagger-item';
    
    // Get starting price (lowest price from pricing object or base price)
    let startingPrice = product.price || 250;
    if (product.pricing && Object.keys(product.pricing).length > 0) {
        // Flat pricing: {"Geeli Mitti": 250, "Vanilla": 300}
        const prices = Object.values(product.pricing).filter(p => typeof p === 'number');
        if (prices.length > 0) {
            startingPrice = Math.min(...prices);
        }
    }
    
    card.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-card-link">
            <div class="product-card-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.featured ? '<span class="product-card-badge">Featured</span>' : ''}
                ${product.badge ? `<span class="product-card-badge badge-custom">${product.badge}</span>` : ''}
            </div>
            <div class="product-card-content">
                ${product.category ? `<div class="product-card-category">${product.category}</div>` : ''}
                <h3 class="product-card-name">${product.name}</h3>
                <div class="product-card-price-section">
                    <div class="product-card-price-label">Starting from</div>
                    <div class="product-card-price">₹${startingPrice.toFixed(2)}</div>
                </div>
                <div class="product-card-cta">
                    <span class="product-card-link">
                        View Details
                        <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </a>
    `;
    
    return card;
}

// Image lazy loading fallback
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// ===================================
// LOAD FEATURED PRODUCTS ON HOMEPAGE
// ===================================
async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    
    if (!featuredContainer) return; // Not on homepage
    
    try {
        console.log('🔄 Loading featured products from Contentful...');
        
        // Get featured products from API
        const products = await window.apiService.getFeaturedProducts(4);
        
        console.log(`✅ Loaded ${products.length} featured products:`, products);
        
        if (!products || products.length === 0) {
            console.warn('⚠️ No featured products found');
            return;
        }
        
        // Clear existing hardcoded products
        featuredContainer.innerHTML = '';
        
        // Add products from Contentful
        products.forEach((product, index) => {
            const card = createProductCard(product);
            card.style.animationDelay = `${index * 0.1}s`;
            featuredContainer.appendChild(card);
        });
        
        console.log('✅ Featured products displayed successfully');
        
    } catch (error) {
        console.error('❌ Error loading featured products:', error);
        // Keep hardcoded products if API fails
    }
}

// Load featured products when API service is ready
if (document.getElementById('featuredProducts')) {
    // Wait for API service to initialize
    const checkAndLoad = setInterval(() => {
        if (window.apiService && window.apiService.client) {
            clearInterval(checkAndLoad);
            loadFeaturedProducts();
        }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkAndLoad), 5000);
}

// ===================================
// ENHANCED UI EFFECTS
// ===================================

function initEnhancedEffects() {
    // Add sparkle effect to all buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-breathtaking, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            createSparkles(this);
        });
    });
    
    // Add sparkle to product cards on hover
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-card-image');
            if (image) {
                createSparkles(image);
            }
        });
    });
    
    // Add sparkle to feature bubbles
    const featureBubbles = document.querySelectorAll('.feature-bubble');
    featureBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    // Add sparkle to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    // Add sparkle to instagram items
    const instaItems = document.querySelectorAll('.instagram-item');
    instaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * rect.width + 'px';
            sparkle.style.top = Math.random() * rect.height + 'px';
            
            // Make element position relative if not already
            const position = window.getComputedStyle(element).position;
            if (position === 'static') {
                element.style.position = 'relative';
            }
            
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Export functions for use in other scripts
window.appUtils = {
    createInstagramDMLink,
    showToast,
    setLoading,
    formatPrice,
    getUrlParameter,
    createProductCard,
    debounce,
    loadFeaturedProducts
};
