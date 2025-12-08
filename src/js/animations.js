/* =====================================================
   PREMIUM ANIMATIONS & EFFECTS - JavaScript Controller
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL-TRIGGERED ANIMATIONS =====
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-rotate, .reveal-up'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // ===== AUTO-ADD ANIMATION CLASSES TO SECTIONS =====
    const sections = document.querySelectorAll('section, .block-items-section, .sale-section, .newsletter-section');
    sections.forEach((section, index) => {
        if (!section.classList.contains('animate-on-scroll')) {
            section.classList.add('animate-on-scroll');
            section.classList.add(`stagger-${Math.min(index + 1, 4)}`);
            animationObserver.observe(section);
        }
    });

    // ===== ANIMATE CARDS WITH STAGGER (excluding hero section cards) =====
    const cards = document.querySelectorAll('.product-card, .item-card, .tech-product-card');
    cards.forEach((card, index) => {
        // Skip cards that are inside the hero section
        if (!card.closest('.hero-section') && !card.closest('.hero-side-cards')) {
            card.classList.add('animate-on-scroll', 'hover-lift');
            card.style.transitionDelay = `${(index % 8) * 0.1}s`;
            animationObserver.observe(card);
        }
    });

    // ===== 3D TILT EFFECT ON CARDS (excluding hero section) =====
    const tiltCards = document.querySelectorAll('.product-card, .item-card');
    
    tiltCards.forEach(card => {
        // Skip cards inside hero section
        if (card.closest('.hero-section') || card.closest('.hero-side-cards')) return;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== MAGNETIC BUTTON EFFECT =====
    const magneticBtns = document.querySelectorAll('.search-button, .src-btn, .join-now-button, .login-button, .buy-now-btn');
    
    magneticBtns.forEach(btn => {
        btn.classList.add('magnetic-btn', 'ripple-btn', 'shine-btn');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ===== RIPPLE EFFECT ON CLICK =====
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button, .action-item, .nav-links a');
        if (!btn) return;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

    // ===== ADD RIPPLE KEYFRAME =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== SMOOTH PARALLAX SCROLLING (excluding hero section) =====
    const parallaxElements = document.querySelectorAll('.block-image-column img');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.2;
                const yPos = (scrollY - rect.top) * speed;
                element.style.transform = `translateY(${Math.min(yPos, 50)}px)`;
            }
        });
    }, { passive: true });

    // ===== NAVBAR ANIMATION ON SCROLL =====
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'none';
        }
        
        // Hide/show on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease';

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-number, .counter-value');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== PAGE FADE-IN ON LOAD (Hero section stays as-is) =====
    // The hero section is not modified - only the page gets a fade-in effect

    // ===== IMAGE LAZY LOADING WITH FADE =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // ===== HOVER UNDERLINE EFFECT ON LINKS =====
    const navLinks = document.querySelectorAll('.nav-links a, .footer-column a');
    navLinks.forEach(link => {
        if (!link.classList.contains('all-category-link')) {
            link.classList.add('underline-hover');
        }
    });

    // ===== CART ICON ANIMATION =====
    const cartIcon = document.querySelector('.action-item.cart');
    if (cartIcon) {
        cartIcon.classList.add('cart-shake');
    }

    // ===== WISHLIST HEART ANIMATION =====
    const wishlistBtns = document.querySelectorAll('.wishlist-btn, .action-item.orders');
    wishlistBtns.forEach(btn => {
        btn.classList.add('heartbeat');
    });

    // ===== PAGE LOAD ANIMATION =====
    document.body.classList.add('page-transition');

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== CURSOR GLOW EFFECT (OPTIONAL) =====
    const createCursorGlow = () => {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(13, 110, 253, 0.15) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            mix-blend-mode: screen;
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    };

    // Enable cursor glow on desktop only
    if (window.innerWidth > 768) {
        createCursorGlow();
    }

    // ===== NOTIFICATION TOAST SYSTEM =====
    window.showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type} notification-slide`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#198754' : type === 'error' ? '#dc3545' : '#0d6efd'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        toast.innerHTML = `<span style="font-size: 1.2em;">${icon}</span> ${message}`;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'notificationSlide 0.5s ease reverse';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // ===== ADD TO CART ANIMATION =====
    document.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.buy-now-btn, .product-buy-btn');
        if (buyBtn) {
            // Create flying cart item
            const flyingItem = document.createElement('div');
            flyingItem.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: #0d6efd;
                border-radius: 50%;
                z-index: 10000;
                pointer-events: none;
            `;
            
            const btnRect = buyBtn.getBoundingClientRect();
            const cartRect = document.querySelector('.action-item.cart')?.getBoundingClientRect();
            
            if (cartRect) {
                flyingItem.style.left = btnRect.left + btnRect.width / 2 + 'px';
                flyingItem.style.top = btnRect.top + 'px';
                
                document.body.appendChild(flyingItem);
                
                flyingItem.animate([
                    { 
                        transform: 'scale(1)',
                        left: btnRect.left + btnRect.width / 2 + 'px',
                        top: btnRect.top + 'px',
                        opacity: 1
                    },
                    { 
                        transform: 'scale(0.5)',
                        left: cartRect.left + cartRect.width / 2 + 'px',
                        top: cartRect.top + 'px',
                        opacity: 0
                    }
                ], {
                    duration: 800,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => {
                    flyingItem.remove();
                    // Shake cart icon
                    const cartIcon = document.querySelector('.action-item.cart');
                    if (cartIcon) {
                        cartIcon.style.animation = 'cartShake 0.5s ease';
                        setTimeout(() => cartIcon.style.animation = '', 500);
                    }
                };
            }
            
            // Show toast
            window.showToast('Added to cart successfully!', 'success');
        }
    });

    // ===== LOADING STATE FOR IMAGES =====
    const images = document.querySelectorAll('.product-image img, .card-image img');
    images.forEach(img => {
        const wrapper = img.parentElement;
        wrapper.classList.add('zoom-container');
        
        if (!img.complete) {
            wrapper.classList.add('skeleton');
            img.addEventListener('load', () => {
                wrapper.classList.remove('skeleton');
            });
        }
    });

    // Hero section cards (promo-card, user-greeting-card) are kept without animations
    // to maintain the original design as per the reference image

    console.log('🎨 Premium Animations Loaded Successfully!');
});
