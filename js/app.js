/* ==========================================================================
   JavaScript Functionality - Portfolio Website
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStickyHeader();
    initMobileMenu();
    initSkillsTabs();
    initProjectFilters();
    initScrollReveal();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();
});

/**
 * Theme Toggle Functionality (Dark / Light)
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        html.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Sticky Header Scroll Effect
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page was reloaded
}

/**
 * Mobile Navigation Toggle Menu
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * Skills Category Tabs Toggle
 */
function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle Active button class
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show matching content
            tabContents.forEach(content => {
                if (content.getAttribute('id') === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Filter System for Projects Showcase
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Active button class toggle
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    // Smooth transition animation
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display:none to let fadeout transition complete
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Scroll Reveal Effects using Intersection Observer
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // 10% visibility trigger
        rootMargin: '0px 0px -50px 0px' // offset bottom slightly for comfortable trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing after elements reveal once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Contact Form Client-side Validation & Submission Mock
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const submitSpinner = submitBtn.querySelector('.submit-spinner');
    const feedbackBox = document.getElementById('form-feedback');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateInput = (input, errorId, validatorFn) => {
        const group = input.parentElement;
        const isValid = validatorFn(input.value.trim());

        if (isValid) {
            group.classList.remove('error');
            return true;
        } else {
            group.classList.add('error');
            return false;
        }
    };

    // Live validation checks on blur
    nameInput.addEventListener('blur', () => validateInput(nameInput, 'name-error', val => val.length > 0));
    emailInput.addEventListener('blur', () => validateInput(emailInput, 'email-error', val => emailRegex.test(val)));
    subjectInput.addEventListener('blur', () => validateInput(subjectInput, 'subject-error', val => val.length > 0));
    messageInput.addEventListener('blur', () => validateInput(messageInput, 'message-error', val => val.length > 0));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform final sweeps validation
        const isNameValid = validateInput(nameInput, 'name-error', val => val.length > 0);
        const isEmailValid = validateInput(emailInput, 'email-error', val => emailRegex.test(val));
        const isSubjectValid = validateInput(subjectInput, 'subject-error', val => val.length > 0);
        const isMessageValid = validateInput(messageInput, 'message-error', val => val.length > 0);

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Disable button, show loading spinner
            submitBtn.disabled = true;
            submitSpinner.classList.remove('hidden');
            feedbackBox.classList.add('hidden');
            feedbackBox.className = 'form-feedback'; // reset state classes

            // Mock network API request
            setTimeout(() => {
                // Success output
                submitBtn.disabled = false;
                submitSpinner.classList.add('hidden');
                
                feedbackBox.classList.remove('hidden');
                feedbackBox.classList.add('success');
                feedbackBox.textContent = 'Thank you! Your message has been sent successfully.';
                
                form.reset();
            }, 1800);
        } else {
            feedbackBox.classList.remove('hidden');
            feedbackBox.classList.add('error');
            feedbackBox.textContent = 'Please correct the errors in the fields above before submitting.';
        }
    });
}

/**
 * Back To Top Button Handler
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Set initial state
    backToTopBtn.classList.add('hidden');
}

/**
 * Custom Smooth Anchor Link Navigation Scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(href);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
