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
    initProjectModals();
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
                const categoryAttr = card.getAttribute('data-category') || '';
                const categories = categoryAttr.split(' ');

                if (filterValue === 'all' || categories.includes(filterValue)) {
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

/**
 * Project Details Modal Functionality
 */
const projectDetailsData = {
    'sales-forecasting': {
        title: 'Time Series Sales Forecasting (Machine Learning)',
        category: 'Machine Learning & Retail Analytics',
        status: 'Completed (4-Month Project)',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        role: 'Solo Project — Built end-to-end from data exploration through ML model benchmarking',
        problem: 'Retail demand forecasting is notoriously volatile due to promotional calendar events, store-level seasonality, and intermittent demand patterns. Predicting sales accuracy directly reduces stockouts and inventory holding costs.',
        approach: 'Utilized the Kaggle M5 (Walmart) hierarchical retail sales dataset. Implemented in-depth exploratory data analysis (EDA), calendar feature engineering (lagged sales, rolling window statistics, holiday effects, price discounting metrics), and trained LightGBM and baseline time-series models benchmarked against top public solutions.',
        features: [
            'Hierarchical sales forecasting across stores, departments, and product categories.',
            'Custom rolling statistical features (7-day, 28-day moving averages and standard deviations).',
            'Evaluation using Weighted Root Mean Squared Scaled Error (WRMSSE) and RMSE metrics.',
            'Business impact analysis highlighting reduction in retail supply chain inventory waste.'
        ],
        tags: ['Python', 'Jupyter Notebook', 'Machine Learning', 'Time Series', 'Pandas', 'NumPy', 'LightGBM', 'Kaggle M5'],
        github: 'https://github.com/Imashaidk/sales-forecasting-project',
        demo: null
    },
    'machine-repair': {
        title: 'SDP — Industrial Machine Repairing Management System',
        category: 'Systems Design & Business Analysis',
        status: 'BA Case Study & System',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        role: 'End-to-End Requirements Gathering, As-Is/To-Be Process Mapping, System Scope & Presentation',
        problem: 'Industrial heavy-machinery component repair and manufacturing workshops often rely on manual, paper-based job intake, leading to lost job tracking, delayed turnaround estimates, untracked spare parts consumption, and invoicing discrepancies.',
        approach: 'Conducted stakeholder interviews and full business-analyst analysis to map the legacy paper workflow into a streamlined digital pipeline. Formulated problem statements, use case specifications, domain ER models, and relational database schemas in MySQL.',
        features: [
            'Digital Job Intake with diagnostic failure capture and client verification.',
            'Live Machine Repair Tracking through technician workflow stages.',
            'Auto-Suggested Completion Dates based on workshop capacity and job priority.',
            'Item-linked repair history searchable by customer and machine serial number.',
            'Costing & Billing module featuring optional quotation stages and parts settlement.'
        ],
        tags: ['Business Analysis', 'UML Modelling', 'Process Mapping', 'MySQL', 'ER Diagrams', 'Costing & Billing', 'REST APIs'],
        github: 'https://github.com/Imashaidk',
        demo: null
    },
    'taskify': {
        title: 'Taskify — Full-Stack Task Management System',
        category: 'Web Applications & Real-Time Systems',
        status: 'Coursework Project (Web Apps Dev)',
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
        role: 'Frontend & UI Lead (Member 4 of 5) — Built and redesigned all 8 pages into a consistent Stripe-inspired design system',
        problem: 'Team collaboration tools often suffer from cluttered interfaces, lack of real-time state synchronization, and clunky role management across sprint cycles.',
        approach: 'Architected a responsive single-page application using React 19 and Vite with a FastAPI/Node backend and TiDB/MySQL cloud database. Implemented real-time event synchronization via Socket.IO and secure JWT token authentication.',
        features: [
            'Unified Stripe-inspired design system with cohesive tokens across all 8 application views.',
            'Real-time notification toasts powered by Socket.IO WebSocket streams.',
            'Role-based task assignment with backlog, sprint planning, and Kanban status tracking.',
            'Solved critical technical roadblocks: resolved bcrypt compatibility, migrated Tailwind v4 to v3, repaired CI pipelines, and resolved complex branch merge conflicts.'
        ],
        tags: ['React 19', 'Vite', 'Tailwind CSS', 'FastAPI', 'MySQL (TiDB)', 'Docker Compose', 'Socket.IO', 'JWT Auth'],
        github: 'https://github.com/Imashaidk/task-management-system',
        demo: null
    },
    'aquagrow': {
        title: 'AquaGrow — Smart Hydroponic Home-Growing System',
        category: 'Product Strategy & IoT Appliance',
        status: 'INCO 12.0 Exhibition Showcase',
        image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1200&q=80',
        role: 'Design, Branding & Marketing Lead (Team Futurix)',
        problem: 'Urban households lack space and agricultural expertise to grow fresh, pesticide-free produce at home, while existing commercial hydroponics are overly complex and expensive.',
        approach: 'Developed for the INCO 12.0 National Exhibition. Collaborated with a 6-member team to formulate an end-to-end commercialization and 7Ps marketing strategy, design the visual brand identity, deploy the web presence on Vercel, and model market feasibility.',
        features: [
            'Complete Brand Identity system (custom charcoal, mint green, and teal aesthetic).',
            'Print-ready product collateral, setup grow booklets, and gate-fold brochures.',
            'Structured Social Media Content Calendar and digital Go-To-Market campaigns.',
            'Presented and showcased to industry stakeholders at the INCO 12.0 National Exhibition.'
        ],
        tags: ['Brand Identity', '7Ps Strategy', 'Financial Modeling', 'IoT Hydroponics', 'Canva', 'Vercel', 'Team Futurix', 'INCO 12.0'],
        github: 'https://github.com/Imashaidk',
        demo: 'https://aqua-grow-taupe.vercel.app'
    },
    'ceylink': {
        title: 'Ceylink — Digital Marketplace for Sri Lankan Tea Sellers',
        category: 'Product Strategy & Digital Platform',
        status: 'IdeaSprint 2025 Finalist',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
        role: 'IdeaSprint Finalist & Core Strategist (Team Sprintbusters)',
        problem: 'Sri Lankan smallholder tea growers and regional sellers face severe price exploitation and opacity from traditional middleman supply chains, reducing grower profitability.',
        approach: 'Formulated a comprehensive digital marketplace venture model with Team Sprintbusters for IdeaSprint 2025. Designed a direct-to-buyer digital trade platform offering transparent market pricing, direct batch verification, and logistics routing.',
        features: [
            'End-to-end digital marketplace business model and platform architecture.',
            'Value chain disintermediation strategy empowering regional Sri Lankan tea smallholders.',
            'Financial feasibility and market scalability roadmap for tea export & domestic trade.',
            'Selected as a national Finalist at IdeaSprint 2025.'
        ],
        tags: ['Business Modeling', 'Digital Marketplace', 'Supply Chain', 'Strategy', 'IdeaSprint 2025', 'Team Sprintbusters'],
        github: 'https://github.com/Imashaidk',
        demo: null
    },
    'employee-attrition': {
        title: 'Employee Attrition Analytics & Retention Model',
        category: 'Business Analytics & Predictive Modeling',
        status: 'Active Repository',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        role: 'Solo Project — Problem Framing, Data Modeling, Feature Engineering & Strategy Recommendation',
        problem: 'High employee turnover imposes severe recruitment and institutional knowledge loss costs on modern enterprises. Identifying flight-risk factors early allows HR to deploy targeted retention interventions.',
        approach: 'Analyzed enterprise HR workforce datasets to uncover key churn drivers (overtime, job satisfaction, tenure, compensation disparities). Built machine learning classification models to predict individual attrition probability and formulated prescriptive retention strategies.',
        features: [
            'In-depth exploratory analysis on compensation, department-level turnover, and work-life balance.',
            'Predictive classification modeling flagging high-risk employee segments.',
            'Feature importance extraction translating model signals into actionable executive HR policies.',
            'Interactive analytics dashboard wireframes for talent management leadership.'
        ],
        tags: ['Python', 'Pandas', 'Scikit-Learn', 'HR Analytics', 'Classification', 'Business Strategy'],
        github: 'https://github.com/Imashaidk/employee-attrition-analytics',
        demo: null
    },
    'laptop-absa': {
        title: 'TrustSense — Aspect-Based Sentiment Analysis (NLP)',
        category: 'Natural Language Processing & AI',
        status: 'In Progress',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        role: 'Solo Project — Dataset Curation, Aspect Extraction Pipeline & Text Mining',
        problem: 'Aggregate star ratings conceal crucial product flaws (e.g., a laptop rated 4/5 overall might have a disastrous battery or overheating issue). Aspect-Based Sentiment Analysis provides granular, attribute-level insights.',
        approach: 'Curated a custom dataset containing 24,113 laptop customer reviews across 365 distinct computer models. Developed NLP pipelines using Python and Pandas to isolate specific product aspects (battery, display, keyboard, thermals) and evaluate polarity for each.',
        features: [
            'Targeted aspect extraction isolating hardware and build components.',
            'Polarity classification scoring customer sentiment by specific dimension.',
            'Product benchmarking tool comparing competing laptop models across key user criteria.'
        ],
        tags: ['Python', 'NLP', 'Pandas', 'Aspect Extraction', 'Text Mining', 'Sentiment Analysis'],
        github: 'https://github.com/Imashaidk/laptop-absa-project',
        demo: null
    },
    'sl-delivery': {
        title: 'Sri Lanka Delivery & Logistics Analytics',
        category: 'Operations Analytics & Supply Chain',
        status: 'Active Repository',
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80',
        role: 'Data Analysis, Route Optimization & Operational KPI Modeling',
        problem: 'Last-mile logistics in Sri Lanka face geographic bottlenecks, delivery route delays, and fuel cost variability that directly affect customer fulfillment SLAs.',
        approach: 'Analyzed regional delivery tracking logs using Python to evaluate dispatch efficiency, transit times, delivery success rates, and driver performance metrics across provinces.',
        features: [
            'Regional performance breakdown mapping lead times across Sri Lankan delivery corridors.',
            'Delay root-cause analysis distinguishing between dispatch bottlenecks and transit halts.',
            'Operational recommendations for courier route optimization and dispatch batching.'
        ],
        tags: ['Python', 'Pandas', 'Operations Management', 'Supply Chain Analytics', 'Data Visualization'],
        github: 'https://github.com/Imashaidk/SL-delivery-analytics',
        demo: null
    },
    'ecommerce': {
        title: 'NexGen Store — Full-Stack E-Commerce Platform',
        category: 'Full-Stack Web Development',
        status: 'Phases 1–10 Complete',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
        role: 'Full-Stack Architecture, RESTful API Design & Database Integration',
        problem: 'Demonstrating complete end-to-end commerce workflow from product catalog navigation and cart state management to database persistence and order checkout.',
        approach: 'Developed frontend with React and backend API endpoints using Node.js / Express connected to a relational MySQL database running in a local environment.',
        features: [
            'Dynamic product browsing with category filtering and instant search.',
            'Persistent shopping cart with live price calculations and stock limits.',
            'Modular checkout flow with customer order validation and database storage.'
        ],
        tags: ['React', 'Node.js', 'Express', 'MySQL', 'XAMPP', 'REST APIs'],
        github: 'https://github.com/Imashaidk/ecommerce-app',
        demo: null
    },
    'weather-app': {
        title: 'WeatherSense — Native Android App',
        category: 'Mobile Applications (Android)',
        status: 'Active Repository',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80',
        role: 'Mobile Architecture & UI Engineering in Kotlin',
        problem: 'Providing instantaneous, location-aware weather forecasts with clean mobile UI/UX and resilient offline caching.',
        approach: 'Engineered natively in Android Studio using Kotlin, adhering to modern Android architecture principles with Coroutines and REST API data fetching.',
        features: [
            'Real-time atmospheric conditions and multi-day meteorological forecasts.',
            'Material Design 3 card components with adaptive weather iconography.',
            'Asynchronous network fetching with efficient state handling.'
        ],
        tags: ['Kotlin', 'Android Studio', 'Material Design', 'REST API', 'Coroutines'],
        github: 'https://github.com/Imashaidk/weather-app',
        demo: null
    }
};

function initProjectModals() {
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    if (!modalBackdrop) return;

    const modalCloseBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.project-card[data-project-id]');

    const openModal = (projectId) => {
        const data = projectDetailsData[projectId];
        if (!data) return;

        // Populate Modal Fields
        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-img').alt = data.title;
        document.getElementById('modal-category').textContent = data.category;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-role').textContent = data.role;
        document.getElementById('modal-problem').textContent = data.problem;
        document.getElementById('modal-approach').textContent = data.approach;

        // Features list
        const featuresList = document.getElementById('modal-features');
        featuresList.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            featuresList.appendChild(li);
        });

        // Tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        // GitHub Link
        const githubLink = document.getElementById('modal-github-link');
        if (data.github) {
            githubLink.href = data.github;
            githubLink.style.display = 'inline-flex';
        } else {
            githubLink.style.display = 'none';
        }

        // Live Demo Link
        const demoLink = document.getElementById('modal-demo-link');
        if (data.demo) {
            demoLink.href = data.demo;
            demoLink.style.display = 'inline-flex';
        } else {
            demoLink.style.display = 'none';
        }

        modalBackdrop.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        modalBackdrop.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    // Attach click to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the user clicked the direct GitHub icon link inside the card, do not open modal
            if (e.target.closest('.project-link')) {
                return;
            }
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
            closeModal();
        }
    });
}

