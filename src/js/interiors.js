// Home Interiors Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== PRODUCT DATA =====
    const allProducts = [
        {
            id: 1,
            name: 'Soft Modern Armchair Beige Fabric',
            price: 299.00,
            originalPrice: 399.00,
            brand: 'ikea',
            rating: 4.5,
            orders: 234,
            shipping: 'free',
            description: 'Elegant and comfortable armchair with soft fabric upholstery. Features sturdy wooden legs and ergonomic design for ultimate relaxation.',
            image: '../assets/Image/interior/1.png',
            material: 'fabric',
            room: 'living',
            dimensions: '75x80x90 cm',
            features: ['comfortable', 'modern', 'durable']
        },
        {
            id: 2,
            name: 'Luxury Leather Sofa Set 3-Seater Brown',
            price: 899.00,
            originalPrice: 1199.00,
            brand: 'ashley',
            rating: 5,
            orders: 156,
            shipping: 'free',
            description: 'Premium genuine leather sofa with rich brown finish. Features high-density foam cushions and solid wood frame for long-lasting comfort.',
            image: '../assets/Image/interior/6.png',
            material: 'leather',
            room: 'living',
            dimensions: '220x95x85 cm',
            features: ['premium', 'leather', 'spacious']
        },
        {
            id: 3,
            name: 'Ceramic Kitchen Dishes Set 24 Pieces',
            price: 79.00,
            originalPrice: null,
            brand: 'wayfair',
            rating: 4,
            orders: 312,
            shipping: 12,
            description: 'Complete ceramic dinnerware set including plates, bowls, and cups. Microwave and dishwasher safe with elegant white finish.',
            image: '../assets/Image/interior/image 93.png',
            material: 'ceramic',
            room: 'kitchen',
            dimensions: 'Various sizes',
            features: ['dishwasher-safe', 'microwave-safe', 'complete-set']
        },
        {
            id: 4,
            name: 'Smart Watch Display Stand Wooden',
            price: 45.00,
            originalPrice: 65.00,
            brand: 'westElm',
            rating: 4,
            orders: 89,
            shipping: 'free',
            description: 'Handcrafted wooden display stand for smart watches and accessories. Features natural grain finish and compact design.',
            image: '../assets/Image/interior/3.png',
            material: 'wood',
            room: 'bedroom',
            dimensions: '15x10x12 cm',
            features: ['handcrafted', 'eco-friendly', 'compact']
        },
        {
            id: 5,
            name: 'Professional Kitchen Mixer 1200W',
            price: 189.00,
            originalPrice: 249.00,
            brand: 'wayfair',
            rating: 4.5,
            orders: 278,
            shipping: 'free',
            description: 'Powerful stand mixer with 1200W motor and 6-speed settings. Includes dough hook, whisk, and mixing paddle attachments.',
            image: '../assets/Image/interior/9.png',
            material: 'metal',
            room: 'kitchen',
            dimensions: '35x25x40 cm',
            features: ['powerful', 'multi-function', 'professional']
        },
        {
            id: 6,
            name: 'High Speed Blender Pro Series',
            price: 129.00,
            originalPrice: 169.00,
            brand: 'ikea',
            rating: 4,
            orders: 445,
            shipping: 'free',
            description: 'Professional-grade blender with 1000W motor and 6 stainless steel blades. Perfect for smoothies, soups, and food processing.',
            image: '../assets/Image/interior/8.png',
            material: 'glass',
            room: 'kitchen',
            dimensions: '20x20x45 cm',
            features: ['powerful', 'versatile', 'easy-clean']
        },
        {
            id: 7,
            name: 'Smart Home Appliance Bundle Kit',
            price: 349.00,
            originalPrice: 499.00,
            brand: 'ashley',
            rating: 4.5,
            orders: 123,
            shipping: 'free',
            description: 'Complete smart home starter kit with smart plugs, sensors, and hub. Compatible with Alexa and Google Home.',
            image: '../assets/Image/interior/7.png',
            material: 'plastic',
            room: 'living',
            dimensions: 'Various',
            features: ['smart', 'voice-control', 'energy-efficient']
        },
        {
            id: 8,
            name: 'Premium Espresso Coffee Maker',
            price: 199.00,
            originalPrice: 279.00,
            brand: 'potterybarn',
            rating: 5,
            orders: 567,
            shipping: 'free',
            description: 'Barista-quality espresso machine with 15-bar pressure pump. Features built-in milk frother and programmable settings.',
            image: '../assets/Image/interior/image 89.png',
            material: 'metal',
            room: 'kitchen',
            dimensions: '30x25x35 cm',
            features: ['barista-quality', 'programmable', 'milk-frother']
        }
    ];

    let filteredProducts = [...allProducts];
    let currentView = 'list';
    let currentFilters = {
        brands: [],
        rooms: [],
        materials: [],
        priceMin: 0,
        priceMax: 2000,
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
    const searchInput = document.getElementById('interiorsSearchInput');
    const searchBtn = document.getElementById('interiorsSearchBtn');

    // ===== INITIALIZE =====
    function init() {
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

        // Room Checkboxes
        document.querySelectorAll('[data-room]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const room = e.target.dataset.room;
                if (e.target.checked) {
                    currentFilters.rooms.push(room);
                } else {
                    currentFilters.rooms = currentFilters.rooms.filter(r => r !== room);
                }
                applyFilters();
            });
        });

        // Material Checkboxes
        document.querySelectorAll('[data-material]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const material = e.target.dataset.material;
                if (e.target.checked) {
                    currentFilters.materials.push(material);
                } else {
                    currentFilters.materials = currentFilters.materials.filter(m => m !== material);
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
                currentFilters.priceMax = parseInt(maxPriceInput.value) || 2000;
                applyFilters();
            });
        }

        // Clear All Filters
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

        // Buy Now Buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.buy-now-btn')) {
                const btn = e.target.closest('.buy-now-btn');
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
                btn.style.background = 'linear-gradient(135deg, #198754 0%, #146c43 100%)';
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.style.background = '';
                }, 1500);
            }
        });

        // See All Links
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

            // Room Filter
            if (currentFilters.rooms.length > 0 && !currentFilters.rooms.includes(product.room)) {
                return false;
            }

            // Material Filter
            if (currentFilters.materials.length > 0 && !currentFilters.materials.includes(product.material)) {
                return false;
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
                                     product.brand.toLowerCase().includes(searchLower) ||
                                     product.material.toLowerCase().includes(searchLower) ||
                                     product.room.toLowerCase().includes(searchLower);
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

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-couch"></i>
                    <h3>No interior items found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                    <button class="reset-search-btn" id="resetSearchBtn">Clear Filters</button>
                </div>
            `;
            
            const resetBtn = document.getElementById('resetSearchBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', clearAllFilters);
            }
            
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
            
            const materialBadgeHtml = `<span class="material-badge ${product.material}">${capitalize(product.material)}</span>`;
            const roomTagHtml = `<span class="room-tag"><i class="fa-solid fa-house"></i> ${capitalize(product.room)}</span>`;
            const dimensionsHtml = `<span class="dimension-tag"><i class="fa-solid fa-ruler-combined"></i> ${product.dimensions}</span>`;

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
                        <div class="product-meta">
                            ${materialBadgeHtml}
                            ${roomTagHtml}
                        </div>
                        <div class="product-dimensions">${dimensionsHtml}</div>
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
            tags.push(`<span class="filter-tag" data-filter="${brand}">${formatBrand(brand)} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.rooms.forEach(room => {
            tags.push(`<span class="filter-tag" data-filter="room-${room}">${capitalize(room)} Room <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.materials.forEach(material => {
            tags.push(`<span class="filter-tag" data-filter="material-${material}">${capitalize(material)} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.ratings.forEach(rating => {
            tags.push(`<span class="filter-tag" data-filter="rating-${rating}">${rating}+ stars <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

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
        if (currentFilters.brands.includes(filterValue)) {
            currentFilters.brands = currentFilters.brands.filter(b => b !== filterValue);
            const checkbox = document.querySelector(`[data-brand="${filterValue}"]`);
            if (checkbox) checkbox.checked = false;
        }

        if (filterValue.startsWith('room-')) {
            const room = filterValue.split('-')[1];
            currentFilters.rooms = currentFilters.rooms.filter(r => r !== room);
            const checkbox = document.querySelector(`[data-room="${room}"]`);
            if (checkbox) checkbox.checked = false;
        }

        if (filterValue.startsWith('material-')) {
            const material = filterValue.split('-')[1];
            currentFilters.materials = currentFilters.materials.filter(m => m !== material);
            const checkbox = document.querySelector(`[data-material="${material}"]`);
            if (checkbox) checkbox.checked = false;
        }

        if (filterValue.startsWith('rating-')) {
            const rating = parseInt(filterValue.split('-')[1]);
            currentFilters.ratings = currentFilters.ratings.filter(r => r !== rating);
            const checkbox = document.querySelector(`[data-rating="${rating}"]`);
            if (checkbox) checkbox.checked = false;
        }

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
            rooms: [],
            materials: [],
            priceMin: 0,
            priceMax: 2000,
            condition: 'any',
            ratings: [],
            verifiedOnly: false,
            searchQuery: ''
        };

        document.querySelectorAll('[data-brand], [data-room], [data-material], [data-rating]').forEach(cb => {
            cb.checked = false;
        });

        if (minPriceInput) minPriceInput.value = 0;
        if (maxPriceInput) maxPriceInput.value = 2000;

        const anyCondition = document.querySelector('input[name="condition"][value="any"]');
        if (anyCondition) anyCondition.checked = true;

        if (verifiedOnlyCheckbox) verifiedOnlyCheckbox.checked = false;
        if (searchInput) searchInput.value = '';

        applyFilters();
    }

    // ===== HELPER: Capitalize =====
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ===== HELPER: Format Brand =====
    function formatBrand(brand) {
        const brandNames = {
            'ikea': 'IKEA',
            'ashley': 'Ashley Furniture',
            'wayfair': 'Wayfair',
            'westElm': 'West Elm',
            'potterybarn': 'Pottery Barn'
        };
        return brandNames[brand] || capitalize(brand);
    }

    // ===== DROPDOWN FUNCTIONALITY =====
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
