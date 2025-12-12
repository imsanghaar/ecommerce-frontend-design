# DevelopersHub E-commerce Frontend

A modern, responsive e-commerce web application featuring a comprehensive user interface, client-side authentication, product management, and shopping cart functionality.

## Project Overview

This project is a frontend implementation of an e-commerce platform designed to provide a premium user experience. It includes essential features such as user registration, product browsing, detailed product views, and a persistent shopping cart using LocalStorage.

## Key Features

### 1. User Authentication
*   **Sign Up & Login**: Custom forms with validation and animations.
*   **Profile Management**: Profile picture upload (Base64), username, and email storage.
*   **Persistence**: User session and data are stored in the browser's `localStorage`, allowing data to persist across refreshes.
*   **Password Recovery**: Simulated "Forgot Password" functionality.

### 2. Product Experience
*   **Homepage**: Dynamic hero section that welcomes logged-in users.
*   **Product Listings**: Filterable grids for Electronics (Tech), Clothing, and Home Interiors.
*   **Product Details**: Comprehensive view with image galleries, pricing tiers, specifications, and "Add to Cart" functionality.
*   **Search**: Functional search bar for filtering products.

### 3. Shopping Cart & Orders
*   **Cart Management**: Add items, adjust quantities, and remove items.
*   **Checkout**: Simulated checkout process that creates order records.
*   **Order History**: "My Orders" page displaying past purchases dynamically.

### 4. UI/UX
*   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
*   **Animations**: Smooth transitions, loading spinners, and toast notifications.
*   **Icons & Typography**: Integrated Font Awesome 6 and Google Fonts (Inter).

### 5. Smart Features
*   **AI Chatbot**: Integrated **ElevenLabs Convai** widget for interactive voice and text support on all pages.

## File Structure

```
/
├── index.html              # Main Entry Point (Homepage)
├── README.md               # Project Documentation
└── src/
    ├── html/               # HTML Pages
    │   ├── signup.html
    │   ├── login.html
    │   ├── profile.html
    │   ├── orders.html
    │   ├── cart.html
    │   ├── products.html
    │   ├── product-detail.html
    │   ├── clothing.html
    │   ├── tech.html
    │   └── ...
    ├── css/                # Stylesheets
    │   ├── style.css       # Core Styles
    │   ├── auth.css        # Authentication Styles
    │   ├── product-detail.css
    │   └── animations.css
    ├── js/                 # JavaScript Logic
    │   ├── script.js       # Global Scripts
    │   ├── auth.js         # Auth & User Management
    │   ├── cart.js         # Cart Functionality
    │   ├── products.js     # Product Data & Rendering
    │   ├── product-detail.js
    │   └── ...
    └── assets/             # Images and Icons
```

## How to Run

1.  **Clone or Download** the repository.
2.  **Open** the project folder in your code editor (e.g., VS Code).
3.  **Launch** `index.html` in your browser.
    *   Recommended: Use the "Live Server" extension in VS Code for the best experience.
    *   Or simply double-click `index.html` to open it.

## Technologies Used

*   **HTML5**: Semantic structure.
*   **CSS3**: Custom styling, Flexbox, Grid, and Animations.
*   **JavaScript (ES6+)**: DOM manipulation, LocalStorage logic, Event handling.
*   **Font Awesome**: UI Icons.
*   **Google Fonts**: Typography.

## Developer Notes

*   **Data Storage**: Since there is no backend, all data (users, cart, orders) is stored in your browser's LocalStorage. Clearing your browser cache will reset the application data.
*   **Chatbot**: The site integrates an external **ElevenLabs Convai Widget** (`agent_5401kc8f5b2eeqbs7tfxz4d9yqmq`). Ensure you have internet access for the widget to load appropriately.

---
© 2025 DevelopersHub Corporation
