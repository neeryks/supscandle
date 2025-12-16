// API Service for Sup's Candles - Contentful Integration
// Handles all Contentful API calls with caching and error handling

class APIService {
    constructor() {
        this.cache = new Map();
        this.config = window.API_CONFIG || {};
        this.client = null;
        this.initContentful();
    }

    // Initialize Contentful client
    initContentful() {
        if (typeof contentful === 'undefined') {
            console.warn('Contentful SDK not loaded. Using fallback data.');
            return;
        }

        try {
            this.client = contentful.createClient({
                space: this.config.CONTENTFUL.SPACE_ID,
                accessToken: this.config.CONTENTFUL.ACCESS_TOKEN,
                environment: this.config.CONTENTFUL.ENVIRONMENT || 'master'
            });
            console.log('✅ Contentful client initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Contentful:', error);
        }
    }

    // Transform Contentful entry to API format
    transformProduct(entry) {
        if (!entry || !entry.fields) return null;
        
        const fields = entry.fields;
        
        // Handle image array (your schema uses Array of Assets)
        let mainImage = '';
        let additionalImages = [];
        
        if (fields.image && Array.isArray(fields.image) && fields.image.length > 0) {
            // First image is main image
            if (fields.image[0]?.fields?.file?.url) {
                mainImage = `https:${fields.image[0].fields.file.url}?w=800&q=80`;
            }
            // Rest are additional images
            additionalImages = fields.image.slice(1).map(img => 
                img?.fields?.file?.url ? `https:${img.fields.file.url}?w=800&q=80` : ''
            ).filter(url => url !== '');
        }
        
        // Use fields.id if available, otherwise fall back to sys.id
        const productId = fields.id || entry.sys.id;
        
        const transformed = {
            id: productId,
            name: fields.name || '',
            slug: productId,
            mood: fields.mood || '',
            description: fields.description || '',
            price: fields.price || 0,
            image: mainImage,
            images: additionalImages,
            category: fields.category || '',
            featured: fields.featured || false,
            badge: fields.badge || '',
            burnTime: fields.burnTime || '40+ hours',
            size: fields.size || 'Medium',
            sizes: fields.sizes || [fields.size || 'Medium'],
            availableFragrances: fields.availableFragrances || [],
            waxType: fields.waxType || 'Natural Soy Blend',
            careInstructions: fields.careInstructions || [],
            pricing: fields.pricing || {},
            ingredients: [],
            inStock: fields.instock !== undefined ? fields.instock : true,
            quantity: 0
        };
        
        console.log('🔄 Transformed product:', {
            id: transformed.id,
            name: transformed.name,
            availableFragrances: transformed.availableFragrances,
            pricing: transformed.pricing,
            careInstructions: transformed.careInstructions?.length || 0
        });
        
        return transformed;
    }

    // Check cache
    getCached(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        const now = Date.now();
        if (now - cached.timestamp > (this.config.CACHE_DURATION || 300000)) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data;
    }

    // Set cache
    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Get products with optional filters from Contentful
    async getProducts(filters = {}) {
        if (!this.client) {
            throw new Error('Contentful client not initialized');
        }

        // Build cache key
        const cacheKey = `products_${JSON.stringify(filters)}`;
        const cached = this.getCached(cacheKey);
        if (cached) {
            console.log('📦 Returning cached products');
            return cached;
        }

        try {
            // Build Contentful query
            const query = {
                content_type: this.config.CONTENTFUL.CONTENT_TYPE,
                order: '-sys.createdAt'
            };
            
            // Apply filters
            if (filters.featured === true || filters.featured === 'true') {
                query['fields.featured'] = true;
            }
            if (filters.category) {
                query['fields.category'] = filters.category;
            }
            if (filters.inStock === true || filters.inStock === 'true') {
                query['fields.inStock'] = true;
            }
            if (filters.limit) {
                query.limit = parseInt(filters.limit);
            }
            if (filters.search) {
                query.query = filters.search;
            }
            
            console.log('🔍 Fetching from Contentful:', query);
            
            // Fetch from Contentful
            const response = await this.client.getEntries(query);
            
            console.log(`✅ Fetched ${response.items.length} products from Contentful`);
            
            // Transform entries
            const products = response.items
                .map(entry => this.transformProduct(entry))
                .filter(product => product !== null);
            
            // Cache and return
            this.setCache(cacheKey, products);
            return products;
            
        } catch (error) {
            console.error('❌ Failed to fetch products from Contentful:', error);
            throw error;
        }
    }

    // Get all products (convenience method)
    async getAllProducts() {
        return this.getProducts({});
    }

    // Get featured products (convenience method)
    async getFeaturedProducts(limit = 4) {
        return this.getProducts({ featured: true, limit });
    }

    // Get single product by ID from Contentful
    async getProductById(productId) {
        if (!this.client) {
            throw new Error('Contentful client not initialized');
        }

        const cacheKey = `product_${productId}`;
        const cached = this.getCached(cacheKey);
        if (cached) {
            console.log(`📦 Returning cached product: ${productId}`);
            return cached;
        }

        try {
            console.log(`🔍 Fetching product from Contentful: ${productId}`);
            
            // First try: Query by fields.id
            let response = await this.client.getEntries({
                content_type: this.config.CONTENTFUL.CONTENT_TYPE,
                'fields.id': productId,
                limit: 1
            });
            
            // Second try: If not found, try by sys.id
            if (response.items.length === 0) {
                console.log(`🔄 Product not found by fields.id, trying sys.id: ${productId}`);
                try {
                    const entry = await this.client.getEntry(productId);
                    if (entry && entry.sys.contentType.sys.id === this.config.CONTENTFUL.CONTENT_TYPE) {
                        response = { items: [entry] };
                    }
                } catch (sysError) {
                    console.log(`❌ Product not found by sys.id either`);
                }
            }
            
            if (response.items.length === 0) {
                throw new Error(`Product not found: ${productId}`);
            }
            
            console.log(`✅ Found product: ${productId}`);
            
            // Transform and cache
            const product = this.transformProduct(response.items[0]);
            
            if (!product) {
                throw new Error('Failed to transform product data');
            }
            
            this.setCache(cacheKey, product);
            return product;
            
        } catch (error) {
            console.error(`❌ Failed to fetch product ${productId}:`, error);
            throw error;
        }
    }

    // Search products (convenience method)
    async searchProducts(searchTerm) {
        return this.getProducts({ search: searchTerm });
    }

    // Clear all cache
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Cache cleared');
    }

    // Clear specific cache entry
    clearCacheByKey(key) {
        this.cache.delete(key);
    }
}

// Instagram DM Helper
class InstagramHelper {
    constructor() {
        this.config = window.API_CONFIG || {};
    }

    // Generate Instagram DM URL with product details
    getProductInquiryURL(product) {
        const username = this.config.INSTAGRAM?.USERNAME || 'your_instagram_handle';
        
        // Create custom message with product details
        let message = this.config.INSTAGRAM?.MESSAGE_TEMPLATE || 
            "Hi! I'm interested in the {productName} candle ({size}). Is it available?\n\nProduct: {productName}\nSize: {size}\nPrice: ${price}\n\nPlease let me know about availability and how to purchase. Thank you!";
        
        // Replace placeholders
        message = message
            .replace(/{productName}/g, product.name)
            .replace(/{size}/g, product.size || '8 oz')
            .replace(/{price}/g, product.price || '32.00');
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Return Instagram DM deep link
        return `https://ig.me/m/${username}?text=${encodedMessage}`;
    }

    // Open Instagram DM in new window
    openProductInquiry(product) {
        const url = this.getProductInquiryURL(product);
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

// Create singleton instances
window.apiService = new APIService();
window.instagramHelper = new InstagramHelper();
