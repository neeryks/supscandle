// ===================================
// PRODUCT DETAIL PAGE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Wait for API service to be ready
    const checkAndInit = setInterval(() => {
        if (window.apiService && window.productsDB) {
            clearInterval(checkAndInit);
            initProductPage();
        }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkAndInit), 5000);
});

async function initProductPage() {
    // Get product ID from URL
    const productId = window.appUtils.getUrlParameter('id');
    
    if (!productId) {
        console.error('❌ No product ID in URL');
        window.location.href = 'shop.html';
        return;
    }
    
    console.log(`🔄 Loading product: ${productId} from Contentful...`);
    
    try {
        // Get product data
        const product = await window.productsDB.getProductById(productId);
        
        if (!product) {
            console.error(`❌ Product not found: ${productId}`);
            window.location.href = 'shop.html';
            return;
        }
        
        console.log(`✅ Loaded product:`, product);
        console.log('📦 Product data:', {
            availableFragrances: product.availableFragrances,
            pricing: product.pricing,
            careInstructions: product.careInstructions
        });
        
        // Render product details
        renderProductDetails(product);
        
        // Setup fragrance selector
        setupFragranceSelector(product);
        
        // Setup buy button
        setupBuyButton(product);
        
        // Render image gallery if multiple images
        if (product.images && product.images.length > 0) {
            renderImageGallery(product);
        }
        
        // Render care instructions if available
        if (product.careInstructions && product.careInstructions.length > 0) {
            renderCareInstructions(product.careInstructions);
        }
        
        // Load related products
        loadRelatedProducts(productId);
    } catch (error) {
        console.error('❌ Error loading product:', error);
        alert('Error loading product. Please try again.');
        window.location.href = 'shop.html';
    }
}

function renderProductDetails(product) {
    console.log('📝 Rendering product details:', product);
    
    if (!product) {
        console.error('❌ No product data to render!');
        return;
    }
    
    // Update page title
    document.title = `${product.name} — Sup's Candle`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && product.description) {
        metaDescription.setAttribute('content', product.description);
    }
    
    // Main image
    const mainImage = document.getElementById('mainImage');
    console.log('🖼️ Setting main image:', product.image);
    if (mainImage) {
        if (product.image) {
            mainImage.src = product.image;
            mainImage.alt = product.name;
            console.log('✅ Main image set');
        } else {
            console.warn('⚠️ No image available for product');
        }
    } else {
        console.error('❌ Main image element not found!');
    }
    
    // Breadcrumb
    const breadcrumb = document.getElementById('productBreadcrumb');
    console.log('🍞 Setting breadcrumb:', product.name);
    if (breadcrumb) {
        breadcrumb.textContent = product.name;
        console.log('✅ Breadcrumb set');
    } else {
        console.error('❌ Breadcrumb element not found!');
    }
    
    // Product name
    const nameElement = document.getElementById('productName');
    console.log('📝 Setting product name:', product.name);
    if (nameElement) {
        nameElement.textContent = product.name;
        console.log('✅ Product name set');
    } else {
        console.error('❌ Product name element not found!');
    }
    
    // Product price (will be updated when fragrance and size are selected)
    // Initial price will be set by setupFragranceSelector
    
    // Product description
    const descriptionElement = document.getElementById('productDescription');
    if (descriptionElement && product.description) {
        descriptionElement.innerHTML = `<p>${product.description}</p>`;
    }
    
    // Burn time
    const burnTimeElement = document.getElementById('burnTime');
    if (burnTimeElement && product.burnTime) {
        burnTimeElement.textContent = product.burnTime;
    }
    
    // Wax type - fallback if not in Contentful
    const waxTypeElement = document.getElementById('waxType');
    if (waxTypeElement) {
        waxTypeElement.textContent = product.waxType || 'Natural Soy Blend';
    }
    
    // Fragrance type
    const fragranceElement = document.getElementById('fragrance');
    if (fragranceElement) {
        const fragrance = product.fragrance || product.category || 'Premium';
        fragranceElement.textContent = capitalizeFirst(fragrance);
    }
    
    // Fragrance type
    const fragranceType = document.getElementById('fragranceType');
    if (fragranceType && product.fragrance) {
        fragranceType.innerHTML = `<span class="feature-highlight">${product.fragrance}</span>`;
    }
    
    // Wax type
    const waxType = document.getElementById('waxType');
    if (waxType && product.waxType) {
        waxType.textContent = product.waxType;
    }
    
    console.log('✅ Product details rendered successfully');
}

function setupFragranceSelector(product) {
    const fragranceSelector = document.getElementById('fragranceSelector');
    if (!fragranceSelector) return;
    
    const availableFragrances = product.availableFragrances || [];
    
    console.log('🔍 Available fragrances:', availableFragrances);
    console.log('💰 Pricing data:', product.pricing);
    
    // If no fragrances available, show error
    if (availableFragrances.length === 0) {
        console.warn('⚠️ No available fragrances for this product');
        fragranceSelector.innerHTML = '<option value="">No fragrances available</option>';
        return;
    }
    
    // Populate fragrance dropdown
    fragranceSelector.innerHTML = availableFragrances.map(fragrance => 
        `<option value="${fragrance}">${fragrance}</option>`
    ).join('');
    
    console.log('✅ Fragrance selector populated with', availableFragrances.length, 'options');
    
    // Set initial price based on first fragrance
    updatePrice(product, availableFragrances[0]);
    
    // Listen for fragrance changes
    fragranceSelector.addEventListener('change', function() {
        const selectedFragrance = this.value;
        console.log('🌸 Fragrance changed to:', selectedFragrance);
        updatePrice(product, selectedFragrance);
    });
}

function updatePrice(product, fragrance) {
    const priceElement = document.getElementById('productPrice');
    if (!priceElement) return;
    
    let price = product.price || 250;
    
    // Check flat pricing structure: {"Geeli Mitti": 250, "Vanilla": 300}
    if (product.pricing && product.pricing[fragrance]) {
        price = product.pricing[fragrance];
        console.log(`💰 Price for ${fragrance}: ₹${price}`);
    } else {
        console.warn(`⚠️ No pricing found for ${fragrance}, using base price`);
    }
    
    priceElement.textContent = `₹${price.toFixed(2)}`;
}

// Size selection removed - pricing is fragrance-only now

function setupBuyButton(product) {
    const buyButton = document.getElementById('buyNowBtn');
    
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            // Get selected fragrance
            const fragranceSelector = document.getElementById('fragranceSelector');
            const selectedFragrance = fragranceSelector ? fragranceSelector.value : 'Not selected';
            
            // Get current price for selected fragrance
            let currentPrice = product.price || 250;
            if (product.pricing && selectedFragrance && product.pricing[selectedFragrance]) {
                currentPrice = product.pricing[selectedFragrance];
            }
            
            // Get product details
            const category = product.category || 'Premium Candle';
            const waxType = product.waxType || 'Natural Soy';
            const burnTime = product.burnTime || '40+ hours';
            
            // Create detailed message
            const message = `Hi! I'd like to order this candle 🕯️

*Product:* ${product.name}
*Category:* ${category}
*Fragrance:* ${selectedFragrance}
*Price:* ₹${currentPrice}

*Details:*
• Wax Type: ${waxType}
• Burn Time: ${burnTime}

Please let me know about availability and how to order. Thank you!`;
            
            // Copy message to clipboard
            copyToClipboard(message);
            
            // Open Instagram DM with pre-filled message
            const instagramUsername = window.API_CONFIG?.INSTAGRAM?.USERNAME || 'supscandle';
            const encodedMessage = encodeURIComponent(message);
            const instagramUrl = `https://ig.me/m/${instagramUsername}`;
            
            // Try to open Instagram app first (mobile), fallback to web
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                // Try Instagram app deep link
                window.location.href = `instagram://user?username=${instagramUsername}`;
                // Fallback to web after short delay
                setTimeout(() => {
                    window.open(instagramUrl, '_blank');
                }, 1000);
            } else {
                // Desktop: open Instagram web
                window.open(instagramUrl, '_blank');
            }
            
            // Show toast notification
            if (window.appUtils) {
                window.appUtils.showToast('Message copied! Opening Instagram...', 'success');
            } else {
                alert('Message copied to clipboard! Paste it in Instagram DM.');
            }
        });
    }
}

function renderImageGallery(product) {
    // Check if product has multiple images
    if (!product.images || product.images.length === 0) return;
    
    const galleryContainer = document.querySelector('.product-gallery');
    if (!galleryContainer) return;
    
    // Create thumbnail gallery
    const thumbnailsDiv = document.createElement('div');
    thumbnailsDiv.className = 'product-thumbnails';
    thumbnailsDiv.style.cssText = 'display: flex; gap: 10px; margin-top: 15px; overflow-x: auto;';
    
    // Add main image as first thumbnail
    const mainImg = document.getElementById('mainImage');
    if (mainImg && product.image) {
        const mainThumb = createThumbnail(product.image, mainImg);
        thumbnailsDiv.appendChild(mainThumb);
    }
    
    // Add additional images as thumbnails
    product.images.forEach(imageUrl => {
        const thumb = createThumbnail(imageUrl, mainImg);
        thumbnailsDiv.appendChild(thumb);
    });
    
    galleryContainer.appendChild(thumbnailsDiv);
}

function createThumbnail(imageUrl, mainImageElement) {
    const thumb = document.createElement('img');
    thumb.src = imageUrl;
    thumb.style.cssText = 'width: 80px; height: 80px; object-fit: cover; cursor: pointer; border-radius: 8px; border: 2px solid transparent; transition: all 0.3s;';
    thumb.addEventListener('click', () => {
        mainImageElement.src = imageUrl;
        // Highlight active thumbnail
        document.querySelectorAll('.product-thumbnails img').forEach(t => {
            t.style.borderColor = 'transparent';
        });
        thumb.style.borderColor = '#6E1F2A';
    });
    return thumb;
}

function renderCareInstructions(instructions) {
    console.log('🧼 Rendering care instructions:', instructions);
    const careList = document.getElementById('careInstructionsList');
    
    if (!careList) {
        console.error('❌ Care instructions list element not found');
        return;
    }
    
    if (!instructions || instructions.length === 0) {
        careList.innerHTML = '<li>No care instructions available</li>';
        return;
    }
    
    careList.innerHTML = instructions.map(instruction => 
        `<li>${instruction}</li>`
    ).join('');
    
    console.log('✅ Care instructions rendered:', instructions.length, 'items');
}

async function loadRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('relatedProducts');
    
    if (!relatedContainer) return;
    
    // Get all products and show 3-4 random ones (excluding current)
    const allProducts = await window.productsDB.getAllProducts();
    const otherProducts = allProducts.filter(p => p.id !== currentProductId);
    
    // Shuffle and take 3-4 random products
    const shuffled = otherProducts.sort(() => 0.5 - Math.random());
    const randomCount = 3 + Math.floor(Math.random() * 2); // 3 or 4
    const randomProducts = shuffled.slice(0, randomCount);
    
    if (randomProducts.length > 0) {
        randomProducts.forEach((product, index) => {
            const card = window.appUtils.createProductCard(product);
            card.style.animationDelay = `${index * 0.1}s`;
            relatedContainer.appendChild(card);
        });
    } else {
        relatedContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1/-1;">No other products found.</p>';
    }
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Message copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Message copied to clipboard');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
    }
}

// ===================================
// ENHANCED UI INTERACTIONS
// ===================================

// Add sparkle effect on button hover
document.addEventListener('DOMContentLoaded', function() {
    const buyButton = document.getElementById('buyNowBtn');
    
    if (buyButton) {
        buyButton.addEventListener('mouseenter', function(e) {
            createSparkles(e.currentTarget);
        });
    }
    
    // Add scroll reveal animation
    initScrollReveal();
    
    // Add image hover effect
    const productImage = document.querySelector('.product-image-main');
    if (productImage) {
        productImage.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
});

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * rect.width + 'px';
            sparkle.style.top = Math.random() * rect.height + 'px';
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.product-info > *');
    
    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}
