// Tech Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== PRODUCT DATA =====
    const allProducts = [
        {
            id: 1,
            name: 'Samsung Galaxy Book Pro 15" Laptop',
            price: 998,
            originalPrice: 1128,
            brand: 'samsung',
            rating: 4.5,
            orders: 154,
            shipping: 'free',
            description: 'Ultra-thin laptop with AMOLED display, Intel Core i7 processor, 16GB RAM, and 512GB SSD. Perfect for work and entertainment.',
            image: '../assets/Image/tech/image 34.png',
            features: ['metallic', '8gb', 'largememory']
        },
        {
            id: 2,
            name: 'iPhone 15 Pro Max 256GB',
            price: 1099,
            originalPrice: 1299,
            brand: 'apple',
            rating: 5,
            orders: 324,
            shipping: 'free',
            description: 'Premium smartphone with titanium design, A17 Pro chip, 48MP camera system, and all-day battery life.',
            image: '../assets/Image/tech/image 32.png',
            features: ['metallic', 'superpower', 'largememory']
        },
        {
            id: 3,
            name: 'Samsung Galaxy Watch 6 Classic',
            price: 299,
            originalPrice: 399,
            brand: 'samsung',
            rating: 4,
            orders: 89,
            shipping: 12,
            description: 'Premium smartwatch with rotating bezel, health monitoring, GPS tracking, and 40+ hour battery life.',
            image: '../assets/Image/tech/8.png',
            features: ['metallic', 'largememory']
        },
        {
            id: 4,
            name: 'Razer BlackShark V2 Gaming Headset',
            price: 79,
            originalPrice: null,
            brand: 'huawei',
            rating: 4,
            orders: 56,
            shipping: 'free',
            description: 'Professional esports gaming headset with THX Spatial Audio, 50mm drivers, and detachable microphone.',
            image: '../assets/Image/tech/image 29.png',
            features: ['plastic', 'superpower']
        },
        {
            id: 5,
            name: 'GoPro HERO12 Black Action Camera',
            price: 599,
            originalPrice: 799,
            brand: 'pocco',
            rating: 3.5,
            orders: 42,
            shipping: 25,
            description: 'Waterproof action camera with 5.3K video, HyperSmooth 6.0 stabilization, and 27MP photos.',
            image: '../assets/Image/tech/6.png',
            features: ['metallic', 'superpower']
        },
        {
            id: 6,
            name: 'Lenovo Tab P12 Pro Tablet',
            price: 449,
            originalPrice: 549,
            brand: 'lenovo',
            rating: 4.5,
            orders: 178,
            shipping: 'free',
            description: '12.6" AMOLED display tablet with Snapdragon 870, 8GB RAM, stylus support, and quad JBL speakers.',
            image: '../assets/Image/tech/image 85.png',
            features: ['metallic', '8gb', 'largememory']
        },
        {
            id: 7,
            name: 'Apple AirPods Pro 2nd Generation',
            price: 149,
            originalPrice: 199,
            brand: 'apple',
            rating: 4.5,
            orders: 512,
            shipping: 'free',
            description: 'Wireless earbuds with Active Noise Cancellation, Adaptive Audio, and MagSafe charging case.',
            image: '../assets/Image/tech/image 86.png',
            features: ['plastic', 'superpower']
        },
        {
            id: 8,
            name: 'Huawei Sound Joy Portable Speaker',
            price: 89,
            originalPrice: null,
            brand: 'huawei',
            rating: 3.5,
            orders: 234,
            shipping: 'free',
            description: 'Portable Bluetooth speaker with Devialet sound, 26-hour battery, and IP67 waterproof rating.',
            image: '../assets/Image/tech/image 33.png',
            features: ['plastic', 'superpower']
        }
    ];

    let filteredProducts = [...allProducts];
    let currentView = 'list';
    let currentFilters = {
        brands: [],
        features: [],
        priceMin: 0,
        priceMax: 999999,
        condition: 'any',
        ratings: [],
        verifiedOnly: false,
        searchQuery: ''
    };

    // ===== DOM ELEMENTS =====
    const productsContainer = document.getElementById('productsContainer');
    const itemCountEl = document.getElementById('itemCount');
    const activeFiltersEl = document.getElementById('activeFilters');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const sortSelect = document.getElementById('sortSelect');
    const verifiedOnlyCheckbox = document.getElementById('verifiedOnly');
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    const applyPriceBtn = document.getElementById('applyPriceBtn');
    const clearAllFiltersBtn = document.getElementById('clearAllFilters');
    const searchInput = document.getElementById('techSearchInput');
    const searchBtn = document.getElementById('techSearchBtn');

    // ===== INITIALIZE =====
    function init() {
        // Check for URL search parameters
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            currentFilters.searchQuery = searchQuery.toLowerCase();
            if (searchInput) {
                searchInput.value = searchQuery;
            }
        }
        
        applyFilters();
        setupEventListeners();
        updateActiveFilters();
    }

    // ===== EVENT LISTENERS =====
    function setupEventListeners() {
        // View Toggle
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => switchView('grid'));
        }
        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => switchView('list'));
        }

        // Sort Select
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                sortProducts();
                renderProducts();
            });
        }

        // Verified Only
        if (verifiedOnlyCheckbox) {
            verifiedOnlyCheckbox.addEventListener('change', (e) => {
                currentFilters.verifiedOnly = e.target.checked;
                applyFilters();
            });
        }

        // Brand Checkboxes
        document.querySelectorAll('[data-brand]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const brand = e.target.dataset.brand;
                if (e.target.checked) {
                    currentFilters.brands.push(brand);
                } else {
                    currentFilters.brands = currentFilters.brands.filter(b => b !== brand);
                }
                applyFilters();
            });
        });

        // Feature Checkboxes
        document.querySelectorAll('[data-feature]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const feature = e.target.dataset.feature;
                if (e.target.checked) {
                    currentFilters.features.push(feature);
                } else {
                    currentFilters.features = currentFilters.features.filter(f => f !== feature);
                }
                applyFilters();
            });
        });

        // Rating Checkboxes
        document.querySelectorAll('[data-rating]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                if (e.target.checked) {
                    currentFilters.ratings.push(rating);
                } else {
                    currentFilters.ratings = currentFilters.ratings.filter(r => r !== rating);
                }
                applyFilters();
            });
        });

        // Condition Radios
        document.querySelectorAll('input[name="condition"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentFilters.condition = e.target.value;
                applyFilters();
            });
        });

        // Price Range
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', () => {
                currentFilters.priceMin = parseInt(minPriceInput.value) || 0;
                currentFilters.priceMax = parseInt(maxPriceInput.value) || 999999;
                applyFilters();
            });
        }

        // Clear All Filters - Use event delegation since button is dynamically added
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('clear-all-filters') || e.target.closest('.clear-all-filters')) {
                e.preventDefault();
                clearAllFilters();
            }
        });

        // Remove Filter Tags
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-filter')) {
                const tag = e.target.closest('.filter-tag');
                if (tag) {
                    removeFilter(tag.dataset.filter);
                }
            }
        });

        // Search
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                currentFilters.searchQuery = searchInput.value.toLowerCase();
                applyFilters();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    currentFilters.searchQuery = searchInput.value.toLowerCase();
                    applyFilters();
                }
            });
        }

        // Wishlist Buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) {
                const btn = e.target.closest('.wishlist-btn');
                btn.classList.toggle('active');
                const icon = btn.querySelector('i');
                if (btn.classList.contains('active')) {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                } else {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                }
            }
        });

        // See All / Show More Links
        document.querySelectorAll('.see-all-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.closest('.sidebar-section');
                const list = section.querySelector('.filter-list, .category-list');
                if (list) {
                    list.classList.toggle('expanded');
                    link.textContent = list.classList.contains('expanded') ? 'Show less' : 'See all';
                }
            });
        });
    }

    // ===== VIEW SWITCHING =====
    function switchView(view) {
        currentView = view;
        if (view === 'grid') {
            productsContainer.classList.add('grid-view');
            productsContainer.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        } else {
            productsContainer.classList.remove('grid-view');
            productsContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        }
    }

    // ===== FILTERING =====
    function applyFilters() {
        filteredProducts = allProducts.filter(product => {
            // Brand Filter
            if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(product.brand)) {
                return false;
            }

            // Feature Filter
            if (currentFilters.features.length > 0) {
                const hasFeature = currentFilters.features.some(f => product.features.includes(f));
                if (!hasFeature) return false;
            }

            // Price Range Filter
            if (product.price < currentFilters.priceMin || product.price > currentFilters.priceMax) {
                return false;
            }

            // Rating Filter
            if (currentFilters.ratings.length > 0) {
                const productRatingFloor = Math.floor(product.rating);
                if (!currentFilters.ratings.includes(productRatingFloor)) {
                    return false;
                }
            }

            // Search Filter
            if (currentFilters.searchQuery) {
                const searchLower = currentFilters.searchQuery;
                const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
                                     product.description.toLowerCase().includes(searchLower) ||
                                     product.brand.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            return true;
        });

        sortProducts();
        renderProducts();
        updateActiveFilters();
    }

    // ===== SORTING =====
    function sortProducts() {
        const sortValue = sortSelect ? sortSelect.value : 'featured';
        
        switch (sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'featured':
            default:
                filteredProducts.sort((a, b) => b.orders - a.orders);
                break;
        }
    }

    // ===== RENDER PRODUCTS =====
    function renderProducts() {
        if (!productsContainer) return;

        // Show "no results" message if no products found
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-face-sad-tear"></i>
                    <h3>Sorry, Couldn't find anything like that</h3>
                    <p>Try adjusting your search or filter to find what you're looking for.</p>
                    <button class="reset-search-btn" id="resetSearchBtn">Clear Filters</button>
                </div>
            `;
            
            // Add event listener for reset button
            const resetBtn = document.getElementById('resetSearchBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', clearAllFilters);
            }
            
            // Update count
            if (itemCountEl) {
                itemCountEl.textContent = '0';
            }
            return;
        }

        productsContainer.innerHTML = filteredProducts.map(product => {
            const starsHtml = generateStars(product.rating);
            const shippingBadge = product.shipping === 'free' 
                ? '<span class="shipping-badge free">Free Shipping</span>'
                : `<span class="shipping-badge">Shipping $${product.shipping}</span>`;
            const originalPriceHtml = product.originalPrice 
                ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` 
                : '';

            return `
                <div class="tech-product-card" data-price="${product.price}" data-brand="${product.brand}" data-rating="${product.rating}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="price-section">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${originalPriceHtml}
                        </div>
                        <div class="rating-section">
                            <div class="stars">${starsHtml}</div>
                            <span class="rating-value">${(product.rating * 2).toFixed(1)}</span>
                            <span class="order-count">${product.orders} orders</span>
                            ${shippingBadge}
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-actions">
                            <button class="buy-now-btn">
                                <i class="fa-solid fa-cart-shopping"></i>
                                Buy Now
                            </button>
                            <a href="#" class="view-details-link">View details</a>
                        </div>
                    </div>
                    <button class="wishlist-btn">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
            `;
        }).join('');

        // Update count
        if (itemCountEl) {
            itemCountEl.textContent = filteredProducts.length.toLocaleString();
        }
    }

    // ===== GENERATE STARS HTML =====
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars += '<i class="fa-solid fa-star"></i>';
            } else if (rating >= i - 0.5) {
                stars += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                stars += '<i class="fa-regular fa-star"></i>';
            }
        }
        return stars;
    }

    // ===== UPDATE ACTIVE FILTERS =====
    function updateActiveFilters() {
        if (!activeFiltersEl) return;

        const tags = [];
        
        currentFilters.brands.forEach(brand => {
            tags.push(`<span class="filter-tag" data-filter="${brand}">${capitalize(brand)} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.features.forEach(feature => {
            tags.push(`<span class="filter-tag" data-filter="${feature}">${capitalize(feature)} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.ratings.forEach(rating => {
            tags.push(`<span class="filter-tag" data-filter="rating-${rating}">${rating}+ stars <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        // Add search query as a tag if present
        if (currentFilters.searchQuery) {
            tags.push(`<span class="filter-tag" data-filter="search-${currentFilters.searchQuery}">"${currentFilters.searchQuery}" <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        }

        if (tags.length > 0) {
            activeFiltersEl.innerHTML = tags.join('') + '<button type="button" class="clear-all-filters">Clear all filter</button>';
            activeFiltersEl.style.display = 'flex';
        } else {
            activeFiltersEl.style.display = 'none';
        }
    }

    // ===== REMOVE FILTER =====
    function removeFilter(filterValue) {
        // Check brands
        if (currentFilters.brands.includes(filterValue)) {
            currentFilters.brands = currentFilters.brands.filter(b => b !== filterValue);
            const checkbox = document.querySelector(`[data-brand="${filterValue}"]`);
            if (checkbox) checkbox.checked = false;
        }

        // Check features
        if (currentFilters.features.includes(filterValue)) {
            currentFilters.features = currentFilters.features.filter(f => f !== filterValue);
            const checkbox = document.querySelector(`[data-feature="${filterValue}"]`);
            if (checkbox) checkbox.checked = false;
        }

        // Check ratings
        if (filterValue.startsWith('rating-')) {
            const rating = parseInt(filterValue.split('-')[1]);
            currentFilters.ratings = currentFilters.ratings.filter(r => r !== rating);
            const checkbox = document.querySelector(`[data-rating="${rating}"]`);
            if (checkbox) checkbox.checked = false;
        }

        // Check search query
        if (filterValue.startsWith('search-')) {
            currentFilters.searchQuery = '';
            if (searchInput) searchInput.value = '';
        }

        applyFilters();
    }

    // ===== CLEAR ALL FILTERS =====
    function clearAllFilters() {
        currentFilters = {
            brands: [],
            features: [],
            priceMin: 0,
            priceMax: 999999,
            condition: 'any',
            ratings: [],
            verifiedOnly: false,
            searchQuery: ''
        };

        // Uncheck all checkboxes
        document.querySelectorAll('[data-brand], [data-feature], [data-rating]').forEach(cb => {
            cb.checked = false;
        });

        // Reset price inputs
        if (minPriceInput) minPriceInput.value = 0;
        if (maxPriceInput) maxPriceInput.value = 999999;

        // Reset condition
        const anyCondition = document.querySelector('input[name="condition"][value="any"]');
        if (anyCondition) anyCondition.checked = true;

        // Reset verified
        if (verifiedOnlyCheckbox) verifiedOnlyCheckbox.checked = false;

        // Reset search
        if (searchInput) searchInput.value = '';

        applyFilters();
    }

    // ===== HELPER: Capitalize =====
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ===== DROPDOWN FUNCTIONALITY (Inherited from main script) =====
    const dropdowns = document.querySelectorAll('.secondary-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');

        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();

                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });

                dropdown.classList.toggle('active');
            });
        }
    });

    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            const isClickInside = dropdown.contains(e.target);
            if (!isClickInside && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Initialize the page
    init();
});
