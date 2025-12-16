# Sup's Candle - Premium Scented Candles Website

## 🕯️ Overview
Complete e-commerce website for premium handmade scented candles with Contentful CMS integration. Features category-based browsing, fragrance selection, and Instagram ordering.

## 📋 Quick Start

### Prerequisites
- Contentful account (Space ID: `jdu7xbn8rfp0`)
- Modern web browser
- Instagram account (@supscandle)

### Setup
1. **Open the website**: Simply open `index.html` in your browser
2. **Products load from Contentful**: Automatic API integration
3. **No build process needed**: Pure HTML/CSS/JS

## 🎨 Features

### Product System
- **Categories**: Single, Special, Box Pack
- **Fragrances**: Geeli Mitti, Vanilla, Orange, Mango
- **Dynamic Pricing**: Each fragrance has individual price (₹250-₹300)
- **Natural Soy Wax**: 40+ hours burn time

### Pages
- **Homepage**: Hero gallery, featured products, Instagram feed
- **Shop**: Live search, category filtering, product grid
- **Product Detail**: Fragrance selector, dynamic pricing, care instructions
- **About & Contact**: Brand information

### Technical Features
- ✅ Contentful CMS integration
- ✅ Live search with 300ms debounce
- ✅ Mobile-first responsive design
- ✅ SEO optimized (meta tags, structured data, sitemap)
- ✅ Instagram direct ordering
- ✅ PWA manifest for installability

## 📁 Project Structure

```
sc/
├── index.html              # Homepage
├── shop.html               # Product listing
├── product.html            # Product detail page
├── about.html              # About page
├── contact.html            # Contact page
├── css/
│   ├── main.css           # Core styles
│   ├── components.css     # UI components
│   ├── animations.css     # Animations
│   ├── mobile.css         # Mobile optimizations
│   └── features-creative.css
├── js/
│   ├── config.js          # Contentful & Instagram config
│   ├── api-service.js     # Contentful API integration
│   ├── products.js        # Product data management
│   ├── main.js            # Global functionality
│   ├── shop.js            # Shop page logic
│   └── product.js         # Product detail logic
├── images/
│   ├── hero-main.jpg      # Hero image 1
│   ├── hero-2.jpg         # Hero image 2
│   └── hero-3.jpg         # Hero image 3
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine rules
└── manifest.json          # PWA configuration
```

## 🔧 Contentful Configuration

### Content Type: `candle`

**Required Fields:**
- `id` (Short text) - Unique product ID
- `name` (Short text) - Product name
- `category` (Dropdown) - Single, Special, or Box Pack
- `availableFragrances` (Array) - List of fragrances
- `pricing` (JSON Object) - Format: `{"Geeli Mitti": 250, "Vanilla": 300}`
- `image` (Array of Media) - Product images
- `description` (Long text) - Product description
- `waxType` (Short text) - e.g., "Natural Soy Blend"
- `burnTime` (Short text) - e.g., "40+ hours"
- `careInstructions` (Array) - Array of care instructions
- `featured` (Boolean) - Show on homepage
- `instock` (Boolean) - Availability status

**Optional Fields:**
- `badge` (Short text) - Display badge (New, Sale, etc.)
- `price` (Number) - Base/starting price
- `size` (Short text) - Default size

### Example Product Setup

```json
{
  "id": "designer-candle-1",
  "name": "Designer Ceramic Candle",
  "category": "Special",
  "availableFragrances": ["Geeli Mitti", "Vanilla", "Orange", "Mango"],
  "pricing": {
    "Geeli Mitti": 250,
    "Vanilla": 300,
    "Orange": 280,
    "Mango": 290
  },
  "description": "Premium handcrafted ceramic candle...",
  "waxType": "Natural Soy Blend",
  "burnTime": "40+ hours",
  "featured": true,
  "instock": true,
  "careInstructions": [
    "Trim wick to 1/4\" before each use",
    "Burn for 2-4 hours at a time",
    "Keep away from drafts"
  ]
}
```

## 🎯 Key Configuration

### Contentful API (`js/config.js`)
```javascript
CONTENTFUL: {
    SPACE_ID: 'jdu7xbn8rfp0',
    ACCESS_TOKEN: '_q24PVyehbUADTp1ei6bI_DfBP5GjJoytjlMAwEbRFw',
    ENVIRONMENT: 'master',
    CONTENT_TYPE: 'candle'
}
```

### Instagram (`js/config.js`)
```javascript
INSTAGRAM: {
    USERNAME: 'supscandle'
}
```

## 📱 Instagram Ordering

When customers click "Buy Now via Instagram":
1. Message is auto-generated with:
   - Product name
   - Selected fragrance
   - Exact price for that fragrance
   - Product details (wax type, burn time)
2. Message copied to clipboard
3. Instagram DM opens automatically
4. Customer pastes and sends message

## 🎨 Customization

### Update Brand Colors
Edit `css/main.css`:
```css
:root {
    --color-primary: #6E1F2A;  /* Burgundy */
    --color-accent: #D4AF37;   /* Gold */
}
```

### Add New Fragrance
1. Add to Contentful product's `availableFragrances` array
2. Add price to `pricing` object
3. Publish product

### Change Category
Update `category` field in Contentful to: Single, Special, or Box Pack

## 📊 SEO & Performance

### SEO Features
- ✅ Keyword-rich meta tags targeting Indian market
- ✅ Open Graph tags for social sharing
- ✅ Structured data (LocalBusiness schema)
- ✅ Canonical URLs
- ✅ XML sitemap
- ✅ Robots.txt
- ✅ Mobile-optimized viewport

### Performance
- ✅ Lazy loading images
- ✅ CSS minification ready
- ✅ Content caching (5 min)
- ✅ Optimized mobile animations
- ✅ Touch-friendly tap targets (44x44px)

## 🔍 SEO Keywords
**Primary:** scented candles India, handmade candles online, luxury candles, natural soy candles
**Secondary:** aromatherapy candles, home fragrance India, designer candles, gift candles, eco-friendly candles
**Local:** premium candles Mumbai Delhi Bangalore

## 📈 Analytics & Tracking
Add your tracking codes to all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>

<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s)...
</script>
```

## 🚀 Deployment

### Option 1: Static Hosting (Recommended)
- **Netlify**: Drag & drop folder → Auto deploy
- **Vercel**: Import from GitHub
- **GitHub Pages**: Push to repo, enable Pages

### Option 2: Traditional Hosting
1. Upload all files via FTP
2. Point domain to root directory
3. Ensure `.htaccess` allows `.json` files

### Domain Setup
Update all URLs from `https://www.supscandles.com/` to your actual domain in:
- `index.html` (meta tags)
- `shop.html` (meta tags)
- `product.html` (meta tags)
- `sitemap.xml` (all URLs)

## 🐛 Troubleshooting

### Products not loading?
1. Check browser console (F12)
2. Verify Contentful credentials in `js/config.js`
3. Ensure products are **published** (not just saved)
4. Check `availableFragrances` array exists
5. Verify `pricing` JSON format is correct

### Images not showing?
1. Check image URLs in Contentful
2. Ensure images uploaded as Assets
3. Verify `image` field is Array type
4. Check browser network tab for 404s

### Instagram button not working?
1. Verify fragrance is selected
2. Check Instagram username in `js/config.js`
3. Allow popups in browser
4. On mobile, Instagram app must be installed

## 📞 Support & Contact

**Instagram:** [@supscandle](https://instagram.com/supscandle)
**Website:** https://www.supscandles.com

## 📝 License
Proprietary - © 2024 Sup's Candle. All rights reserved.

---

**Last Updated:** December 16, 2025
**Version:** 2.0 - Full Contentful Integration with Mobile Optimization
