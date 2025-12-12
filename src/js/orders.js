document.addEventListener('DOMContentLoaded', function() {
    const ordersList = document.getElementById('ordersList');
    const orderSummary = document.getElementById('orderSummary');
    const totalAmount = document.getElementById('totalAmount');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const paymentPopup = document.getElementById('paymentPopup');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
    const paymentMethod = document.getElementById('paymentMethod');
    const easypaisaSection = document.getElementById('easypaisaSection');
    const cardSection = document.getElementById('cardSection');
    const applepaySection = document.getElementById('applepaySection');
    const easypaisaNumber = document.getElementById('easypaisaNumber');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const paymentConfirmPopup = document.getElementById('paymentConfirmPopup');
    const yesPaymentBtn = document.getElementById('yesPaymentBtn');
    const noPaymentBtn = document.getElementById('noPaymentBtn');

    if (!ordersList) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Filter orders for current user
    const userOrders = allOrders.filter(order => order.username === (currentUser ? currentUser.username : ''));

    // Calculate total for all orders
    let totalAllOrders = 0;
    userOrders.forEach(order => {
        totalAllOrders += parseFloat(order.total);
    });

    if (!currentUser || userOrders.length === 0) {
        ordersList.innerHTML = `
        <div style="text-align: center; padding: 40px; background: white; border-radius: 8px; border: 1px solid #dee2e7;">
            <i class="fa-solid fa-box-open" style="font-size: 48px; color: #dee2e7; margin-bottom: 20px;"></i>
            <h3>No orders yet</h3>
            <p style="color: #8b96a5;">Start shopping to see your orders here.</p>
            <a href="../../index.html" class="auth-btn"
                style="display: inline-block; width: auto; margin-top: 20px; text-decoration: none;">Start Shopping</a>
        </div>
        `;

        // Show summary section even when no orders exist
        if (orderSummary) {
            orderSummary.style.display = 'block';
            if (totalAmount) {
                totalAmount.textContent = `$${totalAllOrders.toFixed(2)}`;
            }
        }
        setupEventListeners();
        return;
    }

    // Sort by date (newest first)
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    ordersList.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date"> • ${order.date}</span>
                </div>
                <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-body">
                ${order.items.map(item => `
                <div class="order-item">
                    <img src="${item.image}" class="item-img" alt="${item.name}">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <div class="item-meta">Qty: ${item.quantity} • $${item.price.toFixed(2)}</div>
                    </div>
                </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div style="font-size: 14px; color: #505050;">Items: ${order.items.reduce((acc, item) => acc + item.quantity, 0)}</div>
                <div class="total-price">Total: $${order.total}</div>
            </div>
        </div>
    `).join('');

    // Show summary section and update total
    if (orderSummary) {
        orderSummary.style.display = 'block';
        if (totalAmount) {
            totalAmount.textContent = `$${totalAllOrders.toFixed(2)}`;
        }
    }

    setupEventListeners();

    function setupEventListeners() {
        // Show/hide payment details based on selected method
        if (paymentMethod) {
            paymentMethod.addEventListener('change', function() {
                const selectedMethod = this.value;

                // Hide all sections
                if (easypaisaSection) easypaisaSection.style.display = 'none';
                if (cardSection) cardSection.style.display = 'none';
                if (applepaySection) applepaySection.style.display = 'none';

                // Show appropriate section
                if (selectedMethod === 'easypaisa' && easypaisaSection) {
                    easypaisaSection.style.display = 'block';
                } else if (['visa', 'mastercard', 'amex'].includes(selectedMethod) && cardSection) {
                    cardSection.style.display = 'block';
                } else if (selectedMethod === 'applepay' && applepaySection) {
                    applepaySection.style.display = 'block';
                }
            });
        }

        // Confirm Order button event
        if (confirmOrderBtn) {
            confirmOrderBtn.addEventListener('click', function() {
                if (userOrders.length === 0) {
                    alert('No orders to confirm.');
                    return;
                }
                paymentPopup.style.display = 'flex';
            });
        }

        // Confirm Payment button event
        if (confirmPaymentBtn) {
            confirmPaymentBtn.addEventListener('click', function() {
                const selectedMethod = paymentMethod.value;

                if (!selectedMethod) {
                    alert('Please select a payment method.');
                    return;
                }

                // Validate required fields based on payment method
                if (selectedMethod === 'easypaisa') {
                    if (!easypaisaNumber.value.trim()) {
                        alert('Please enter your Easypaisa number.');
                        return;
                    }
                    if (!/^\d{11}$/.test(easypaisaNumber.value.trim()) &&
                        !/^03\d{9}$/.test(easypaisaNumber.value.trim()) &&
                        !/^3\d{9}$/.test(easypaisaNumber.value.trim())) {
                        alert('Please enter a valid 11-digit Easypaisa number (e.g., 03001234567).');
                        return;
                    }
                } else if (['visa', 'mastercard', 'amex'].includes(selectedMethod)) {
                    if (!cardNumber.value.trim()) {
                        alert('Please enter your card number.');
                        return;
                    }
                    if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber.value.replace(/\s/g, ''))) {
                        alert('Please enter a valid 16-digit card number.');
                        return;
                    }
                    if (!expiryDate.value.trim()) {
                        alert('Please enter the card expiry date (MM/YY).');
                        return;
                    }
                    if (!/^\d{2}\/\d{2}$/.test(expiryDate.value.trim())) {
                        alert('Please enter a valid expiry date (MM/YY).');
                        return;
                    }
                    if (!cvv.value.trim() || !/^\d{3,4}$/.test(cvv.value.trim())) {
                        alert('Please enter a valid CVV (3 or 4 digits).');
                        return;
                    }
                }

                // Show confirmation popup instead of alert
                paymentConfirmPopup.style.display = 'flex';
            });
        }

        // Yes Payment button event
        if (yesPaymentBtn) {
            yesPaymentBtn.addEventListener('click', function() {
                const selectedMethod = paymentMethod.value;

                // Show success message based on payment method
                let paymentDetails = paymentMethod.options[paymentMethod.selectedIndex].text;
                if (selectedMethod === 'easypaisa') {
                    paymentDetails += ` (Number: ${easypaisaNumber.value})`;
                } else if (['visa', 'mastercard', 'amex'].includes(selectedMethod)) {
                    const maskedCardNumber = cardNumber.value.replace(/\s/g, '').replace(/\d(?=\d{4})/g, '*');
                    paymentDetails += ` (Card: ${maskedCardNumber}, Expiry: ${expiryDate.value})`;
                }

                // Clear orders after payment confirmation
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    // Remove orders for this user from all orders
                    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
                    const updatedOrders = allOrders.filter(order => order.username !== currentUser.username);
                    localStorage.setItem('orders', JSON.stringify(updatedOrders));

                    // Refresh the page to show empty state
                    location.reload();
                }

                // Close popups
                paymentPopup.style.display = 'none';
                paymentConfirmPopup.style.display = 'none';
            });
        }

        // No Payment button event
        if (noPaymentBtn) {
            noPaymentBtn.addEventListener('click', function() {
                paymentConfirmPopup.style.display = 'none';
            });
        }

        // Cancel Payment button event
        if (cancelPaymentBtn) {
            cancelPaymentBtn.addEventListener('click', function() {
                paymentPopup.style.display = 'none';
            });
        }
    }
});
