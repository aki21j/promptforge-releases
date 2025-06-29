// PromptForge Website JavaScript - Modern Version
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Modern Feature Interface Tabs
    const interfaceTabs = document.querySelectorAll('.interface-tabs .tab-btn');
    const featurePanels = document.querySelectorAll('.feature-panel');
    
    interfaceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPanel = this.getAttribute('data-panel');
            
            // Remove active class from all tabs and panels
            interfaceTabs.forEach(t => t.classList.remove('active'));
            featurePanels.forEach(p => p.style.display = 'none');
            
            // Add active class to clicked tab and show corresponding panel
            this.classList.add('active');
            const targetElement = document.getElementById(targetPanel);
            if (targetElement) {
                targetElement.style.display = 'block';
            }
        });
    });
    
    // Auto-cycle through feature panels
    let currentPanelIndex = 0;
    const interfaceTabButtons = document.querySelectorAll('.interface-tabs .tab-btn');
    
    function cycleFeaturePanel() {
        if (interfaceTabButtons.length > 0) {
            interfaceTabButtons[currentPanelIndex].click();
            currentPanelIndex = (currentPanelIndex + 1) % interfaceTabButtons.length;
        }
    }
    
    // Start auto-cycling after 7 seconds, then every 5 seconds
    let autoCycleInterval;
    function startAutoCycle() {
        autoCycleInterval = setInterval(cycleFeaturePanel, 5000);
    }
    
    function stopAutoCycle() {
        if (autoCycleInterval) {
            clearInterval(autoCycleInterval);
        }
    }
    
    // Start auto-cycling after initial delay
    setTimeout(startAutoCycle, 7000);
    
    // Stop auto-cycling when user interacts with tabs
    interfaceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            stopAutoCycle();
            // Restart after 10 seconds of inactivity
            setTimeout(startAutoCycle, 10000);
        });
    });
    
    // Tab functionality for demo section
    const demoTabs = document.querySelectorAll('.demo .tab-btn');
    const demoContent = document.querySelectorAll('.demo .tab-content');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            demoTabs.forEach(t => t.classList.remove('active'));
            demoContent.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Tab functionality for install section
    const installTabs = document.querySelectorAll('.install .tab-btn');
    const installContent = document.querySelectorAll('.install .tab-content');
    
    installTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            installTabs.forEach(t => t.classList.remove('active'));
            installContent.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            // Use modern clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyFeedback(this);
                }).catch(() => {
                    fallbackCopyText(textToCopy, this);
                });
            } else {
                fallbackCopyText(textToCopy, this);
            }
        });
    });
    
    function fallbackCopyText(text, button) {
        // Create temporary textarea for fallback copy
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (err) {
            console.error('Copy failed:', err);
        }
        
        document.body.removeChild(textarea);
    }
    
    function showCopyFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for feature cards
                if (entry.target.classList.contains('feature-card-modern')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.animationDelay = '0ms';
                        entry.target.classList.add('animate-in');
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card-modern, .quickstart-card, .demo-image, .metric-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Terminal typing animation restart
    const typingElements = document.querySelectorAll('.typing-animation');
    
    function restartTypingAnimation() {
        typingElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = 'typing 3s steps(40, end), blink-caret 0.75s step-end infinite';
        });
    }
    
    // Restart typing animation every 12 seconds
    setInterval(restartTypingAnimation, 12000);
    
    // Enhanced prompt item interactions
    const promptItems = document.querySelectorAll('.prompt-item');
    
    promptItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Search result interactions
    const searchResults = document.querySelectorAll('.search-result');
    
    searchResults.forEach(result => {
        result.addEventListener('click', function() {
            // Add subtle feedback for clicks
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Metric card hover effects
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const value = this.querySelector('.metric-value');
            value.style.transform = 'scale(1.1)';
            value.style.color = '#4338ca';
        });
        
        card.addEventListener('mouseleave', function() {
            const value = this.querySelector('.metric-value');
            value.style.transform = 'scale(1)';
            value.style.color = '';
        });
    });
    
    // Form validation and handling (if forms are added later)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                // Add actual form handling logic here
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // Track Core Web Vitals if supported
            if ('PerformanceObserver' in window) {
                try {
                    const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            console.log(`${entry.name}: ${entry.value}`);
                        }
                    });
                    observer.observe({entryTypes: ['measure']});
                } catch (e) {
                    // Silently fail if not supported
                }
            }
        });
    }
    
    // Error tracking
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Add error reporting logic here
    });
    
    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when service worker is ready
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC to close any open modals or panels
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
        
        // Arrow keys for feature panel navigation
        if (e.target === document.body) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const currentActive = document.querySelector('.interface-tabs .tab-btn.active');
                if (currentActive) {
                    const tabs = Array.from(document.querySelectorAll('.interface-tabs .tab-btn'));
                    const currentIndex = tabs.indexOf(currentActive);
                    let nextIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    } else {
                        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    tabs[nextIndex].click();
                    e.preventDefault();
                }
            }
        }
    });
});

// Additional CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
    
    @media (prefers-color-scheme: dark) {
        .navbar.scrolled {
            background: rgba(15, 23, 42, 0.95);
        }
    }
    
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .feature-card-modern {
        animation-fill-mode: both;
    }
    
    .prompt-item,
    .search-result,
    .metric-card {
        transition: all 0.3s ease;
    }
    
    .variable {
        transition: all 0.3s ease;
    }
    
    .variable:hover {
        background: var(--primary-hover);
        transform: scale(1.05);
    }
    
    .interface-nav .nav-item:hover {
        color: var(--primary-color);
        cursor: pointer;
    }
    
    .action-btn:active {
        transform: scale(0.95);
    }
    
    .tab-btn:active {
        transform: scale(0.98);
    }
    
    /* Smooth transitions for all interactive elements */
    .prompt-item,
    .search-result,
    .metric-card,
    .feature-card-modern,
    .quickstart-card,
    .variable-item {
        will-change: transform;
    }
    
    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .typing-animation {
            animation: none;
            border-right: none;
        }
    }
`;

document.head.appendChild(style);