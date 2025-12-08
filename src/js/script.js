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
const initialDuration = (4 * 86400) + (13 * 3600) + (34 * 60) + 56;

// Button Event Listeners
function setupButtonListeners() {
    const joinNowBtn = document.querySelector('.join-now-button');
    const loginBtn = document.querySelector('.login-button');

    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', function() {
            console.log('Join now button clicked');
            alert('Join Now - Redirect to sign up page');
            // You can replace this with actual navigation
            // window.location.href = '/signup';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            console.log('Log in button clicked');
            alert('Log In - Redirect to login page');
            // You can replace this with actual navigation
            // window.location.href = '/login';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startCountdown(initialDuration);
    setupButtonListeners();
});


//Dropdown for the ship to button
document.addEventListener('DOMContentLoaded', function() {
    // 1. Select all dropdown elements in the secondary navigation
    const dropdowns = document.querySelectorAll('.secondary-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a'); // The link that gets clicked

        // 2. Add click event to the trigger link
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
    });

    // 3. Close dropdown if user clicks anywhere outside
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
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Redirect to products page with search query for comprehensive search
            window.location.href = `src/html/products.html?search=${encodeURIComponent(query)}`;
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