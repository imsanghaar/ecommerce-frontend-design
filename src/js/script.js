// Countdown Timer
function startCountdown(durationInSeconds) {
    let timer = durationInSeconds;
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const interval = setInterval(function () {
        const days = Math.floor(timer / (24 * 3600));
        const hours = Math.floor((timer % (24 * 3600)) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = Math.floor(timer % 60);

        if (daysElement) daysElement.textContent = days < 10 ? "0" + days : days;
        if (hoursElement) hoursElement.textContent = hours < 10 ? "0" + hours : hours;
        if (minutesElement) minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (secondsElement) secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            clearInterval(interval);
            // Optional: Handle timer expiry
        }
    }, 1000);
}

// Initialize timer with 4 days, 13 hours, 34 minutes, 56 seconds
// Total seconds = (4 * 24 * 3600) + (13 * 3600) + (34 * 60) + 56
// Initialize timer with 4 days, 13 hours, 34 minutes, 56 seconds
// Total seconds = (4 * 24 * 3600) + (13 * 3600) + (34 * 60) + 56
const initialDuration = (4 * 86400) + (13 * 3600) + (34 * 60) + 56;

document.addEventListener('DOMContentLoaded', () => {
    startCountdown(initialDuration);
    startCountdown(initialDuration);


});


//Dropdown for the ship to button
document.addEventListener('DOMContentLoaded', function() {
    // 1. Select all dropdown elements in the secondary navigation
    const dropdowns = document.querySelectorAll('.secondary-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a'); // The link that gets clicked
        const menu = dropdown.querySelector('.dropdown-menu');

        // 2. Add click event to the trigger link
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault(); // Stop the link from refreshing the page/jumping

                // Close other open dropdowns first (optional, but good for UX)
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });

                // Toggle the 'active' class on the clicked dropdown
                dropdown.classList.toggle('active');
            });
        }

        // 3. Handle dropdown menu item selection (for Ship to dropdown)
        if (menu) {
            menu.querySelectorAll('li').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Get the flag image and country name
                    const flagImg = item.querySelector('img');
                    const countryName = item.textContent.trim();
                    
                    // Update the trigger display
                    if (trigger && flagImg) {
                        const triggerFlagImg = trigger.querySelector('.flag-icon');
                        if (triggerFlagImg) {
                            triggerFlagImg.src = flagImg.src;
                            triggerFlagImg.alt = countryName + ' Flag';
                        }
                    }
                    
                    // Mark selected item
                    menu.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                    item.classList.add('selected');
                    
                    // Close dropdown
                    dropdown.classList.remove('active');
                    
                    // Show toast notification
                    showGlobalToast(`Shipping to ${countryName}`, 'success');
                });
                
                // Add hover styling
                item.style.cursor = 'pointer';
            });
        }
    });

    // 4. Close dropdown if user clicks anywhere outside
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            // Check if the click happened INSIDE the dropdown
            const isClickInside = dropdown.contains(e.target);

            // If click was OUTSIDE and the dropdown is currently open, close it
            if (!isClickInside && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    });
});

// Global toast function for script.js
function showGlobalToast(message, type = 'info') {
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

// WhatsApp Inquiry Form Integration
document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form values
            const itemName = document.getElementById('itemName').value;
            const itemDetails = document.getElementById('itemDetails').value;
            const quantity = document.getElementById('quantity').value;
            const unit = document.getElementById('unit').value;
            
            // Check if required fields are filled
            if (!itemName || !quantity) {
                alert('Please fill in all required fields (Item name and Quantity)');
                return;
            }
            
            // Format the WhatsApp message
            let message = `*New Inquiry Request*\n\n`;
            message += `📦 *Item Needed:* ${itemName}\n`;
            if (itemDetails) {
                message += `📝 *Details:* ${itemDetails}\n`;
            }
            message += `🔢 *Quantity:* ${quantity} ${unit}\n\n`;
            message += `_Sent from Website Inquiry Form_`;
            
            // WhatsApp number (Pakistani format: +92 instead of 0)
            const whatsappNumber = '923441323835';
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Optional: Reset form after submission
            inquiryForm.reset();
        });
    }
});

// Search Functionality
// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Determine correct path to products.html
            const path = window.location.pathname;
            const isRoot = path.endsWith('index.html') || path.endsWith('/');
            const targetPath = isRoot ? 'src/html/products.html' : 'products.html';
            
            window.location.href = `${targetPath}?search=${encodeURIComponent(query)}`;
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
});

// ===== GLOBAL ADD TO CART =====
window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize: product.size || null
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update Header Count
    updateGlobalCartCount();
    
    // Show Toast
    if (typeof showGlobalToast === 'function') {
        showGlobalToast(`${product.name} added to cart!`, 'success');
    } else {
        alert(`${product.name} added to cart!`);
    }
};

function updateGlobalCartCount() {
    const countEl = document.getElementById('headerCartCount');
    if (countEl) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
        countEl.style.cssText = totalItems > 0 ? 'display: flex !important' : 'display: none !important';
    }
}

// Initialize Cart Count
document.addEventListener('DOMContentLoaded', updateGlobalCartCount);

// Chatbot Welcome Popup Logic
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('chatbotWelcomePopup');
    const closeBtn = document.getElementById('closeChatbotPopup');

    // Show popup after 1 second
    setTimeout(() => {
        if (popupOverlay) {
            popupOverlay.classList.add('active');
        }
    }, 1000);

    // Close logic
    if (closeBtn && popupOverlay) {
        closeBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });
    }
});
