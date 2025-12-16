// ===================================
// PRODUCTS DATA - 12 PREMIUM CANDLES
// This is fallback data when API is disabled or fails
// ===================================

const productsDataFallback = [
    {
        id: 'midnight-rose',
        name: 'Midnight Rose',
        mood: 'Romantic & Mysterious',
        description: 'A sophisticated blend of dark roses and amber creates an intimate ambiance perfect for quiet evenings. This candle captures the essence of a moonlit garden, where mystery and romance intertwine.',
        image: 'https://images.unsplash.com/photo-1602874801006-95e39d4381d7?w=800&q=80',
        fragrance: 'floral',
        featured: true,
        fragranceNotes: ['Dark Rose', 'Amber', 'Sandalwood', 'Vanilla'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'golden-hour',
        name: 'Golden Hour',
        mood: 'Warm & Uplifting',
        description: 'Embrace the magic of sunset with this luminous blend of citrus and honey. Golden Hour brings the warmth of the fading sun into your space, creating a cozy atmosphere filled with optimism.',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
        fragrance: 'fresh',
        featured: true,
        fragranceNotes: ['Bergamot', 'Honey', 'White Tea', 'Musk'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'forest-whisper',
        name: 'Forest Whisper',
        mood: 'Grounding & Peaceful',
        description: 'Step into a serene woodland with notes of cedarwood and moss. This earthy blend brings the tranquility of nature indoors, perfect for meditation and mindful moments.',
        image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
        fragrance: 'woody',
        featured: true,
        fragranceNotes: ['Cedarwood', 'Pine', 'Moss', 'Eucalyptus'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'velvet-dream',
        name: 'Velvet Dream',
        mood: 'Luxurious & Comforting',
        description: 'Indulge in the rich warmth of vanilla and cashmere. This opulent candle wraps your space in softness, like a favorite blanket on a cold evening.',
        image: 'https://images.unsplash.com/photo-1588942396470-c45e5c4e03e3?w=800&q=80',
        fragrance: 'sweet',
        featured: false,
        fragranceNotes: ['Vanilla', 'Cashmere', 'Tonka Bean', 'Coconut'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'spiced-ember',
        name: 'Spiced Ember',
        mood: 'Cozy & Inviting',
        description: 'A warming blend of cinnamon and clove with a hint of orange peel. Perfect for gathering loved ones and creating memories around the table.',
        image: 'https://images.unsplash.com/photo-1602932956767-7d64170158d8?w=800&q=80',
        fragrance: 'spicy',
        featured: false,
        fragranceNotes: ['Cinnamon', 'Clove', 'Orange Peel', 'Nutmeg'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'ocean-mist',
        name: 'Ocean Mist',
        mood: 'Fresh & Calming',
        description: 'Breathe in the crisp air of the seaside with notes of sea salt and fresh linen. This refreshing candle brings coastal serenity to any space.',
        image: 'https://images.unsplash.com/photo-1587486936086-5fb60ee93e05?w=800&q=80',
        fragrance: 'fresh',
        featured: false,
        fragranceNotes: ['Sea Salt', 'Linen', 'Jasmine', 'Driftwood'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'lavender-twilight',
        name: 'Lavender Twilight',
        mood: 'Relaxing & Serene',
        description: 'Drift into peaceful slumber with calming lavender and chamomile. This soothing blend is your perfect companion for unwinding after a long day.',
        image: 'https://images.unsplash.com/photo-1602927715864-e3dec0dd4df0?w=800&q=80',
        fragrance: 'floral',
        featured: true,
        fragranceNotes: ['Lavender', 'Chamomile', 'Bergamot', 'Cedar'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'amber-noir',
        name: 'Amber Noir',
        mood: 'Bold & Sophisticated',
        description: 'A deep, complex fragrance of amber and leather with subtle smoke. This statement candle is for those who appreciate the finer things in life.',
        image: 'https://images.unsplash.com/photo-1603006904114-3a5178ae8c4f?w=800&q=80',
        fragrance: 'woody',
        featured: false,
        fragranceNotes: ['Amber', 'Leather', 'Tobacco', 'Oud'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'citrus-bloom',
        name: 'Citrus Bloom',
        mood: 'Energizing & Bright',
        description: 'Awaken your senses with vibrant notes of grapefruit and neroli. This invigorating candle brings sunshine and positivity to every corner.',
        image: 'https://images.unsplash.com/photo-1602932933218-f47967f0e126?w=800&q=80',
        fragrance: 'fresh',
        featured: false,
        fragranceNotes: ['Grapefruit', 'Neroli', 'Lime', 'Basil'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'mystic-smoke',
        name: 'Mystic Smoke',
        mood: 'Mysterious & Enchanting',
        description: 'An enigmatic blend of incense, patchouli, and dark berries. This candle creates an atmosphere of intrigue and contemplation, perfect for deep thoughts and creative moments.',
        image: 'https://images.unsplash.com/photo-1602173781399-bf715a78a1d5?w=800&q=80',
        fragrance: 'woody',
        featured: false,
        fragranceNotes: ['Incense', 'Patchouli', 'Dark Berries', 'Myrrh'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'winter-pine',
        name: 'Winter Pine',
        mood: 'Crisp & Refreshing',
        description: 'Capture the essence of a snow-covered forest with fresh pine needles and mint. This invigorating scent brings the beauty of winter indoors.',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
        fragrance: 'woody',
        featured: false,
        fragranceNotes: ['Pine Needle', 'Mint', 'Fir Balsam', 'Cedar'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    },
    {
        id: 'cherry-blossom',
        name: 'Cherry Blossom',
        mood: 'Delicate & Romantic',
        description: 'Experience the fleeting beauty of spring with soft cherry blossom and white musk. This ethereal fragrance celebrates renewal and new beginnings.',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
        fragrance: 'floral',
        featured: true,
        fragranceNotes: ['Cherry Blossom', 'White Musk', 'Peony', 'Green Tea'],
        burnTime: '40-45 hours',
        waxType: 'Natural Soy Blend',
        sizes: ['Small (120g)', 'Medium (220g)', 'Large (350g)']
    }
];

// ===================================
// API-READY PRODUCT FUNCTIONS
// ===================================

// Get all products (API or fallback)
async function getAllProducts() {
    // Check if API is enabled
    if (window.API_CONFIG && window.API_CONFIG.ENABLED && window.apiService) {
        try {
            return await window.apiService.getAllProducts();
        } catch (error) {
            console.warn('API failed, using fallback data:', error);
            return productsDataFallback;
        }
    }
    
    // Use fallback data if API is disabled
    return productsDataFallback;
}

// Get featured products (API or fallback)
async function getFeaturedProducts(limit = 4) {
    // Check if API is enabled
    if (window.API_CONFIG && window.API_CONFIG.ENABLED && window.apiService) {
        try {
            return await window.apiService.getFeaturedProducts(limit);
        } catch (error) {
            console.warn('API failed, using fallback data:', error);
            return productsDataFallback.filter(product => product.featured).slice(0, limit);
        }
    }
    
    // Use fallback data if API is disabled
    return productsDataFallback.filter(product => product.featured).slice(0, limit);
}

// Get product by ID (API or fallback)
async function getProductById(id) {
    // Check if API is enabled
    if (window.API_CONFIG && window.API_CONFIG.ENABLED && window.apiService) {
        try {
            return await window.apiService.getProductById(id);
        } catch (error) {
            console.warn('API failed, using fallback data:', error);
            return productsDataFallback.find(product => product.id === id);
        }
    }
    
    // Use fallback data if API is disabled
    return productsDataFallback.find(product => product.id === id);
}

// Filter products (works with fallback data only - API should handle filtering)
function filterProducts(filters) {
    let filtered = [...productsDataFallback];
    
    // Filter by scent type
    if (filters.scent && filters.scent.length > 0) {
        filtered = filtered.filter(product => 
            filters.scent.includes(product.fragrance)
        );
    }
    
    // Filter by size (all products have all sizes, so this might not be needed)
    if (filters.size && filters.size.length > 0) {
        // Products are assumed to have all sizes
    }
    
    return filtered;
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'featured':
            sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        case 'newest':
            // Assuming order in array is newest first
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }
    
    return sorted;
}

// Get related products (exclude current product, prioritize same fragrance)
function getRelatedProducts(currentProductId, limit = 3) {
    const currentProduct = getProductById(currentProductId);
    if (!currentProduct) return [];
    
    const related = productsData
        .filter(product => product.id !== currentProductId)
        .sort((a, b) => {
            // Prioritize same fragrance type
            const aScore = a.fragrance === currentProduct.fragrance ? 1 : 0;
            const bScore = b.fragrance === currentProduct.fragrance ? 1 : 0;
            return bScore - aScore;
        })
        .slice(0, limit);
    
    return related;
}

// Load featured products on homepage
// Featured products are now hardcoded in HTML - no dynamic loading needed
// if (document.getElementById('featuredProducts')) {
//     const featuredContainer = document.getElementById('featuredProducts');
//     const featuredProducts = getFeaturedProducts().slice(0, 6);
//     
//     if (featuredProducts.length > 0) {
//         featuredProducts.forEach((product, index) => {
//             const card = window.appUtils.createProductCard(product);
//             card.style.animationDelay = `${index * 0.1}s`;
//             featuredContainer.appendChild(card);
//         });
//     } else {
//         featuredContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">No featured products available.</p>';
//     }
// }

// Export for use in other files
window.productsDB = {
    getAllProducts,
    getFeaturedProducts,
    getProductById,
    filterProducts,
    sortProducts,
    getRelatedProducts
};
