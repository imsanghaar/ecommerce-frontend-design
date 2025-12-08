// Products Page JavaScript
// Handles product grid, pagination, sorting, and view switching

document.addEventListener('DOMContentLoaded', function() {
    // ===== PRODUCT DATA =====
    const allProducts = [
        {
            id: 1,
            name: 'Samsung Galaxy Book Pro 15" Laptop',
            price: 998,
            originalPrice: 1128,
            image: '../assets/Image/tech/image 34.png',
            category: 'electronics',
            rating: 4.5,
            reviews: 154,
            badge: 'sale',
            discount: 12
        },
        {
            id: 2,
            name: 'iPhone 15 Pro Max 256GB Titanium',
            price: 1099,
            originalPrice: 1299,
            image: '../assets/Image/tech/image 32.png',
            category: 'electronics',
            rating: 5,
            reviews: 324,
            badge: 'hot',
            discount: 15
        },
        {
            id: 3,
            name: 'Samsung Galaxy Watch 6 Classic',
            price: 299,
            originalPrice: 399,
            image: '../assets/Image/tech/8.png',
            category: 'electronics',
            rating: 4,
            reviews: 89,
            badge: 'sale',
            discount: 25
        },
        {
            id: 4,
            name: 'Razer BlackShark V2 Gaming Headset',
            price: 79,
            originalPrice: null,
            image: '../assets/Image/tech/image 29.png',
            category: 'electronics',
            rating: 4,
            reviews: 56,
            badge: null,
            discount: 0
        },
        {
            id: 5,
            name: 'GoPro HERO12 Black Action Camera',
            price: 599,
            originalPrice: 799,
            image: '../assets/Image/tech/6.png',
            category: 'electronics',
            rating: 4.5,
            reviews: 42,
            badge: 'sale',
            discount: 25
        },
        {
            id: 6,
            name: 'Lenovo Tab P12 Pro Tablet 12.6"',
            price: 449,
            originalPrice: 549,
            image: '../assets/Image/tech/image 85.png',
            category: 'electronics',
            rating: 4.5,
            reviews: 178,
            badge: null,
            discount: 18
        },
        {
            id: 7,
            name: 'Apple AirPods Pro 2nd Generation',
            price: 149,
            originalPrice: 199,
            image: '../assets/Image/tech/image 86.png',
            category: 'electronics',
            rating: 4.5,
            reviews: 512,
            badge: 'hot',
            discount: 25
        },
        {
            id: 8,
            name: 'Huawei Sound Joy Portable Speaker',
            price: 89,
            originalPrice: null,
            image: '../assets/Image/tech/image 33.png',
            category: 'electronics',
            rating: 3.5,
            reviews: 234,
            badge: 'new',
            discount: 0
        },
        {
            id: 9,
            name: 'Premium Cotton T-Shirt Multi Colors',
            price: 29.99,
            originalPrice: 49.99,
            image: '../assets/layout/alibaba/image/cloth/Bitmap.png',
            category: 'clothing',
            rating: 4,
            reviews: 89,
            badge: 'sale',
            discount: 40
        },
        {
            id: 10,
            name: 'Classic Blue Denim Jeans Shorts',
            price: 45.00,
            originalPrice: 65.00,
            image: '../assets/layout/alibaba/image/cloth/Bitmap (2).png',
            category: 'clothing',
            rating: 4.5,
            reviews: 156,
            badge: null,
            discount: 31
        },
        {
            id: 11,
            name: 'Brown Winter Coat Medium Size',
            price: 120.00,
            originalPrice: 180.00,
            image: '../assets/layout/alibaba/image/cloth/2 1.png',
            category: 'clothing',
            rating: 5,
            reviews: 78,
            badge: 'hot',
            discount: 33
        },
        {
            id: 12,
            name: 'Canvas Travel Bag Large Capacity',
            price: 89.95,
            originalPrice: null,
            image: '../assets/layout/alibaba/image/cloth/image 26.png',
            category: 'clothing',
            rating: 4,
            reviews: 45,
            badge: 'new',
            discount: 0
        },
        {
            id: 13,
            name: 'Genuine Leather Wallet for Men',
            price: 35.00,
            originalPrice: 55.00,
            image: '../assets/layout/alibaba/image/cloth/image 24.png',
            category: 'clothing',
            rating: 4.5,
            reviews: 234,
            badge: 'sale',
            discount: 36
        },
        {
            id: 14,
            name: 'Soft Modern Armchair Beige',
            price: 299.00,
            originalPrice: 399.00,
            image: '../assets/Image/interior/1.png',
            category: 'home',
            rating: 4,
            reviews: 67,
            badge: 'sale',
            discount: 25
        },
        {
            id: 15,
            name: 'Luxury Leather Sofa Set Brown',
            price: 899.00,
            originalPrice: 1199.00,
            image: '../assets/Image/interior/6.png',
            category: 'home',
            rating: 5,
            reviews: 34,
            badge: 'hot',
            discount: 25
        },
        {
            id: 16,
            name: 'Kitchen Dishes Set Ceramic 24pc',
            price: 79.00,
            originalPrice: null,
            image: '../assets/Image/interior/image 93.png',
            category: 'home',
            rating: 4,
            reviews: 156,
            badge: null,
            discount: 0
        },
        {
            id: 17,
            name: 'Professional Kitchen Mixer 1200W',
            price: 189.00,
            originalPrice: 249.00,
            image: '../assets/Image/interior/9.png',
            category: 'home',
            rating: 4.5,
            reviews: 89,
            badge: null,
            discount: 24
        },
        {
            id: 18,
            name: 'High Speed Blender Pro Series',
            price: 129.00,
            originalPrice: 169.00,
            image: '../assets/Image/interior/8.png',
            category: 'home',
            rating: 4,
            reviews: 112,
            badge: 'new',
            discount: 24
        },
        {
            id: 19,
            name: 'Smart Home Appliance Bundle Kit',
            price: 349.00,
            originalPrice: 499.00,
            image: '../assets/Image/interior/7.png',
            category: 'home',
            rating: 4.5,
            reviews: 45,
            badge: 'sale',
            discount: 30
        },
        {
            id: 20,
            name: 'Premium Espresso Coffee Maker',
            price: 199.00,
            originalPrice: 279.00,
            image: '../assets/Image/interior/image 89.png',
            category: 'home',
            rating: 5,
            reviews: 289,
            badge: 'hot',
            discount: 29
        },
        {
            id: 21,
            name: 'Canon EOS R6 Mark II Camera',
            price: 2499,
            originalPrice: 2799,
            image: '../assets/Image/tech/image 23.png',
            category: 'electronics',
            rating: 5,
            reviews: 87,
            badge: 'hot',
            discount: 11
        },
        {
            id: 22,
            name: 'Wireless Bluetooth Earbuds Pro',
            price: 59.99,
            originalPrice: 89.99,
            image: '../assets/Image/tech/image 86.png',
            category: 'electronics',
            rating: 4,
            reviews: 445,
            badge: 'sale',
            discount: 33
        },
        {
            id: 23,
            name: 'Smart Fitness Watch Health Monitor',
            price: 149,
            originalPrice: 199,
            image: '../assets/Image/tech/image 85.png',
            category: 'electronics',
            rating: 4.5,
            reviews: 234,
            badge: null,
            discount: 25
        },
        {
            id: 24,
            name: 'Portable Power Bank 20000mAh',
            price: 39.99,
            originalPrice: null,
            image: '../assets/Image/tech/image 33.png',
            category: 'electronics',
            rating: 4,
            reviews: 567,
            badge: 'new',
            discount: 0
        }
    ];

    // ===== STATE =====
    let currentPage = 1;
    let itemsPerPage = 8;
    let currentView = 'grid';
    let currentSort = 'featured';
    let filteredProducts = [...allProducts];
    let displayedProducts = [];

    // ===== DOM ELEMENTS =====
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    const sortSelect = document.getElementById('sortProducts');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbers = document.getElementById('pageNumbers');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const searchInput = document.getElementById('productSearchInput');
    const searchBtn = document.getElementById('productSearchBtn');

    // ===== INITIALIZATION =====
    function init() {
        // Check URL params for search
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery && searchInput) {
            searchInput.value = searchQuery;
            filterBySearch(searchQuery);
        }

        renderProducts();
        setupEventListeners();
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

        // Sort
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                sortProducts();
                currentPage = 1;
                renderProducts();
            });
        }

        // Pagination
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderProducts();
                    scrollToTop();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderProducts();
                    scrollToTop();
                }
            });
        }

        // Load More
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.classList.add('loading');
                setTimeout(() => {
                    itemsPerPage += 8;
                    renderProducts();
                    loadMoreBtn.classList.remove('loading');
                }, 500);
            });
        }

        // Search
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                filterBySearch(searchInput.value);
            });
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    filterBySearch(searchInput.value);
                }
            });
        }

        // Wishlist Toggle (Event Delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-wishlist-btn')) {
                const btn = e.target.closest('.product-wishlist-btn');
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

        // Buy Now Button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-buy-btn')) {
                const btn = e.target.closest('.product-buy-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Cart';
                btn.style.background = '#00a000';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 1500);
            }
        });

        // Page Numbers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-number') && !e.target.classList.contains('ellipsis')) {
                currentPage = parseInt(e.target.dataset.page);
                renderProducts();
                scrollToTop();
            }
        });
    }

    // ===== VIEW SWITCHING =====
    function switchView(view) {
        currentView = view;
        if (view === 'grid') {
            productsGrid.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        } else {
            productsGrid.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        }
    }

    // ===== FILTERING =====
    function filterBySearch(query) {
        if (!query.trim()) {
            filteredProducts = [...allProducts];
        } else {
            const searchLower = query.toLowerCase();
            filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower)
            );
        }
        currentPage = 1;
        sortProducts();
        renderProducts();
    }

    // ===== SORTING =====
    function sortProducts() {
        switch (currentSort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'featured':
            default:
                filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
        }
    }

    // ===== RENDER PRODUCTS =====
    function renderProducts() {
        if (!productsGrid) return;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        displayedProducts = filteredProducts.slice(startIndex, endIndex);

        if (displayedProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fa-solid fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
        } else {
            productsGrid.innerHTML = displayedProducts.map(product => createProductCard(product)).join('');
        }

        updateProductCount();
        updatePagination();
        updateLoadMoreButton();
    }

    // ===== CREATE PRODUCT CARD =====
    function createProductCard(product) {
        const starsHtml = generateStars(product.rating);
        const badgeHtml = product.badge ? 
            `<span class="product-badge ${product.badge}">${product.badge.toUpperCase()}</span>` : '';
        const originalPriceHtml = product.originalPrice ? 
            `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : '';
        const discountHtml = product.discount > 0 ? 
            `<span class="price-discount">-${product.discount}%</span>` : '';

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card-image">
                    ${badgeHtml}
                    <button class="product-wishlist-btn" aria-label="Add to wishlist">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-quick-actions">
                        <button class="quick-action-btn">
                            <i class="fa-solid fa-eye"></i>
                            Quick View
                        </button>
                    </div>
                </div>
                <div class="product-card-info">
                    <h3 class="product-card-name">${product.name}</h3>
                    <div class="product-card-price">
                        <span class="price-current">$${product.price.toFixed(2)}</span>
                        ${originalPriceHtml}
                        ${discountHtml}
                    </div>
                    <div class="product-card-rating">
                        <div class="rating-stars">${starsHtml}</div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="product-buy-btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Buy Now
                    </button>
                </div>
            </div>
        `;
    }

    // ===== GENERATE STARS =====
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars += '<i class="fa-solid fa-star"></i>';
            } else if (rating >= i - 0.5) {
                stars += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                stars += '<i class="fa-regular fa-star empty"></i>';
            }
        }
        return stars;
    }

    // ===== UPDATE PRODUCT COUNT =====
    function updateProductCount() {
        if (productCount) {
            productCount.textContent = `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
        }
    }

    // ===== UPDATE PAGINATION =====
    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        // Update prev/next buttons
        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
        }

        // Generate page numbers
        if (pageNumbers) {
            let html = '';
            
            if (totalPages <= 7) {
                // Show all pages
                for (let i = 1; i <= totalPages; i++) {
                    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
                }
            } else {
                // Show with ellipsis
                html += `<button class="page-number ${currentPage === 1 ? 'active' : ''}" data-page="1">1</button>`;
                
                if (currentPage > 3) {
                    html += '<span class="page-number ellipsis">...</span>';
                }
                
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                
                for (let i = start; i <= end; i++) {
                    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
                }
                
                if (currentPage < totalPages - 2) {
                    html += '<span class="page-number ellipsis">...</span>';
                }
                
                html += `<button class="page-number ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
            }
            
            pageNumbers.innerHTML = html;
        }
    }

    // ===== UPDATE LOAD MORE BUTTON =====
    function updateLoadMoreButton() {
        if (loadMoreBtn) {
            const totalDisplayed = currentPage * itemsPerPage;
            if (totalDisplayed >= filteredProducts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }

    // ===== SCROLL TO TOP =====
    function scrollToTop() {
        window.scrollTo({
            top: document.querySelector('.products-section').offsetTop - 100,
            behavior: 'smooth'
        });
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

    // Initialize
    init();
});
