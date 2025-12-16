// API Service for Sup's Candles
// Handles all API calls with caching and error handling

class APIService {
    constructor() {
        this.cache = new Map();
        this.config = window.API_CONFIG || {};
    }

    // Generic fetch with timeout
    async fetchWithTimeout(url, options = {}, timeout = 10000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
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

    // Get products with optional filters
    async getProducts(filters = {}) {
        // Build query parameters
        const params = new URLSearchParams();
        
        if (filters.featured !== undefined) params.append('featured', filters.featured);
        if (filters.category) params.append('category', filters.category);
        if (filters.search) params.append('search', filters.search);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.inStock !== undefined) params.append('inStock', filters.inStock);
        
        const queryString = params.toString();
        const cacheKey = `products_${queryString}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.config.BASE_URL}${this.config.ENDPOINTS.PRODUCTS}${queryString ? '?' + queryString : ''}`;
            const response = await this.fetchWithTimeout(url, {}, this.config.TIMEOUT);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success || !result.data) {
                throw new Error('Invalid API response format');
            }
            
            this.setCache(cacheKey, result.data);
            return result.data;
            
        } catch (error) {
            console.error('Failed to fetch products:', error);
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

    // Get single product by ID
    async getProductById(productId) {
        const cacheKey = `product_${productId}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.config.BASE_URL}${this.config.ENDPOINTS.PRODUCTS}/${productId}`;
            const response = await this.fetchWithTimeout(url, {}, this.config.TIMEOUT);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Product not found');
                }
                throw new Error(`API Error: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result.success || !result.data) {
                throw new Error('Invalid API response format');
            }
            
            this.setCache(cacheKey, result.data);
            return result.data;
            
        } catch (error) {
            console.error(`Failed to fetch product ${productId}:`, error);
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
        const username = this.config.INSTAGRAM?.USERNAME || 'your_handle';
        
        // Create custom message with product details
        let message = this.config.INSTAGRAM?.MESSAGE_TEMPLATE || 
            "Hi! I'm interested in the {productName} candle ({productMood}). Price: ${price}. Can you tell me more?";
        
        // Replace placeholders
        message = message
            .replace('{productName}', product.name)
            .replace('{productMood}', product.mood)
            .replace('{price}', product.price || '32.00');
        
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
