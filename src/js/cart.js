/* =====================================================
   CART PAGE - JavaScript Controller
   Handles cart functionality, quantity updates, checkout
   ===================================================== */

// ===== CART STATE (stored in localStorage) =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

// ===== SAMPLE REVIEWS DATA =====
const productReviews = {
    default: [
        {
            name: 'John D.',
            initials: 'JD',
            rating: 5,
            date: 'Dec 10, 2024',
            text: 'Excellent product! The quality exceeded my expectations. Fast shipping and great packaging.'
        },
        {
            name: 'Sarah M.',
            initials: 'SM',
            rating: 4,
            date: 'Dec 8, 2024',
            text: 'Very good quality for the price. Delivery was a bit delayed but the product itself is worth it.'
        },
        {
            name: 'Alex K.',
            initials: 'AK',
            rating: 5,
            date: 'Dec 5, 2024',
            text: 'Perfect fit and great build quality. Customer service was also very helpful.'
        },
        {
            name: 'Maria G.',
            initials: 'MG',
            rating: 4,
            date: 'Dec 3, 2024',
            text: 'Good value for money. Would recommend to friends and family.'
        },
        {
            name: 'David L.',
            initials: 'DL',
            rating: 5,
            date: 'Dec 1, 2024',
            text: 'Amazing! This is exactly what I was looking for. Will definitely buy again.'
        }
    ]
};

// Make reviews available globally
window.productReviews = productReviews;

// ===== DOM ELEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCart = document.getElementById('emptyCart');
    const cartItemCount = document.getElementById('cartItemCount');
    const headerCartCount = document.getElementById('headerCartCount');
    const subtotalAmount = document.getElementById('subtotalAmount');
    const discountAmount = document.getElementById('discountAmount');
    const taxAmount = document.getElementById('taxAmount');
    const totalAmount = document.getElementById('totalAmount');
    const removeAllBtn = document.getElementById('removeAllBtn');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponInput');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const savedItemsGrid = document.getElementById('savedItemsGrid');

    // ===== INITIALIZE =====
    init();

    function init() {
        renderCart();
        renderSavedItems();
        updateCartCount();
        setupEventListeners();
    }

    // ===== RENDER CART =====
    function renderCart() {
        if (!cartItemsList) return;

        if (cart.length === 0) {
            if (emptyCart) emptyCart.style.display = 'flex';
            updateTotals();
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';

        const itemsHTML = cart.map((item, index) => `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-meta">
                        <span>Size: <strong>${item.size || 'N/A'}</strong></span>
                        <span>Color: <strong>${item.color || 'Default'}</strong></span>
                        <span>Seller: <strong>Artel Market</strong></span>
                    </div>
                    <div class="cart-item-buttons">
                        <button class="item-action-btn remove-btn" data-index="${index}">
                            <i class="fa-solid fa-trash"></i>
                            Remove
                        </button>
                        <button class="item-action-btn save-btn" data-index="${index}">
                            <i class="fa-regular fa-heart"></i>
                            Save for later
                        </button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
            </div>
        `).join('');

        cartItemsList.innerHTML = itemsHTML + (emptyCart ? emptyCart.outerHTML : '');
        if (emptyCart) document.getElementById('emptyCart').style.display = 'none';
        
        updateTotals();
    }

    // ===== RENDER SAVED ITEMS =====
    function renderSavedItems() {
        if (!savedItemsGrid) return;

        if (savedItems.length === 0) {
            savedItemsGrid.innerHTML = '<p style="color: #8b96a5; grid-column: 1/-1;">No saved items yet.</p>';
            return;
        }

        savedItemsGrid.innerHTML = savedItems.map((item, index) => `
            <div class="saved-item-card" data-index="${index}">
                <div class="saved-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="saved-item-info">
                    <p class="saved-item-price">$${item.price.toFixed(2)}</p>
                    <p class="saved-item-name">${item.name}</p>
                    <button class="move-to-cart-btn" data-index="${index}">
                        <i class="fa-solid fa-cart-plus"></i>
                        Move to cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // ===== UPDATE TOTALS =====
    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = 0; // Can be modified with coupon
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal - discount + tax;

        if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
        if (discountAmount) discountAmount.textContent = `- $${discount.toFixed(2)}`;
        if (taxAmount) taxAmount.textContent = `+ $${tax.toFixed(2)}`;
        if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
        if (cartItemCount) cartItemCount.textContent = cart.length;
    }

    // ===== UPDATE CART COUNT =====
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update all cart count badges on page
        document.querySelectorAll('.cart-count, #headerCartCount').forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }

    // ===== SETUP EVENT LISTENERS =====
    function setupEventListeners() {
        // Quantity buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn.minus')) {
                const index = parseInt(e.target.dataset.index);
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    saveCart();
                    renderCart();
                    updateCartCount();
                }
            }
            
            if (e.target.closest('.quantity-btn.plus')) {
                const index = parseInt(e.target.dataset.index);
                if (cart[index].quantity < 99) {
                    cart[index].quantity++;
                    saveCart();
                    renderCart();
                    updateCartCount();
                }
            }
        });

        // Quantity input change
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const index = parseInt(e.target.dataset.index);
                const newQty = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
                cart[index].quantity = newQty;
                saveCart();
                renderCart();
                updateCartCount();
            }
        });

        // Remove item
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')) {
                const index = parseInt(e.target.closest('.remove-btn').dataset.index);
                cart.splice(index, 1);
                saveCart();
                renderCart();
                updateCartCount();
                showToast('Item removed from cart', 'info');
            }
        });

        // Save for later
        document.addEventListener('click', (e) => {
            if (e.target.closest('.save-btn')) {
                const index = parseInt(e.target.closest('.save-btn').dataset.index);
                const item = cart[index];
                savedItems.push(item);
                cart.splice(index, 1);
                saveCart();
                saveSavedItems();
                renderCart();
                renderSavedItems();
                updateCartCount();
                showToast('Item saved for later', 'success');
            }
        });

        // Move to cart from saved
        document.addEventListener('click', (e) => {
            if (e.target.closest('.move-to-cart-btn')) {
                const index = parseInt(e.target.closest('.move-to-cart-btn').dataset.index);
                const item = savedItems[index];
                item.quantity = 1;
                cart.push(item);
                savedItems.splice(index, 1);
                saveCart();
                saveSavedItems();
                renderCart();
                renderSavedItems();
                updateCartCount();
                showToast('Item moved to cart', 'success');
            }
        });

        // Remove all
        if (removeAllBtn) {
            removeAllBtn.addEventListener('click', () => {
                if (cart.length === 0) return;
                if (confirm('Are you sure you want to remove all items from your cart?')) {
                    cart = [];
                    saveCart();
                    renderCart();
                    updateCartCount();
                    showToast('All items removed from cart', 'info');
                }
            });
        }

        // Apply coupon
        if (applyCouponBtn && couponInput) {
            applyCouponBtn.addEventListener('click', () => {
                const code = couponInput.value.trim().toUpperCase();
                if (code === 'SAVE10') {
                    showToast('Coupon applied! 10% discount', 'success');
                    // Apply discount logic here
                } else if (code) {
                    showToast('Invalid coupon code', 'error');
                } else {
                    showToast('Please enter a coupon code', 'info');
                }
            });
        }

        // Checkout Button - Open Modal
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    showToast('Your cart is empty', 'info');
                    return;
                }

                // Check auth
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    showToast('Please login to checkout', 'error');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                    return;
                }

                // Open Modal
                const modal = document.getElementById('checkoutModal');
                const totalDisplay = document.getElementById('modalTotalAmount');
                
                // Pre-fill form if user has address
                document.getElementById('checkoutName').value = currentUser.name || '';
                
                if (currentUser.address) {
                    document.getElementById('checkoutPhone').value = currentUser.address.phone || '';
                    document.getElementById('checkoutStreet').value = currentUser.address.street || '';
                    document.getElementById('checkoutCity').value = currentUser.address.city || '';
                    document.getElementById('checkoutState').value = currentUser.address.state || '';
                    document.getElementById('checkoutZip').value = currentUser.address.zip || '';
                    document.getElementById('checkoutCountry').value = currentUser.address.country || 'US';
                }

                // Update total in modal
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const tax = total * 0.1;
                const grandTotal = total + tax;
                if (totalDisplay) totalDisplay.textContent = `$${grandTotal.toFixed(2)}`;

                modal.style.display = 'flex';
            });
        }

        // Close Modal
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
        const modal = document.getElementById('checkoutModal');

        function closeCheckoutModal() {
            if (modal) modal.style.display = 'none';
        }

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeCheckoutModal);
        if (cancelCheckoutBtn) cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);

        // Confirm Order Button
        const confirmOrderBtn = document.getElementById('confirmOrderBtn');
        if (confirmOrderBtn) {
            confirmOrderBtn.addEventListener('click', async () => {
                // Get form values
                const name = document.getElementById('checkoutName').value;
                const phone = document.getElementById('checkoutPhone').value;
                const street = document.getElementById('checkoutStreet').value;
                const city = document.getElementById('checkoutCity').value;
                const state = document.getElementById('checkoutState').value;
                const zip = document.getElementById('checkoutZip').value;
                const country = document.getElementById('checkoutCountry').value;
                const saveAddress = document.getElementById('saveAddress').checked;

                if (!name || !phone || !street || !city || !state || !zip) {
                    showToast('Please fill in all required fields.', 'error');
                    return;
                }

                const shippingAddress = { name, phone, street, city, state, zip, country };

                // Get Current User
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));

                // Save address if checked
                if (saveAddress && window.updateUserProfile) {
                    currentUser.address = shippingAddress;
                    showToast('Saving address...', 'info');
                    await window.updateUserProfile(currentUser);
                }

                showToast('Processing order...', 'success');
                confirmOrderBtn.disabled = true;
                confirmOrderBtn.textContent = 'Processing...';
                
                // Create Order
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const tax = total * 0.1;
                const grandTotal = total + tax;

                const newOrder = {
                    id: Math.floor(100000 + Math.random() * 900000),
                    username: currentUser.username,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    status: 'Processing',
                    items: [...cart],
                    total: grandTotal.toFixed(2),
                    shippingAddress: shippingAddress
                };

                orders.push(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Clear Cart
                cart = [];
                saveCart();
                renderCart();
                updateCartCount();

                setTimeout(() => {
                    window.location.href = 'orders.html';
                }, 1500);
            });
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Successfully subscribed!', 'success');
                newsletterForm.reset();
            });
        }
    }

    // ===== SAVE FUNCTIONS =====
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function saveSavedItems() {
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }

    // ===== TOAST NOTIFICATION =====
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
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
});

// ===== GLOBAL CART FUNCTIONS =====
// These can be called from any page

window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            size: product.size || 'M',
            color: product.color || 'Default'
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateGlobalCartCount();
    
    return true;
};

window.getCartCount = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((sum, item) => sum + item.quantity, 0);
};

window.updateGlobalCartCount = function() {
    const count = window.getCartCount();
    document.querySelectorAll('.cart-count, #headerCartCount').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
};

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    window.updateGlobalCartCount();
});

// Add toast animation styles
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
