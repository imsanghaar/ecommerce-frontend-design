/* =====================================================
   PRODUCT DETAIL MODAL - JavaScript Controller
   Handles modal display, product details, reviews, and related products
   ===================================================== */

// ===== MODAL INITIALIZATION =====
function initProductDetailModal() {
    // Create modal HTML if it doesn't exist
    if (!document.getElementById('productDetailModal')) {
        createModalHTML();
    }

    // Set up event listeners
    setupModalEventListeners();
}

// ===== CREATE MODAL HTML =====
function createModalHTML() {
    const modalHTML = `
        <div class="product-modal-overlay" id="productDetailModal">
            <div class="product-modal">
                <button class="modal-close-btn" id="modalCloseBtn">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                
                <div class="modal-content">
                    <!-- Product Images -->
                    <div class="modal-product-images">
                        <div class="main-product-image" id="mainProductImage">
                            <img src="" alt="Product Image" id="modalMainImg">
                        </div>
                        <div class="thumbnail-images" id="thumbnailImages">
                            <!-- Thumbnails will be populated by JS -->
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="modal-product-info">
                        <span class="stock-badge" id="stockBadge">
                            <i class="fa-solid fa-check"></i>
                            <span>In stock</span>
                        </span>
                        
                        <h2 class="modal-product-title" id="modalProductTitle">Product Name</h2>
                        
                        <div class="modal-product-rating">
                            <div class="rating-stars" id="modalRatingStars"></div>
                            <span class="rating-text" id="modalRatingText">4.5</span>
                            <span class="rating-reviews" id="modalReviewCount">32 reviews</span>
                            <span class="sold-count" id="modalSoldCount">154 sold</span>
                        </div>
                        
                        <div class="modal-price-section" id="modalPriceSection">
                            <div class="price-tier">
                                <span class="price-value" id="modalPrice">$998.00</span>
                                <span class="price-qty">50-100 pcs</span>
                            </div>
                            <div class="price-divider"></div>
                            <div class="price-tier">
                                <span class="price-value">$979.00</span>
                                <span class="price-qty">100-500 pcs</span>
                            </div>
                            <div class="price-divider"></div>
                            <div class="price-tier">
                                <span class="price-value">$959.00</span>
                                <span class="price-qty">500+ pcs</span>
                            </div>
                        </div>
                        
                        <div class="modal-product-description" id="modalDescription">
                            <div class="description-row">
                                <span class="description-label">Price:</span>
                                <span class="description-value" id="descPrice">Negotiable</span>
                            </div>
                            <div class="description-row">
                                <span class="description-label">Type:</span>
                                <span class="description-value" id="descType">Classic shoes</span>
                            </div>
                            <div class="description-row">
                                <span class="description-label">Material:</span>
                                <span class="description-value" id="descMaterial">Plastic material</span>
                            </div>
                            <div class="description-row">
                                <span class="description-label">Design:</span>
                                <span class="description-value" id="descDesign">Modern nice</span>
                            </div>
                            <div class="description-row">
                                <span class="description-label">Customization:</span>
                                <span class="description-value" id="descCustom">Customized logo and design custom packages</span>
                            </div>
                            <div class="description-row">
                                <span class="description-label">Protection:</span>
                                <span class="description-value" id="descProtection">Refund Policy</span>
                            </div>
                            <div class="description-row">
                                <span class="description-label">Warranty:</span>
                                <span class="description-value" id="descWarranty">2 years full warranty</span>
                            </div>
                        </div>
                        
                        <div class="modal-size-selector">
                            <label class="size-label">Size:</label>
                            <select class="size-dropdown" id="sizeDropdown">
                                <option value="">Select Size</option>
                                <option value="xs">XS - Extra Small</option>
                                <option value="s">S - Small</option>
                                <option value="m">M - Medium</option>
                                <option value="l">L - Large</option>
                                <option value="xl">XL - Extra Large</option>
                                <option value="xxl">XXL - Double Extra Large</option>
                            </select>
                        </div>
                        
                        <div class="modal-quantity-selector">
                            <label class="quantity-label">Quantity:</label>
                            <div class="quantity-input-group">
                                <button class="quantity-btn" id="quantityMinus">-</button>
                                <input type="number" class="quantity-input" id="quantityInput" value="1" min="1" max="100">
                                <button class="quantity-btn" id="quantityPlus">+</button>
                            </div>
                        </div>
                        
                        <div class="modal-action-buttons">
                            <button class="btn-add-to-cart" id="addToCartBtn">
                                <i class="fa-solid fa-cart-shopping"></i>
                                Add to Cart
                            </button>
                            <button class="btn-wishlist" id="wishlistBtn">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                        
                        <div class="modal-seller-info">
                            <div class="seller-avatar">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            <div class="seller-details">
                                <p class="seller-name">Supplier: Guanjoi Trading LLC</p>
                                <p class="seller-location"><i class="fa-solid fa-location-dot"></i> Germany, Berlin</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Customer Reviews Section -->
                <div class="modal-reviews-section">
                    <div class="reviews-header">
                        <h3 class="reviews-title">Customer Reviews</h3>
                        <span class="reviews-count" id="totalReviewsCount">32 reviews</span>
                    </div>
                    <div class="reviews-list" id="reviewsList">
                        <!-- Reviews will be populated by JS -->
                    </div>
                </div>
                
                <!-- Related Products Section -->
                <div class="modal-related-section">
                    <div class="related-header">
                        <h3 class="related-title">You may also like</h3>
                    </div>
                    <div class="related-products-grid" id="relatedProductsGrid">
                        <!-- Related products will be populated by JS -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ===== SETUP EVENT LISTENERS =====
function setupModalEventListeners() {
    // Close button
    document.addEventListener('click', (e) => {
        if (e.target.closest('#modalCloseBtn')) {
            closeProductModal();
        }
    });

    // Close on overlay click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-modal-overlay')) {
            closeProductModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });

    // Quantity buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('#quantityMinus')) {
            const input = document.getElementById('quantityInput');
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }
        if (e.target.closest('#quantityPlus')) {
            const input = document.getElementById('quantityInput');
            if (input.value < 100) {
                input.value = parseInt(input.value) + 1;
            }
        }
    });

    // Add to Cart button
    document.addEventListener('click', (e) => {
        if (e.target.closest('#addToCartBtn')) {
            const btn = document.getElementById('addToCartBtn');
            const quantity = document.getElementById('quantityInput').value;
            const size = document.getElementById('sizeDropdown').value;

            // Animate button
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Cart!';
            btn.classList.add('added');

            // Show toast notification
            if (window.showToast) {
                window.showToast(`Added ${quantity} item(s) to cart!`, 'success');
            }

            // Reset button after delay
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';
                btn.classList.remove('added');
            }, 2000);
        }
    });

    // Wishlist button
    document.addEventListener('click', (e) => {
        if (e.target.closest('#wishlistBtn')) {
            const btn = document.getElementById('wishlistBtn');
            const icon = btn.querySelector('i');
            btn.classList.toggle('active');
            
            if (btn.classList.contains('active')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                if (window.showToast) {
                    window.showToast('Added to wishlist!', 'success');
                }
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        }
    });

    // View Details button click (event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.view-details-btn')) {
            const btn = e.target.closest('.view-details-btn');
            const productId = btn.dataset.productId;
            const productData = btn.dataset.product ? JSON.parse(btn.dataset.product) : null;
            
            if (productData) {
                openProductModal(productData);
            }
        }
    });

    // Thumbnail click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.thumbnail-item')) {
            const thumb = e.target.closest('.thumbnail-item');
            const img = thumb.querySelector('img');
            const mainImg = document.getElementById('modalMainImg');
            
            // Update main image
            mainImg.src = img.src;
            
            // Update active state
            document.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        }
    });

    // Related product click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.related-product-card')) {
            const card = e.target.closest('.related-product-card');
            const productData = card.dataset.product ? JSON.parse(card.dataset.product) : null;
            
            if (productData) {
                openProductModal(productData);
            }
        }
    });
}

// ===== OPEN PRODUCT MODAL =====
function openProductModal(product) {
    const modal = document.getElementById('productDetailModal');
    if (!modal) return;

    // Populate modal with product data
    populateModalData(product);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== CLOSE PRODUCT MODAL =====
function closeProductModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== POPULATE MODAL DATA =====
function populateModalData(product) {
    // Main image
    const mainImg = document.getElementById('modalMainImg');
    mainImg.src = product.image || '';
    mainImg.alt = product.name || 'Product';

    // Thumbnails (use same image for demo, in production you'd have multiple)
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = `
        <div class="thumbnail-item active">
            <img src="${product.image}" alt="Thumbnail 1">
        </div>
        <div class="thumbnail-item">
            <img src="${product.image}" alt="Thumbnail 2">
        </div>
        <div class="thumbnail-item">
            <img src="${product.image}" alt="Thumbnail 3">
        </div>
        <div class="thumbnail-item">
            <img src="${product.image}" alt="Thumbnail 4">
        </div>
    `;

    // Product title
    document.getElementById('modalProductTitle').textContent = product.name || 'Product Name';

    // Rating
    const ratingStars = document.getElementById('modalRatingStars');
    ratingStars.innerHTML = generateStarsHTML(product.rating || 4);
    document.getElementById('modalRatingText').textContent = product.rating || '4.0';
    document.getElementById('modalReviewCount').textContent = `${product.reviews || 0} reviews`;
    document.getElementById('modalSoldCount').textContent = `${product.orders || product.reviews || 0} sold`;

    // Price
    const price = product.price || 0;
    document.getElementById('modalPrice').textContent = `$${price.toFixed(2)}`;

    // Update price tiers based on actual price
    const priceSection = document.getElementById('modalPriceSection');
    priceSection.innerHTML = `
        <div class="price-tier">
            <span class="price-value">$${price.toFixed(2)}</span>
            <span class="price-qty">1-49 pcs</span>
        </div>
        <div class="price-divider"></div>
        <div class="price-tier">
            <span class="price-value">$${(price * 0.95).toFixed(2)}</span>
            <span class="price-qty">50-100 pcs</span>
        </div>
        <div class="price-divider"></div>
        <div class="price-tier">
            <span class="price-value">$${(price * 0.90).toFixed(2)}</span>
            <span class="price-qty">100+ pcs</span>
        </div>
    `;

    // Description values
    document.getElementById('descPrice').textContent = product.originalPrice ? `$${price.toFixed(2)} (was $${product.originalPrice.toFixed(2)})` : 'Negotiable';
    document.getElementById('descType').textContent = product.category ? capitalizeFirst(product.category) : 'General';
    document.getElementById('descMaterial').textContent = product.material || 'Premium Quality';
    document.getElementById('descDesign').textContent = product.design || 'Modern Design';
    document.getElementById('descCustom').textContent = 'Customized logo and design available';
    document.getElementById('descProtection').textContent = 'Full Refund Policy';
    document.getElementById('descWarranty').textContent = product.warranty || '1 year warranty';

    // Reviews count
    document.getElementById('totalReviewsCount').textContent = `${product.reviews || 0} reviews`;

    // Populate reviews
    populateReviews(product);

    // Populate related products
    populateRelatedProducts(product);

    // Reset quantity and size
    document.getElementById('quantityInput').value = 1;
    document.getElementById('sizeDropdown').value = '';

    // Reset wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    wishlistBtn.classList.remove('active');
    wishlistBtn.querySelector('i').classList.remove('fa-solid');
    wishlistBtn.querySelector('i').classList.add('fa-regular');
}

// ===== GENERATE STARS HTML =====
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

// ===== CAPITALIZE FIRST LETTER =====
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== POPULATE REVIEWS =====
function populateReviews(product) {
    const reviewsList = document.getElementById('reviewsList');
    
    // Sample reviews data
    const sampleReviews = [
        {
            name: 'John D.',
            initials: 'JD',
            rating: 5,
            date: 'Dec 10, 2024',
            text: 'Excellent product! The quality exceeded my expectations. Fast shipping and great packaging. Would definitely recommend to others.'
        },
        {
            name: 'Sarah M.',
            initials: 'SM',
            rating: 4,
            date: 'Dec 8, 2024',
            text: 'Very good quality for the price. Delivery was a bit delayed but the product itself is worth it. Happy with my purchase.'
        },
        {
            name: 'Alex K.',
            initials: 'AK',
            rating: 5,
            date: 'Dec 5, 2024',
            text: 'This is exactly what I was looking for. Perfect fit and great build quality. The customer service was also very helpful.'
        }
    ];

    reviewsList.innerHTML = sampleReviews.map(review => `
        <div class="review-item">
            <div class="review-avatar">${review.initials}</div>
            <div class="review-content">
                <div class="review-header">
                    <p class="review-author">${review.name}</p>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">
                    ${generateStarsHTML(review.rating)}
                </div>
                <p class="review-text">${review.text}</p>
            </div>
        </div>
    `).join('');
}

// ===== POPULATE RELATED PRODUCTS =====
function populateRelatedProducts(currentProduct) {
    const relatedGrid = document.getElementById('relatedProductsGrid');
    
    // Get related products from window.allProducts if available
    let relatedProducts = [];
    
    if (window.allProducts && Array.isArray(window.allProducts)) {
        // Filter products by same category, exclude current product
        relatedProducts = window.allProducts
            .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
            .slice(0, 4);
        
        // If not enough, add random products
        if (relatedProducts.length < 4) {
            const moreProducts = window.allProducts
                .filter(p => p.id !== currentProduct.id && !relatedProducts.includes(p))
                .slice(0, 4 - relatedProducts.length);
            relatedProducts = [...relatedProducts, ...moreProducts];
        }
    } else {
        // Fallback: use same product as related
        relatedProducts = [currentProduct, currentProduct, currentProduct, currentProduct];
    }

    relatedGrid.innerHTML = relatedProducts.map(product => `
        <div class="related-product-card" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>
            <div class="related-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="related-product-info">
                <p class="related-product-price">$${product.price.toFixed(2)}</p>
                <p class="related-product-name">${product.name}</p>
            </div>
        </div>
    `).join('');
}

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initProductDetailModal();
});
