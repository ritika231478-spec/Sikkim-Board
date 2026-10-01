document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Active Page Highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }
    
    // Enhanced Card Animations
    const animatedCards = document.querySelectorAll('.link-card, .news-card, .contact-card, .result-card, .exam-card, .counter-box');
    
    if (animatedCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        
        animatedCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            cardObserver.observe(card);
        });
    }
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < hero.offsetHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
    
    // Typing Effect for Hero Title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--accent)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Button loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Enhanced Notification System
    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 18px 28px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 420px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #38a169, #48bb78)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #e53e3e, #fc8181)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .notification-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }
    
    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn, .download-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.link-card, .contact-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                header.style.background = 'rgba(255,255,255,0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                header.style.background = 'var(--bg-white)';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // Image Lazy Loading with Fade Effect
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Ripple Effect on Buttons
    document.querySelectorAll('.btn, .download-btn, .link-card').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${e.clientX - rect.left - 50}px;
                top: ${e.clientY - rect.top - 50}px;
                animation: ripple 0.6s ease-out;
                transform: scale(0);
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // Text Glow Effect on Hover
    document.querySelectorAll('.section-title h2, .hero h1').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(26,54,93,0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    // ==========================================================================
    // Hero Banner Slider (Continuous Automatic Sliding & Infinite Carousel)
    // ==========================================================================
    function initBannerSlider() {
        const slider = document.getElementById('bannerSlider');
        const track = document.getElementById('bannerTrack');
        const prevBtn = document.getElementById('sliderPrev');
        const nextBtn = document.getElementById('sliderNext');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (!slider || !track) return;
        
        const originalSlides = Array.from(track.querySelectorAll('.banner-slide'));
        const totalOriginal = originalSlides.length;
        if (totalOriginal === 0) return;
        
        // Clone first and last slides for seamless infinite loop
        const firstClone = originalSlides[0].cloneNode(true);
        const lastClone = originalSlides[totalOriginal - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        
        track.appendChild(firstClone);
        track.insertBefore(lastClone, originalSlides[0]);
        
        let currentIndex = 1; // Start at first real slide (index 1)
        let isTransitioning = false;
        let autoSlideTimer = null;
        const slideInterval = 3500; // Auto-slides every 3.5 seconds
        const transitionDuration = '0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        
        // Initial setup without animation
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        void track.offsetWidth;
        updateDots(0);
        
        function updateDots(activeOriginalIndex) {
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeOriginalIndex);
            });
        }
        
        function getOriginalIndex() {
            if (currentIndex === 0) return totalOriginal - 1;
            if (currentIndex === totalOriginal + 1) return 0;
            return currentIndex - 1;
        }
        
        let transitionSafetyTimeout = null;

        function handleTransitionEnd(e) {
            if (e && e.target !== track) return;
            clearTimeout(transitionSafetyTimeout);
            isTransitioning = false;

            if (currentIndex >= totalOriginal + 1) {
                // Reached end clone -> jump seamlessly to first real slide
                track.style.transition = 'none';
                currentIndex = 1;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                void track.offsetWidth;
            } else if (currentIndex <= 0) {
                // Reached start clone -> jump seamlessly to last real slide
                track.style.transition = 'none';
                currentIndex = totalOriginal;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                void track.offsetWidth;
            }
            updateDots(getOriginalIndex());
        }

        track.addEventListener('transitionend', handleTransitionEnd);
        track.addEventListener('transitioncancel', handleTransitionEnd);

        function moveToSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex = index;
            track.style.transition = `transform ${transitionDuration}`;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots(getOriginalIndex());

            clearTimeout(transitionSafetyTimeout);
            transitionSafetyTimeout = setTimeout(() => {
                if (isTransitioning) {
                    handleTransitionEnd();
                }
            }, 900);
        }
        
        function slideNext() {
            moveToSlide(currentIndex + 1);
        }
        
        function slidePrev() {
            moveToSlide(currentIndex - 1);
        }
        
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideTimer = setInterval(slideNext, slideInterval);
        }
        
        function stopAutoSlide() {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
                autoSlideTimer = null;
            }
        }
        
        // Arrow Buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                slideNext();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                slidePrev();
                startAutoSlide();
            });
        }
        
        // Dots
        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIndex = parseInt(dot.getAttribute('data-slide'), 10) + 1;
                moveToSlide(targetIndex);
                startAutoSlide();
            });
        });
        
        // Tab Visibility handling: pause when hidden, resume when returning to tab
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });

        // Window resize / orientation change handling
        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            void track.offsetWidth;
        });
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        slider.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                const diffX = touchEndX - touchStartX;
                const diffY = touchEndY - touchStartY;
                
                // Only trigger if horizontal swipe is dominant and exceeds threshold
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
                    if (diffX < 0) {
                        slideNext();
                    } else {
                        slidePrev();
                    }
                    startAutoSlide();
                }
            }
        }, { passive: true });

        slider.addEventListener('touchcancel', () => {
            touchStartX = 0;
            touchStartY = 0;
        }, { passive: true });
        
        // Keyboard arrow support
        slider.setAttribute('tabindex', '0');
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                slidePrev();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                slideNext();
                startAutoSlide();
            }
        });
        
        // Start automatic sliding immediately
        startAutoSlide();
    }
    
    initBannerSlider();
});
