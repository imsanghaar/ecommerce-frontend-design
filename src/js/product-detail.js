/* =====================================================
   PRODUCT DETAIL PAGE - JavaScript Controller
   Handles product data loading, tabs, gallery, and interactivity
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ===== SAMPLE PRODUCT DATA =====
    // In production, this would come from URL params or API
    const sampleProducts = [
        {
            id: 1,
            name: 'Samsung Galaxy Book Pro 15" Laptop',
            price: 998,
            originalPrice: 1128,
            category: 'electronics',
            brand: 'Samsung',
            rating: 4.5,
            reviews: 154,
            sold: 324,
            image: '../assets/Image/tech/image 34.png',
            description: 'Ultra-thin laptop with AMOLED display, Intel Core i7 processor, 16GB RAM, and 512GB SSD. Perfect for work and entertainment.',
            features: ['metallic', '8gb', 'largememory']
        },
        {
            id: 2,
            name: 'iPhone 15 Pro Max 256GB',
            price: 1099,
            originalPrice: 1299,
            category: 'electronics',
            brand: 'Apple',
            rating: 5,
            reviews: 324,
            sold: 512,
            image: '../assets/Image/tech/image 32.png',
            description: 'Premium smartphone with titanium design, A17 Pro chip, 48MP camera system, and all-day battery life.',
            features: ['metallic', 'superpower']
        },
        {
            id: 3,
            name: 'Premium Cotton T-Shirt Multi Colors',
            price: 29.99,
            originalPrice: 49.99,
            category: 'clothing',
            brand: 'Fashion Brand',
            rating: 4,
            reviews: 89,
            sold: 156,
            image: '../assets/Layout/alibaba/Image/cloth/Bitmap.png',
            description: 'High-quality cotton t-shirt available in multiple colors. Perfect for casual wear with a comfortable fit.',
            features: ['cotton', 'comfortable']
        },
        {
            id: 4,
            name: 'Soft Modern Armchair Beige',
            price: 299,
            originalPrice: 399,
            category: 'home',
            brand: 'Home Comfort',
            rating: 4.5,
            reviews: 67,
            sold: 89,
            image: '../assets/Image/interior/1.png',
            description: 'Elegant modern armchair with soft cushioning. Perfect for living rooms and reading corners.',
            features: ['comfortable', 'modern']
        }
    ];

    // ===== STATE =====
    let currentProduct = null;

    // ===== DOM ELEMENTS =====
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    const productTitle = document.getElementById('productTitle');
    const ratingStars = document.getElementById('ratingStars');
    const ratingValue = document.getElementById('ratingValue');
    const reviewsLink = document.getElementById('reviewsLink');
    const soldCount = document.getElementById('soldCount');
    const productDescription = document.getElementById('productDescription');
    const youMayLikeList = document.getElementById('youMayLikeList');
    const relatedProductsGrid = document.getElementById('relatedProductsGrid');
    const saveBtn = document.getElementById('saveBtn');
    const sizeSelect = document.getElementById('sizeSelect');

    // ===== INITIALIZATION =====
    function init() {
        // Get product from URL params or use sample
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const productData = urlParams.get('data');

        if (productData) {
            try {
                currentProduct = JSON.parse(decodeURIComponent(productData));
            } catch (e) {
                console.error('Error parsing product data:', e);
                currentProduct = sampleProducts[0];
            }
        } else if (productId) {
            currentProduct = sampleProducts.find(p => p.id === parseInt(productId)) || sampleProducts[0];
        } else {
            currentProduct = sampleProducts[0];
        }

        // Populate page with product data
        populateProductData();
        populateYouMayLike();
        populateRelatedProducts();
        setupEventListeners();
    }

    // ===== POPULATE PRODUCT DATA =====
    function populateProductData() {
        if (!currentProduct) return;

        // Main image
        if (mainProductImage) {
            mainProductImage.src = currentProduct.image;
            mainProductImage.alt = currentProduct.name;
        }

        // Thumbnails
        if (thumbnailGallery) {
            thumbnailGallery.innerHTML = '';
            for (let i = 0; i < 6; i++) {
                const thumb = document.createElement('button');
                thumb.className = `thumbnail${i === 0 ? ' active' : ''}`;
                thumb.dataset.index = i;
                thumb.innerHTML = `<img src="${currentProduct.image}" alt="Thumbnail ${i + 1}">`;
                thumbnailGallery.appendChild(thumb);
            }
        }

        // Breadcrumb
        const categoryLink = document.getElementById('categoryLink');
        const productNameBreadcrumb = document.getElementById('productNameBreadcrumb');
        if (categoryLink) {
            categoryLink.textContent = capitalizeFirst(currentProduct.category || 'Products');
        }
        if (productNameBreadcrumb) {
            productNameBreadcrumb.textContent = currentProduct.name;
        }

        // Title
        if (productTitle) {
            productTitle.textContent = currentProduct.name;
        }

        // Rating
        if (ratingStars) {
            ratingStars.innerHTML = generateStarsHTML(currentProduct.rating || 4);
        }
        if (ratingValue) {
            ratingValue.textContent = ((currentProduct.rating || 4) * 2).toFixed(1);
        }
        if (reviewsLink) {
            reviewsLink.textContent = `${currentProduct.reviews || 0} reviews`;
        }
        if (soldCount) {
            soldCount.textContent = `${currentProduct.sold || currentProduct.reviews || 0} sold`;
        }

        // Pricing
        const pricingTiers = document.getElementById('pricingTiers');
        if (pricingTiers) {
            const price = currentProduct.price || 0;
            pricingTiers.innerHTML = `
                <div class="price-tier highlight">
                    <span class="tier-price">$${price.toFixed(2)}</span>
                    <span class="tier-qty">50-100 pcs</span>
                </div>
                <div class="price-tier">
                    <span class="tier-price">$${(price * 0.92).toFixed(2)}</span>
                    <span class="tier-qty">100-700 pcs</span>
                </div>
                <div class="price-tier">
                    <span class="tier-price">$${(price * 0.85).toFixed(2)}</span>
                    <span class="tier-qty">700+ pcs</span>
                </div>
            `;
        }

        // Attributes
        const attrPrice = document.getElementById('attrPrice');
        const attrType = document.getElementById('attrType');
        if (attrPrice) {
            attrPrice.textContent = currentProduct.originalPrice 
                ? `$${currentProduct.price.toFixed(2)} (was $${currentProduct.originalPrice.toFixed(2)})`
                : 'Negotiable';
        }
        if (attrType) {
            attrType.textContent = capitalizeFirst(currentProduct.category || 'General');
        }

        // Description
        if (productDescription) {
            productDescription.textContent = currentProduct.description || 'Product description not available.';
        }

        // Update page title
        document.title = `${currentProduct.name} - E-commerce Store`;
    }

    // ===== POPULATE "YOU MAY LIKE" SIDEBAR =====
    function populateYouMayLike() {
        if (!youMayLikeList) return;

        const filteredProducts = sampleProducts
            .filter(p => p.id !== (currentProduct?.id || 0))
            .slice(0, 5);

        youMayLikeList.innerHTML = filteredProducts.map(product => `
            <a href="product-detail.html?id=${product.id}" class="you-may-like-card">
                <div class="product-thumb">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-name">${product.name}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            </a>
        `).join('');
    }

    // ===== POPULATE RELATED PRODUCTS =====
    function populateRelatedProducts() {
        if (!relatedProductsGrid) return;

        // In production, this would fetch related products from API
        const products = [...sampleProducts, ...sampleProducts].slice(0, 6);

        relatedProductsGrid.innerHTML = products.map(product => `
            <a href="product-detail.html?id=${product.id}" class="related-product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-name">${product.name}</p>
                </div>
            </a>
        `).join('');
    }

    // ===== SETUP EVENT LISTENERS =====
    function setupEventListeners() {
        // Thumbnail click handler
        if (thumbnailGallery) {
            thumbnailGallery.addEventListener('click', (e) => {
                const thumb = e.target.closest('.thumbnail');
                if (thumb) {
                    // Update active state
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    
                    // Update main image
                    const img = thumb.querySelector('img');
                    if (img && mainProductImage) {
                        mainProductImage.src = img.src;
                    }
                }
            });
        }

        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update button states
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update panel visibility
                document.querySelectorAll('.tab-content').forEach(panel => {
                    panel.classList.remove('active');
                });
                const panel = document.getElementById(`${tabId}-panel`);
                if (panel) {
                    panel.classList.add('active');
                }
            });
        });

        // Save button
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                saveBtn.classList.toggle('active');
                const icon = saveBtn.querySelector('i');
                if (saveBtn.classList.contains('active')) {
                    icon.classList.remove('fa-regular');
                    icon.classList.add('fa-solid');
                    saveBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Saved';
                    showToast('Added to wishlist!', 'success');
                } else {
                    icon.classList.remove('fa-solid');
                    icon.classList.add('fa-regular');
                    saveBtn.innerHTML = '<i class="fa-regular fa-heart"></i> Save for later';
                }
            });
        }

        // Add to Cart Button Logic
        const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
        if (detailAddToCartBtn) {
            detailAddToCartBtn.addEventListener('click', () => {
                if (currentProduct) {
                    // Check if sizes are available and selected
                    const sizeSelect = document.getElementById('sizeSelect');
                    if (sizeSelect && sizeSelect.value) {
                         currentProduct.size = sizeSelect.value;
                    }
                    
                    if (window.addToCart) {
                        window.addToCart(currentProduct);
                        showToast('Added to cart successfully!', 'success');
                    } else {
                        // Fallback if cart.js not loaded
                         let cart = JSON.parse(localStorage.getItem('cart')) || [];
                         cart.push({...currentProduct, quantity: 1});
                         localStorage.setItem('cart', JSON.stringify(cart));
                         showToast('Added to cart!', 'success');
                    }
                }
            });
        }

        // Send inquiry button
        const sendInquiryBtn = document.querySelector('.btn-send-inquiry');
        if (sendInquiryBtn) {
            sendInquiryBtn.addEventListener('click', () => {
                showToast('Inquiry sent to seller!', 'success');
            });
        }

        // Size select change
        if (sizeSelect) {
            sizeSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    showToast(`Size ${e.target.value.toUpperCase()} selected`, 'info');
                }
            });
        }

        // Search functionality (styled only, non-functional)
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    showToast(`Searching for "${query}"...`, 'info');
                    // In production: redirect to search results page
                    // window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Successfully subscribed to newsletter!', 'success');
                newsletterForm.reset();
            });
        }

        // Dropdown functionality
        setupDropdowns();
    }

    // ===== SETUP DROPDOWNS =====
    function setupDropdowns() {
        const dropdowns = document.querySelectorAll('.secondary-nav .dropdown');

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('a');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    dropdown.classList.toggle('active');
                });
            }
        });

        // Close dropdowns on outside click
        document.addEventListener('click', (e) => {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    // ===== HELPER: Generate Stars HTML =====
    function generateStarsHTML(rating) {
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

    // ===== HELPER: Capitalize First Letter =====
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ===== HELPER: Show Toast Notification =====
    function showToast(message, type = 'info') {
        // Use global showToast if available
        if (window.showToast) {
            window.showToast(message, type);
            return;
        }

        // Fallback toast implementation
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 14px 24px;
            background: ${type === 'success' ? '#00a000' : type === 'error' ? '#fa3434' : '#0d6efd'};
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

    // Add toast animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Initialize the page
    init();
});
