# DevelopersHub E-commerce Frontend

A modern, responsive e-commerce web application featuring a comprehensive user interface, client-side authentication, product management, shopping cart functionality, and advanced order management with payment options.

## Project Overview

This project is a frontend implementation of an e-commerce platform designed to provide a premium user experience. It includes essential features such as user registration, product browsing, detailed product views, a persistent shopping cart using LocalStorage, and a complete order management system with payment simulation.

## Key Features

### 1. User Authentication & Profile Management
*   **Sign Up & Login**: Custom forms with validation and animations.
*   **Profile Management**: Profile picture upload (Base64), username, and email storage.
*   **Cloud Storage**: User data is stored in **JSONBin.io** cloud database, persisting across devices and deployments.
*   **Password Recovery**: Secure password recovery via **EmailJS** - passwords are sent to the user's registered email address.
*   **Protected Routes**: Profile and orders pages require authentication.
*   **Offline Support**: Falls back to localStorage when cloud is unavailable.

### 2. Product Experience
*   **Homepage**: Dynamic hero section that welcomes logged-in users.
*   **Product Listings**: Filterable grids for Electronics (Tech), Clothing, and Home Interiors.
*   **Product Details**: Comprehensive view with image galleries, pricing tiers, specifications, and "Add to Cart" functionality.
*   **Search**: Functional search bar for filtering products.

### 3. Shopping Cart & Checkout
*   **Cart Management**: Add items, adjust quantities, remove items, and save for later.
*   **Checkout Process**: Simulated checkout that creates order records.
*   **Order Summary**: Subtotal, tax calculation, and total display with coupon functionality.

### 4. Order Management & Payment
*   **Order History**: "My Orders" page displaying past purchases dynamically.
*   **Total Calculation**: Shows total amount across all orders.
*   **Payment Gateway Simulation**: Multiple payment methods including:
    - PayPal
    - Easypaisa (with mobile number validation)
    - Cash On Delivery (COD)
    - Visa (with card number, expiry date, and CVV)
    - Mastercard (with card number, expiry date, and CVV)
    - American Express (with card number, expiry date, and CVV)
    - Apple Pay (device authentication)
*   **Payment Form Validation**: Input validation for:
    - Easypaisa: 11-digit mobile number validation
    - Credit Cards: 16-digit card number, MM/YY expiry date, and 3-4 digit CVV validation
*   **Dynamic Payment Fields**: Input fields appear based on selected payment method
*   **Payment Confirmation**: Pop-up interface for payment method selection and confirmation.
*   **Order Completion**: Orders are cleared after successful payment simulation.

### 5. UI/UX Design
*   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
*   **Animations**: Smooth transitions, loading spinners, and toast notifications.
*   **Icons & Typography**: Integrated Font Awesome 7 (with payment icons) and Google Fonts (Inter).
*   **Interactive Elements**: Dropdowns, modals, and dynamic content updates.

### 6. Smart Features
*   **AI Chatbot**: Integrated **ElevenLabs Convai** widget for interactive voice and text support on all pages. The chatbot is powered by Google Gemini API and provides 24/7 customer support.
*   **WhatsApp Integration**: Inquiry form that sends messages directly to WhatsApp.
*   **Countdown Timer**: Dynamic sale countdown on homepage.
*   **Product Reviews**: Dynamic reviews display on product detail pages.
*   **Promotional Banner**: Animated rotating message banner with chatbot promotion and other announcements.
*   **Vertical Slideshow**: Rotating promotional messages in the header banner (Chatbot available, Free shipping, etc.).

## File Structure

```
/
├── index.html              # Main Entry Point (Homepage)
├── README.md               # Project Documentation
├── .gitignore              # Git ignore rules
├── chatbot_prompt.txt      # Chatbot configuration
└── src/
    ├── html/               # HTML Pages
    │   ├── signup.html     # User registration page
    │   ├── login.html      # User login page
    │   ├── profile.html    # User profile management page
    │   ├── orders.html     # Order history with payment options
    │   ├── cart.html       # Shopping cart management
    │   ├── products.html   # Product listing page
    │   ├── product-detail.html # Detailed product view
    │   ├── clothing.html   # Clothing category page
    │   ├── tech.html       # Technology products page
    │   ├── interiors.html  # Home interiors page
    │   └── ...
    ├── css/                # Stylesheets
    │   ├── style.css       # Core site styles
    │   ├── auth.css        # Authentication pages styles
    │   ├── cart.css        # Shopping cart specific styles
    │   ├── animations.css  # Animation effects
    │   ├── chatbot.css     # Chatbot widget styles
    │   ├── clothing.css    # Clothing category styles
    │   ├── interiors.css   # Interiors category styles
    │   ├── product-detail-modal.css # Product modal styles
    │   ├── product-detail.css # Product detail page styles
    │   ├── products.css    # Products listing styles
    │   └── tech.css        # Technology category styles
    ├── js/                 # JavaScript Logic
    │   ├── animations.js   # Animation and visual effects
    │   ├── auth.js         # Authentication & user management
    │   ├── cart.js         # Shopping cart functionality
    │   ├── chatbot.js      # Chatbot integration
    │   ├── clothing.js     # Clothing page specific logic
    │   ├── interiors.js    # Interiors page specific logic
    │   ├── orders.js       # Order management & payment logic
    │   ├── product-detail-modal.js # Product modal functionality
    │   ├── product-detail.js # Product detail page logic
    │   ├── products.js     # Product listing & filtering
    │   ├── script.js       # Global site functionality
    │   └── tech.js         # Technology page specific logic
    ├── assets/             # Images and Icons
    │   ├── fonts/          # Custom fonts
    │   ├── Image/          # Product images
    │   ├── Layout/         # Layout images and brand assets
    │   └── Layout1/        # Additional layout assets
    └── WEBSITE_KNOWLEDGE_BASE.md # Project knowledge documentation
```

## Detailed Functionality Breakdown

### Authentication System
- **Registration**: Users can create accounts with name, email, username, password, and profile picture
- **Login**: Supports login with email or username and password
- **Profile**: Displays user information and allows viewing of personal details
- **Session Management**: Uses localStorage to maintain user sessions

### Product Catalog
- **Categories**: Electronics, Clothing, Home Interiors, and Tech
- **Filtering**: Advanced filtering and sorting capabilities
- **Search**: Real-time search functionality
- **Grid/List Views**: Toggle between different product display formats
- **Pagination**: Efficient loading of large product catalogs

### Shopping Experience
- **Cart Management**: Add/remove items, quantity adjustment, save for later
- **Checkout Process**: Complete checkout flow with order summary
- **Order Creation**: Orders are stored in localStorage with unique IDs
- **Order Tracking**: Users can view all their past orders
- **Enhanced Category Sidebars**: Each category page (Tech, Clothing, Interiors) features comprehensive filtering options including:
  - Price range sliders with min/max inputs
  - Product condition filters (New, Refurbished, Used)
  - Star rating filters (1-5 stars)
  - Brand selection
  - Category-specific filters (Size for clothing, Room type for interiors, etc.)
  - Improved checkbox spacing for better user experience

### Payment System (Simulated)
- **Multiple Payment Methods**: PayPal, Easypaisa (with mobile number), COD, Visa (with card details), Mastercard (with card details), American Express (with card details), Apple Pay (device authentication)
- **Dynamic Form Fields**: Different input fields appear based on selected payment method
- **Input Validation**:
  - Easypaisa: 11-digit mobile number validation
  - Credit Cards: 16-digit card number, MM/YY expiry date, and 3-4 digit CVV validation
- **Payment Confirmation**: Interactive popup with payment method selection and detailed information collection
- **Order Completion**: Orders are cleared after payment confirmation
- **Payment Icons**: Visual representation of all supported payment methods
- **Secure Display**: Card numbers are masked for security in confirmation messages

### Additional Features
- **Countdown Timer**: Dynamic countdown for sales events
- **Dropdown Menus**: Interactive country selection and language options
- **Toast Notifications**: User feedback for various actions
- **Responsive Design**: Works seamlessly across all device sizes
- **WhatsApp Integration**: Direct inquiry to business via WhatsApp
- **AI Chatbot**: Interactive voice and text support powered by Google Gemini API
- **Promotional Banner**: Animated rotating message banner with chatbot promotion and other announcements
- **Vertical Slideshow**: Rotating promotional messages in the header banner (Chatbot available, Free shipping, etc.)

## How to Run

1.  **Clone or Download** the repository.
2.  **Open** the project folder in your code editor (e.g., VS Code).
3.  **Launch** `index.html` in your browser.
    *   Recommended: Use the "Live Server" extension in VS Code for the best experience.
    *   Or simply double-click `index.html` to open it.

## Technologies Used

*   **HTML5**: Semantic structure and accessibility features.
*   **CSS3**: Custom styling, Flexbox, Grid, Animations, and responsive design.
*   **JavaScript (ES6+)**: DOM manipulation, LocalStorage logic, Event handling, and asynchronous operations.
*   **Font Awesome 7**: Comprehensive icon library including payment method icons.
*   **Google Fonts**: Typography with the Inter font family.
*   **ElevenLabs Convai**: AI-powered voice and text chatbot integration.
*   **EmailJS**: Email service for password recovery without backend.
*   **JSONBin.io**: Cloud-based JSON storage for persistent user data.
*   **LocalStorage**: Client-side data persistence for cart and orders (with cloud sync for users).

## Data Storage

### Cloud Storage (JSONBin.io)
*   **User Data**: Stored in JSONBin.io cloud database for persistence across devices
*   **Automatic Sync**: Users are synced to cloud on signup and fetched on login
*   **Offline Fallback**: Falls back to localStorage when cloud is unavailable

### Local Storage (Browser)
*   **Current Session**: `currentUser` stores the logged-in user
*   **Shopping Cart**: Stored in `localStorage` under `cart`
*   **Saved Items**: Stored in `localStorage` under `savedItems`
*   **Order History**: Stored in `localStorage` under `orders`
*   **Product Reviews**: Sample data structure available globally

## API Integrations

*   **EmailJS**: Password recovery email service
    - Service ID: `service_hx9wjlb`
    - Template ID: `template_3g02fkh`
    - Sends password recovery emails directly from the browser
*   **JSONBin.io**: Cloud JSON storage for user data
    - Bin ID: `693c63e4ae596e708f95a256`
    - Free tier with 10,000 requests/month
*   **WhatsApp Business API**: Direct inquiry form integration
*   **ElevenLabs Convai Widget**: AI chatbot service
*   **Font Awesome CDN**: Icon delivery

## Browser Compatibility

*   Modern browsers with JavaScript enabled
*   LocalStorage support required for full functionality
*   Responsive design works on mobile, tablet, and desktop devices

## Development Notes

*   **Cloud Storage**: User data is stored in JSONBin.io cloud database, allowing users to login from any device.
*   **Local Fallback**: If cloud is unavailable, the app falls back to localStorage.
*   **Email Service**: Password recovery uses EmailJS to send emails directly from the browser - no backend required.
*   **Chatbot**: The site integrates an external **ElevenLabs Convai Widget** (`agent_5401kc8f5b2eeqbs7tfxz4d9yqmq`). Ensure you have internet access for the widget to load appropriately.
*   **Payment System**: The payment system is simulated for demonstration purposes. No real transactions take place.
*   **Order Management**: Orders are cleared from storage after successful payment confirmation (simulated).
*   **Payment Security**: Card numbers are masked in confirmation messages for security demonstration.
*   **Input Validation**: All payment information is validated on the client side before submission.

## Folder Structure Details

### /src/html
Contains all HTML pages with consistent structure and proper script inclusion

### /src/css
Modular CSS approach with dedicated stylesheets for different features:
- Core styles (style.css)
- Authentication pages (auth.css)
- Product pages (products.css, product-detail.css)
- Category-specific styles (clothing.css, tech.css, interiors.css)
- Shopping cart (cart.css)
- Animations (animations.css)

### /src/js
Modular JavaScript approach with dedicated functionality:
- Authentication (auth.js)
- Shopping cart (cart.js)
- Product listing (products.js)
- Product details (product-detail.js)
- Order management (orders.js)
- Global functionality (script.js)
- Category-specific logic (clothing.js, tech.js, interiors.js)

### /src/assets
Organized asset structure:
- Brand logos and layout elements
- Product images organized by category
- Font files

## Customization Options

*   **Themes**: Easy color modification through CSS variables
*   **Layout**: Flexible grid and flexbox layout system
*   **Payment Methods**: Easily add or modify payment options
*   **Categories**: Extend product categories with new pages
*   **Functionality**: Module-based JavaScript for easy feature additions
*   **Sidebar Filters**: Comprehensive filtering system with price, condition, and rating options that can be customized for different product categories

## About the Developers

*   **Company**: DevelopersHub Corporation
*   **Lead Developer**: Imam Sanghaar Chandio (Web Developer, Prompt Engineer, Learning Agentic AI)
*   **Mission**: To connect customers with premium quality electronics, fashion, and home goods through a seamless online shopping experience.
*   **Headquarters**: Global distributed team with major hubs in Berlin (Germany), San Francisco (USA), and Shenzhen (China).

## Support & Contact

*   **Support Contact**: support@developershub.com
*   **Support Hours**: 24/7 Live Chat & Email Support
*   **Phone Support**: +1 (800) 123-4567 (Mon-Fri, 9 AM - 6 PM EST)

---
© 2025 DevelopersHub Corporation
