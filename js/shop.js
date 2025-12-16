// ===================================
// SHOP PAGE - Filtering & Sorting
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Wait for API service to be ready before initializing shop
    const checkAndInit = setInterval(() => {
        if (window.apiService && window.productsDB) {
            clearInterval(checkAndInit);
            initShopPage();
        }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => clearInterval(checkAndInit), 5000);
});

async function initShopPage() {
    const shopProductsContainer = document.getElementById('shopProducts');
    const productCountElement = document.getElementById('productCount');
    const noResultsElement = document.getElementById('noResults');
    const resetButton = document.getElementById('resetFilters');
    const filterToggle = document.getElementById('filterToggle');
    const filterClose = document.getElementById('filterClose');
    const filtersAside = document.querySelector('.shop-filters');
    
    console.log('🔄 Loading shop products from Contentful...');
    
    let currentProducts = await window.productsDB.getAllProducts();
    
    console.log(`✅ Loaded ${currentProducts.length} shop products:`, currentProducts);
    
    // Initialize filter accordions
    initFilterAccordions();
    
    // Initialize sort pills
    initSortPills();
    
    // Initial render
    renderProducts(currentProducts);
    
    // Initial render with all products
    renderProducts(currentProducts);
    
    // Filter functionality
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
        });
    });
    
    // Live search functionality
    const searchInput = document.getElementById('shopSearch');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            // Show/hide clear button
            if (clearSearch) {
                clearSearch.style.display = this.value ? 'flex' : 'none';
            }
            
            // Debounce search by 300ms
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
        
        // Clear search button
        if (clearSearch) {
            clearSearch.addEventListener('click', function() {
                searchInput.value = '';
                clearSearch.style.display = 'none';
                applyFilters();
            });
        }
    }
    
    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', async function() {
            // Uncheck all checkboxes
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Clear search
            const searchInput = document.getElementById('shopSearch');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Reset sort pills
            document.querySelectorAll('.sort-pill').forEach(pill => {
                pill.classList.remove('active');
            });
            document.querySelector('.sort-pill[data-sort="featured"]').classList.add('active');
            
            // Show all products
            currentProducts = await window.productsDB.getAllProducts();
            renderProducts(currentProducts);
        });
    }
    
    // Mobile filter toggle
    if (filterToggle && filtersAside) {
        filterToggle.addEventListener('click', function() {
            filtersAside.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Filter close button
    if (filterClose && filtersAside) {
        filterClose.addEventListener('click', function() {
            filtersAside.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Check URL parameters for filters
    const urlFilter = window.appUtils.getUrlParameter('filter');
    if (urlFilter === 'featured') {
        currentProducts = await window.productsDB.getFeaturedProducts();
        renderProducts(currentProducts);
    } else if (urlFilter === 'new') {
        // Show newest (first few items)
        const allProducts = await window.productsDB.getAllProducts();
        currentProducts = allProducts.slice(0, 6);
        renderProducts(currentProducts);
    }
    
    function initFilterAccordions() {
        const accordions = document.querySelectorAll('.filter-accordion');
        accordions.forEach(accordion => {
            accordion.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (this.classList.contains('active')) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    }
    
    function initSortPills() {
        const sortPills = document.querySelectorAll('.sort-pill');
        sortPills.forEach(pill => {
            pill.addEventListener('click', function() {
                // Remove active from all pills
                sortPills.forEach(p => p.classList.remove('active'));
                // Add active to clicked pill
                this.classList.add('active');
                
                // Sort products
                const sortBy = this.dataset.sort;
                currentProducts = window.productsDB.sortProducts(currentProducts, sortBy);
                renderProducts(currentProducts);
            });
        });
    }
    
    async function applyFilters() {
        const filters = {
            category: [],
            search: ''
        };
        
        // Collect selected filters
        document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
            filters.category.push(checkbox.value);
        });
        
        // Get search query
        const searchInput = document.getElementById('shopSearch');
        if (searchInput) {
            filters.search = searchInput.value.toLowerCase().trim();
        }
        
        // Get all products first
        let allProducts = await window.productsDB.getAllProducts();
        
        // Filter products locally
        currentProducts = allProducts.filter(product => {
            // Filter by search
            if (filters.search) {
                const searchTerm = filters.search;
                const matchesSearch = 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.waxType.toLowerCase().includes(searchTerm);
                
                if (!matchesSearch) return false;
            }
            
            // Filter by category
            if (filters.category.length > 0) {
                const hasCategory = filters.category.some(category => 
                    product.category === category
                );
                if (!hasCategory) return false;
            }
            
            return true;
        });
        
        // Apply current sort
        const activeSortPill = document.querySelector('.sort-pill.active');
        if (activeSortPill) {
            const sortBy = activeSortPill.dataset.sort;
            currentProducts = window.productsDB.sortProducts(currentProducts, sortBy);
        }
        
        renderProducts(currentProducts);
    }
    
    function renderProducts(products) {
        // Clear container
        shopProductsContainer.innerHTML = '';
        
        // Update count
        if (productCountElement) {
            const count = products.length;
            productCountElement.textContent = `${count} ${count === 1 ? 'candle' : 'candles'} found`;
        }
        
        // Show/hide no results message
        if (products.length === 0) {
            if (noResultsElement) {
                noResultsElement.style.display = 'block';
            }
            shopProductsContainer.style.display = 'none';
        } else {
            if (noResultsElement) {
                noResultsElement.style.display = 'none';
            }
            shopProductsContainer.style.display = 'grid';
            
            // Render product cards
            products.forEach((product, index) => {
                const card = window.appUtils.createProductCard(product);
                card.style.animationDelay = `${index * 0.05}s`;
                shopProductsContainer.appendChild(card);
            });
        }
    }
}
