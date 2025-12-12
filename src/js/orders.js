document.addEventListener('DOMContentLoaded', function() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Filter orders for current user
    const userOrders = allOrders.filter(order => order.username === (currentUser ? currentUser.username : ''));

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
});
