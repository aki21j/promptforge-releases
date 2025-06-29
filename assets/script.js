// PromptForge Website JavaScript - Phase 1
// Navigation and foundational interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVIGATION FUNCTIONALITY
    // ==========================================
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.contains('active');
            
            // Toggle mobile menu
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            mobileMenuToggle.setAttribute('aria-expanded', !isActive);
            
            // Prevent body scrolling when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==========================================
    // NAVBAR SCROLL EFFECTS
    // ==========================================
    
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for enhanced styling
        if (scrollTop > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up (for mobile primarily)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    // Throttle scroll events for performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    
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
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    
    // Highlight active navigation item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    
    function highlightActiveSection() {
        const scrollPos = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinksArray.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = navLinksArray.find(link => 
                    link.getAttribute('href') === `#${sectionId}`
                );
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttle scroll events for active section highlighting
    let highlightTicking = false;
    window.addEventListener('scroll', function() {
        if (!highlightTicking) {
            requestAnimationFrame(highlightActiveSection);
            highlightTicking = true;
        }
    });
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    
    // Set up intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 100}ms`;
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.animate-on-scroll, section > .container > *');
    animateElements.forEach(el => observer.observe(el));
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            // Ensure focus is visible for keyboard users
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // ==========================================
    // PERFORMANCE MONITORING
    // ==========================================
    
    // Monitor page load performance
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // Monitor Core Web Vitals if supported
            if ('PerformanceObserver' in window) {
                try {
                    const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            // Log performance metrics (in production, send to analytics)
                            console.log(`${entry.name}: ${entry.value}`);
                        }
                    });
                    observer.observe({entryTypes: ['measure', 'navigation']});
                } catch (e) {
                    // Silently fail if not supported
                }
            }
        });
    }
    
    // ==========================================
    // ERROR HANDLING
    // ==========================================
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // In production, send errors to monitoring service
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        // In production, send errors to monitoring service
    });
    
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    // Debounce function for performance optimization
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ==========================================
    // WINDOW RESIZE HANDLING
    // ==========================================
    
    // Handle window resize events
    const handleResize = debounce(function() {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
        
        // Reset navbar transform on desktop
        if (window.innerWidth > 768) {
            navbar.style.transform = 'translateY(0)';
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // ==========================================
    // TERMINAL DEMO INTERACTIONS
    // ==========================================
    
    // Terminal button interactions
    const terminalButtons = document.querySelectorAll('.terminal-button');
    
    terminalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate different actions
            if (this.classList.contains('close')) {
                // Add close animation
                const terminal = this.closest('.terminal-window');
                terminal.style.transform = 'scale(0.95)';
                terminal.style.opacity = '0.8';
                setTimeout(() => {
                    terminal.style.transform = '';
                    terminal.style.opacity = '';
                }, 300);
            }
        });
    });
    
    // Restart terminal animation on intersection
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const typingCommand = entry.target.querySelector('.typing-command');
                if (typingCommand) {
                    // Restart typing animation
                    typingCommand.style.animation = 'none';
                    typingCommand.offsetHeight; // Trigger reflow
                    typingCommand.style.animation = 'typing 2s steps(40, end) 0.5s forwards, blinkCaret 0.75s step-end infinite 0.5s';
                }
                
                // Restart line animations
                const terminalLines = entry.target.querySelectorAll('.terminal-line');
                terminalLines.forEach((line, index) => {
                    line.style.animation = 'none';
                    line.offsetHeight; // Trigger reflow
                    line.style.animation = `terminalLineAppear 0.8s ease-out forwards`;
                    line.style.animationDelay = `${(index + 1) * 0.5 + 1}s`;
                });
            }
        });
    }, { threshold: 0.5 });
    
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        terminalObserver.observe(terminalWindow);
    }
    
    // ==========================================
    // HERO SECTION INTERACTIONS
    // ==========================================
    
    // Hero CTA button interactions
    const heroCTAs = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary');
    
    heroCTAs.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('btn-hero-primary') ? 'translateY(-2px)' : 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = this.classList.contains('btn-hero-primary') ? 'translateY(-2px)' : 'translateY(-1px)';
        });
    });
    
    // Hero stats animation on scroll
    const heroStats = document.querySelectorAll('.hero-stat');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    heroStats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
        statsObserver.observe(stat);
    });
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    // Set initial ARIA attributes
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'navigation-menu');
    }
    
    if (navLinks) {
        navLinks.setAttribute('id', 'navigation-menu');
    }
    
    // Initial call to highlight active section
    highlightActiveSection();
    
    // ==========================================
    // IDE FEATURE TABS FUNCTIONALITY
    // ==========================================
    
    // IDE Feature tabs switching
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanels = document.querySelectorAll('.ide-feature-panel');
    
    function switchFeaturePanel(targetPanelId) {
        // Hide all panels
        featurePanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Remove active class from all tabs
        featureTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show target panel
        const targetPanel = document.getElementById(targetPanelId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        
        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-feature="${targetPanelId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    // Add click handlers to feature tabs
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPanel = this.getAttribute('data-feature');
            if (targetPanel) {
                switchFeaturePanel(targetPanel);
                
                // Stop auto-cycling when user interacts
                stopFeatureAutoCycle();
                
                // Restart auto-cycling after delay
                setTimeout(() => {
                    startFeatureAutoCycle();
                }, 10000); // Restart after 10 seconds of inactivity
            }
        });
    });
    
    // Auto-cycling functionality for feature panels
    let featureAutoCycleInterval;
    let currentFeatureIndex = 0;
    const featurePanelIds = ['save-panel', 'template-panel', 'search-panel', 'analytics-panel'];
    
    function cycleToNextFeature() {
        switchFeaturePanel(featurePanelIds[currentFeatureIndex]);
        currentFeatureIndex = (currentFeatureIndex + 1) % featurePanelIds.length;
    }
    
    function startFeatureAutoCycle() {
        if (featureAutoCycleInterval) {
            clearInterval(featureAutoCycleInterval);
        }
        featureAutoCycleInterval = setInterval(cycleToNextFeature, 4000); // Switch every 4 seconds
    }
    
    function stopFeatureAutoCycle() {
        if (featureAutoCycleInterval) {
            clearInterval(featureAutoCycleInterval);
            featureAutoCycleInterval = null;
        }
    }
    
    // Start auto-cycling after initial delay (only if feature tabs exist)
    if (featureTabs.length > 0) {
        setTimeout(() => {
            startFeatureAutoCycle();
        }, 5000); // Start after 5 seconds
    }
    
    // ==========================================
    // IDE INTERFACE INTERACTIONS
    // ==========================================
    
    // IDE window controls interactions
    const ideControls = document.querySelectorAll('.ide-control');
    
    ideControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate different actions
            if (this.classList.contains('close')) {
                // Add close animation to IDE showcase
                const ideShowcase = this.closest('.ide-showcase');
                if (ideShowcase) {
                    ideShowcase.style.transform = 'scale(0.98)';
                    ideShowcase.style.opacity = '0.8';
                    setTimeout(() => {
                        ideShowcase.style.transform = '';
                        ideShowcase.style.opacity = '';
                    }, 300);
                }
            }
        });
    });
    
    // Editor tab interactions
    const editorTabs = document.querySelectorAll('.editor-tab');
    
    editorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all editor tabs
            editorTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Add subtle feedback
            this.style.transform = 'translateY(-1px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // File explorer interactions
    const explorerItems = document.querySelectorAll('.explorer-item');
    
    explorerItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all explorer items
            explorerItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add visual feedback
            this.style.backgroundColor = 'var(--brand-100)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // Terminal actions in IDE
    const terminalActions = document.querySelectorAll('.terminal-action');
    
    terminalActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // ==========================================
    // DEMO SECTION FUNCTIONALITY
    // ==========================================
    
    // Demo tab switching
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoContents = document.querySelectorAll('.demo-content');
    
    function switchDemo(targetDemo) {
        // Hide all demo contents
        demoContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Remove active class from all tabs
        demoTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show target demo
        const targetContent = document.getElementById(`${targetDemo}-demo`);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.style.animation = 'fadeIn 0.5s ease-in-out';
        }
        
        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-demo="${targetDemo}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Restart typing animations for CLI demo
        if (targetDemo === 'cli') {
            restartTypingAnimation();
        }
    }
    
    // Add click handlers to demo tabs
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDemo = this.getAttribute('data-demo');
            if (targetDemo) {
                switchDemo(targetDemo);
            }
        });
    });
    
    // Restart typing animation function
    function restartTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing-demo');
        typingElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = 'typing 4s steps(80, end) 1s forwards, blinkCaret 0.75s step-end infinite 1s';
        });
    }
    
    // Auto-cycle demo tabs (optional)
    let demoAutoCycleInterval;
    let currentDemoIndex = 0;
    const demoOrder = ['cli', 'vscode', 'mcp'];
    
    function cycleDemos() {
        currentDemoIndex = (currentDemoIndex + 1) % demoOrder.length;
        switchDemo(demoOrder[currentDemoIndex]);
    }
    
    function startDemoAutoCycle() {
        if (demoAutoCycleInterval) {
            clearInterval(demoAutoCycleInterval);
        }
        demoAutoCycleInterval = setInterval(cycleDemos, 8000); // Switch every 8 seconds
    }
    
    function stopDemoAutoCycle() {
        if (demoAutoCycleInterval) {
            clearInterval(demoAutoCycleInterval);
            demoAutoCycleInterval = null;
        }
    }
    
    // Start auto-cycling after initial delay (only if demo tabs exist)
    if (demoTabs.length > 0) {
        setTimeout(() => {
            startDemoAutoCycle();
        }, 10000); // Start after 10 seconds
        
        // Stop auto-cycling when user interacts with tabs
        demoTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                stopDemoAutoCycle();
                // Restart after 15 seconds of inactivity
                setTimeout(() => {
                    startDemoAutoCycle();
                }, 15000);
            });
        });
    }
    
    // VSCode Extension Demo Interactions
    const vscodeControls = document.querySelectorAll('.vscode-control');
    const fileItems = document.querySelectorAll('.file-item');
    const promptItems = document.querySelectorAll('.prompt-item');
    const paletteResults = document.querySelectorAll('.palette-result');
    
    // VSCode window controls
    vscodeControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // File explorer interactions
    fileItems.forEach(item => {
        item.addEventListener('click', function() {
            fileItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Prompt list interactions
    promptItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Command palette interactions
    paletteResults.forEach(result => {
        result.addEventListener('click', function() {
            paletteResults.forEach(r => r.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Claude Code MCP Demo Interactions
    const mcpActions = document.querySelectorAll('.mcp-action');
    const promptResults = document.querySelectorAll('.prompt-result');
    
    // MCP action interactions
    mcpActions.forEach(action => {
        action.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Prompt result interactions
    promptResults.forEach(result => {
        result.addEventListener('click', function() {
            this.style.backgroundColor = 'var(--brand-100)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // Initialize demo section
    if (demoTabs.length > 0) {
        // Start with CLI demo active
        switchDemo('cli');
        
        // Start typing animation after small delay
        setTimeout(() => {
            restartTypingAnimation();
        }, 1500);
    }
    
    // Log successful initialization
    console.log('PromptForge navigation, IDE interface, and demo section initialized successfully');
});

// ==========================================
// CSS ANIMATIONS (injected via JavaScript)
// ==========================================

const styles = `
/* Fade-in animation for scroll-triggered elements */
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

/* Keyboard navigation focus styles */
.keyboard-navigation *:focus {
    outline: 2px solid var(--brand-500) !important;
    outline-offset: 2px !important;
}

/* Enhanced navbar transitions */
.navbar {
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Mobile menu slide animation */
.nav-links {
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.nav-links.active {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Improved button interactions */
.nav-cta {
    transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.nav-cta:hover {
    transform: translateY(-1px);
}

.nav-cta:active {
    transform: translateY(0);
}

/* Smooth brand hover effect */
.nav-brand {
    transition: transform 0.2s ease;
}

.nav-brand:hover {
    transform: translateY(-1px);
}

/* Enhanced mobile menu toggle animation */
.mobile-menu-toggle span {
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .animate-in {
        animation: none;
        opacity: 1;
        transform: none;
    }
}

/* High contrast mode enhancements */
@media (prefers-contrast: high) {
    .nav-link::after {
        height: 3px;
    }
    
    .nav-cta {
        border: 2px solid currentColor;
    }
}

/* Print styles */
@media print {
    .navbar,
    .mobile-menu-toggle {
        display: none !important;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);