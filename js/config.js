// Contentful Configuration
const API_CONFIG = {
    // Contentful Credentials
    CONTENTFUL: {
        SPACE_ID: 'jdu7xbn8rfp0',
        ACCESS_TOKEN: '_q24PVyehbUADTp1ei6bI_DfBP5GjJoytjlMAwEbRFw',
        ENVIRONMENT: 'master',
        CONTENT_TYPE: 'candle'  // ← Updated to match your Contentful content type
    },
    
    // Instagram Configuration
    INSTAGRAM: {
        USERNAME: 'supscandle',
        // Message template for product inquiries
        MESSAGE_TEMPLATE: 'Hi! I\'m interested in the {productName} candle ({size}). Is it available?\n\nProduct: {productName}\nSize: {size}\nPrice: ${price}\n\nPlease let me know about availability and how to purchase. Thank you!'
    },
    
    // Request timeout (milliseconds)
    TIMEOUT: 10000,
    
    // Enable/disable Contentful (set to false to use local fallback data)
    ENABLED: true,
    
    // Cache duration (milliseconds) - 5 minutes
    CACHE_DURATION: 5 * 60 * 1000
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;
