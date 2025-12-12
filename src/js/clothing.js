// Clothing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== PRODUCT DATA =====
    const allProducts = [
        {
            id: 1,
            name: 'Premium Cotton T-Shirt Multi Colors',
            price: 29.99,
            originalPrice: 49.99,
            brand: 'nike',
            rating: 4.5,
            orders: 245,
            shipping: 'free',
            description: 'Comfortable premium cotton t-shirt available in multiple colors. Perfect for casual wear with soft breathable fabric.',
            image: '../assets/layout/alibaba/image/cloth/Bitmap.png',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#1c1c1c', '#ffffff', '#0d6efd', '#dc3545'],
            features: ['cotton', 'casual'],
            reviews: [
                { name: 'James L.', rating: 5, text: 'Great fit and very comfortable.' },
                { name: 'Sarah M.', rating: 4, text: 'Nice fabric, shrunk a little after wash.' },
                { name: 'Mike T.', rating: 5, text: 'Perfect basic t-shirt.' }
            ]
        },
        {
            id: 2,
            name: 'Classic Blue Denim Jeans Shorts',
            price: 45.00,
            originalPrice: 65.00,
            brand: 'levis',
            rating: 5,
            orders: 189,
            shipping: 'free',
            description: 'Classic fit blue denim shorts crafted from premium denim. Features 5-pocket styling and comfortable fit.',
            image: '../assets/layout/alibaba/image/cloth/Bitmap (2).png',
            sizes: ['28', '30', '32', '34', '36'],
            colors: ['#0d6efd', '#1c1c1c'],
            features: ['denim', 'casual'],
            reviews: [
                { name: 'Alex K.', rating: 5, text: 'Best shorts I own, very durable.' },
                { name: 'Chris P.', rating: 5, text: 'Classic look, fits perfectly.' },
                { name: 'Jordan B.', rating: 5, text: 'Love the color and material.' }
            ]
        },
        {
            id: 3,
            name: 'Brown Winter Coat Medium Size',
            price: 120.00,
            originalPrice: 180.00,
            brand: 'zara',
            rating: 4.5,
            orders: 78,
            shipping: 'free',
            description: 'Elegant brown winter coat with premium wool blend. Features classic design with warm inner lining.',
            image: '../assets/layout/alibaba/image/cloth/2 1.png',
            sizes: ['S', 'M', 'L'],
            colors: ['#8b4513', '#1c1c1c', '#6c757d'],
            features: ['wool', 'formal', 'winter'],
            reviews: [
                { name: 'Elena R.', rating: 5, text: 'So warm and stylish!' },
                { name: 'Tom H.', rating: 4, text: 'Good quality but sleeves are a bit long.' },
                { name: 'Maria S.', rating: 5, text: 'Worth every penny.' }
            ]
        },
        {
            id: 4,
            name: 'Canvas Travel Bag Large Capacity',
            price: 89.95,
            originalPrice: null,
            brand: 'hm',
            rating: 4,
            orders: 156,
            shipping: 12,
            description: 'Durable canvas travel bag with large capacity. Multiple pockets for organized storage and comfortable straps.',
            image: '../assets/layout/alibaba/image/cloth/image 26.png',
            sizes: ['One Size'],
            colors: ['#8b4513', '#1c1c1c', '#6c757d'],
            features: ['canvas', 'travel']
        },
        {
            id: 5,
            name: 'Genuine Leather Wallet for Men',
            price: 35.00,
            originalPrice: 55.00,
            brand: 'gucci',
            rating: 4.5,
            orders: 312,
            shipping: 'free',
            description: 'Premium genuine leather wallet with multiple card slots. Slim design with RFID protection for security.',
            image: '../assets/layout/alibaba/image/cloth/image 24.png',
            sizes: ['One Size'],
            colors: ['#1c1c1c', '#8b4513'],
            features: ['leather', 'accessory']
        },
        {
            id: 6,
            name: 'Sports Running Sneakers Lightweight',
            price: 79.99,
            originalPrice: 99.99,
            brand: 'nike',
            rating: 4.5,
            orders: 423,
            shipping: 'free',
            description: 'Lightweight running sneakers with breathable mesh upper. Advanced cushioning for maximum comfort during workouts.',
            image: '../assets/layout/alibaba/image/cloth/Bitmap.png',
            sizes: ['7', '8', '9', '10', '11', '12'],
            colors: ['#1c1c1c', '#ffffff', '#dc3545'],
            features: ['mesh', 'sports']
        },
        {
            id: 7,
            name: 'Slim Fit Formal Dress Shirt',
            price: 54.99,
            originalPrice: 74.99,
            brand: 'zara',
            rating: 4,
            orders: 167,
            shipping: 'free',
            description: 'Classic slim fit dress shirt in crisp cotton. Perfect for business meetings and formal occasions.',
            image: '../assets/layout/alibaba/image/cloth/Bitmap.png',
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['#ffffff', '#0d6efd', '#1c1c1c'],
            features: ['cotton', 'formal']
        },
        {
            id: 8,
            name: 'Adidas Originals Track Jacket',
            price: 89.00,
            originalPrice: 120.00,
            brand: 'adidas',
            rating: 5,
            orders: 289,
            shipping: 'free',
            description: 'Iconic Adidas track jacket with classic 3-stripes design. Made from recycled materials for sustainability.',
            image: '../assets/layout/alibaba/image/cloth/2 1.png',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: ['#1c1c1c', '#0d6efd', '#198754'],
            features: ['polyester', 'sports']
        }
    ];

    // Expose products globally for the product detail page
    window.allProducts = allProducts;

    let filteredProducts = [...allProducts];
    let currentView = 'list';
    let currentFilters = {
        brands: [],
        sizes: [],
        colors: [],
        priceMin: 0,
        priceMax: 500,
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
    const searchInput = document.getElementById('clothingSearchInput');
    const searchBtn = document.getElementById('clothingSearchBtn');

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

        // Size Checkboxes
        document.querySelectorAll('[data-size]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const size = e.target.dataset.size;
                if (e.target.checked) {
                    currentFilters.sizes.push(size);
                } else {
                    currentFilters.sizes = currentFilters.sizes.filter(s => s !== size);
                }
                applyFilters();
            });
        });

        // Color Checkboxes
        document.querySelectorAll('[data-color]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const color = e.target.dataset.color;
                if (e.target.checked) {
                    currentFilters.colors.push(color);
                } else {
                    currentFilters.colors = currentFilters.colors.filter(c => c !== color);
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
                currentFilters.priceMax = parseInt(maxPriceInput.value) || 500;
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

        // Add to Cart Buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const btn = e.target.closest('.add-to-cart-btn');
                try {
                    const productData = JSON.parse(btn.dataset.product.replace(/&#39;/g, "'"));
                    if (window.addToCart) {
                        window.addToCart(productData);
                        const originalHtml = btn.innerHTML;
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
                        btn.classList.add('added');
                        setTimeout(() => {
                            btn.innerHTML = originalHtml;
                            btn.classList.remove('added');
                        }, 1500);
                        showToast('Added to cart!', 'success');
                    }
                } catch (err) {
                    console.error('Error adding to cart:', err);
                }
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

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-shirt"></i>
                    <h3>No clothing items found</h3>
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
            
            const sizesHtml = product.sizes.slice(0, 4).map(size => 
                `<span class="size-tag">${size}</span>`
            ).join('');

            const colorsHtml = product.colors.slice(0, 4).map(color => 
                `<span class="product-color-dot" style="background: ${color};"></span>`
            ).join('');

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
                        <div class="product-sizes">${sizesHtml}</div>
                        <div class="product-colors">${colorsHtml}</div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-actions">
                            <button class="add-to-cart-btn" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>
                                <i class="fa-solid fa-cart-plus"></i>
                                Add to Cart
                            </button>
                            <a href="product-detail.html?data=${encodeURIComponent(JSON.stringify(product))}" class="view-details-btn">
                                <i class="fa-solid fa-eye"></i>
                                View Details
                            </a>
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
            tags.push(`<span class="filter-tag" data-filter="${brand}">${capitalize(brand)} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.sizes.forEach(size => {
            tags.push(`<span class="filter-tag" data-filter="size-${size}">Size: ${size.toUpperCase()} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
        });

        currentFilters.colors.forEach(color => {
            tags.push(`<span class="filter-tag" data-filter="color-${color}">${capitalize(color)} <i class="fa-solid fa-xmark remove-filter"></i></span>`);
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

        if (filterValue.startsWith('size-')) {
            const size = filterValue.split('-')[1];
            currentFilters.sizes = currentFilters.sizes.filter(s => s !== size);
            const checkbox = document.querySelector(`[data-size="${size}"]`);
            if (checkbox) checkbox.checked = false;
        }

        if (filterValue.startsWith('color-')) {
            const color = filterValue.split('-')[1];
            currentFilters.colors = currentFilters.colors.filter(c => c !== color);
            const checkbox = document.querySelector(`[data-color="${color}"]`);
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
            sizes: [],
            colors: [],
            priceMin: 0,
            priceMax: 500,
            condition: 'any',
            ratings: [],
            verifiedOnly: false,
            searchQuery: ''
        };

        document.querySelectorAll('[data-brand], [data-size], [data-color], [data-rating]').forEach(cb => {
            cb.checked = false;
        });

        if (minPriceInput) minPriceInput.value = 0;
        if (maxPriceInput) maxPriceInput.value = 500;

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

    // ===== SHOW TOAST NOTIFICATION =====
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 14px 24px;
            background: ${type === 'success' ? '#00b517' : type === 'error' ? '#fa3434' : '#0d6efd'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Initialize the page
    init();
});
