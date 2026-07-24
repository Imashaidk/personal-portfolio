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
    fetchGitHubProjects();
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

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectCards = document.querySelectorAll('.project-card');
            const filterValue = btn.getAttribute('data-filter');

            // Active button class toggle
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const statsContainer = document.getElementById('github-stats-container');
            if (statsContainer) {
                if (filterValue === 'github') {
                    statsContainer.classList.remove('hidden');
                } else {
                    statsContainer.classList.add('hidden');
                }
            }

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

/**
 * Fetch and Display GitHub Projects dynamically
 */
async function fetchGitHubProjects() {
    const username = 'Imashaidk';
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Failed to fetch GitHub repositories');
        
        const repos = await response.json();
        const validRepos = repos.filter(repo => !repo.fork).slice(0, 6);
        
        validRepos.forEach((repo, index) => {
            // Colors array for gradients
            const gradients = [
                { id: `gh-grad-${index}-1`, colors: ['#3b82f6', '#8b5cf6'] }, // Blue to Purple
                { id: `gh-grad-${index}-2`, colors: ['#10b981', '#3b82f6'] }, // Emerald to Blue
                { id: `gh-grad-${index}-3`, colors: ['#f59e0b', '#ef4444'] }, // Amber to Red
                { id: `gh-grad-${index}-4`, colors: ['#ec4899', '#8b5cf6'] }, // Pink to Purple
                { id: `gh-grad-${index}-5`, colors: ['#06b6d4', '#3b82f6'] }, // Cyan to Blue
                { id: `gh-grad-${index}-6`, colors: ['#8b5cf6', '#6366f1'] }  // Purple to Indigo
            ];
            const currentGradient = gradients[index % gradients.length];
            
            const card = document.createElement('div');
            card.className = 'project-card glass-card reveal revealed github-card';
            card.setAttribute('data-category', 'github');
            
            // Format language tag if exists
            const langTag = repo.language ? `<span>${repo.language}</span>` : '';
            
            // Punchy, creative custom descriptions mapping
            const professionalDescriptions = {
                'SL-delivery-analytics': 'Supercharging logistics with a powerful data pipeline analyzing transit times, success rates, and route optimizations in real-time.',
                'ecommerce-app': 'Redefining digital storefronts with dynamic state management, seamless cart experiences, and high-performance UI components.',
                'TimeFlow': 'Mastering productivity with a sleek, intuitive time-tracking architecture designed to optimize workflows and destroy procrastination.',
                'personal-portfolio': 'The very portfolio you are browsing! A masterclass in full-stack engineering, interactive UI design, and dynamic data integration.',
                'task-management-system': 'Unleashing team synergy with a collaborative, real-time task management dashboard tailored for high-velocity agile environments.'
            };
            
            // Custom themed SVG artwork mapping
            const customSVGs = {
                'SL-delivery-analytics': `
                    <!-- 3D Analytics Chart -->
                    <rect x="100" y="140" width="40" height="60" rx="4" fill="rgba(255,255,255,0.15)" />
                    <rect x="180" y="90" width="40" height="110" rx="4" fill="rgba(255,255,255,0.25)" />
                    <rect x="260" y="50" width="40" height="150" rx="4" fill="rgba(255,255,255,0.35)" />
                    <path d="M120,130 L200,70 L280,30" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" opacity="0.8" />
                    <circle cx="280" cy="30" r="8" fill="white" />`,
                
                'ecommerce-app': `
                    <!-- Shopping Cart/Storefront -->
                    <path d="M110,70 L140,70 L160,150 L280,150 L300,90 L145,90" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="12" stroke-linejoin="round" />
                    <circle cx="180" cy="180" r="15" fill="rgba(255,255,255,0.6)" />
                    <circle cx="260" cy="180" r="15" fill="rgba(255,255,255,0.6)" />`,
                
                'TimeFlow': `
                    <!-- Floating Hourglass -->
                    <path d="M160,60 L240,60 L240,80 L210,125 L240,170 L240,190 L160,190 L160,170 L190,125 L160,80 Z" fill="rgba(255,255,255,0.2)" stroke="white" stroke-width="4" />
                    <path d="M175,180 L225,180 L195,135 Z" fill="rgba(255,255,255,0.5)" />`,
                    
                'personal-portfolio': `
                    <!-- Code Window -->
                    <rect x="80" y="60" width="240" height="130" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="4" />
                    <circle cx="100" cy="80" r="6" fill="#ef4444" />
                    <circle cx="120" cy="80" r="6" fill="#f59e0b" />
                    <circle cx="140" cy="80" r="6" fill="#10b981" />
                    <path d="M100,120 L130,140 L100,160 M145,160 L185,160" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" />`
            };
            
            // Generic GitHub icon fallback
            const genericSVG = `<path d="M200 60 C 160 60 130 90 130 130 C 130 160 150 185 180 195 C 185 195 185 190 185 190 C 185 190 185 170 185 160 C 165 165 160 150 160 150 C 155 140 150 135 150 135 C 140 130 150 130 150 130 C 160 130 165 140 165 140 C 175 155 190 150 195 150 C 195 145 200 140 200 140 C 180 135 160 130 160 100 C 160 90 165 85 170 80 C 170 80 165 70 170 65 C 170 65 180 65 200 80 C 210 75 220 75 230 75 C 240 75 250 75 260 80 C 280 65 290 65 290 65 C 295 70 290 80 290 80 C 295 85 300 90 300 100 C 300 130 280 135 260 140 C 265 140 270 145 270 150 C 270 160 270 185 270 190 C 270 190 270 195 275 195 C 305 185 330 160 330 130 C 330 90 295 60 255 60 C 245 60 215 60 200 60 Z" fill="rgba(255,255,255,0.2)"/>`;
            
            const artwork = customSVGs[repo.name] || genericSVG;
            
            // Fallback chain: Professional Custom -> GitHub desc -> Generic
            const desc = professionalDescriptions[repo.name] 
                || repo.description 
                || 'An experimental software project exploring new technologies and architectural patterns.';
            
            card.innerHTML = `
                <div class="project-img-wrapper github-creative-wrapper">
                    <svg class="project-img-svg" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="${currentGradient.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="${currentGradient.colors[0]}" />
                                <stop offset="100%" stop-color="${currentGradient.colors[1]}" />
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#${currentGradient.id})" />
                        <!-- Project Specific Artwork -->
                        <g class="github-artwork">
                            ${artwork}
                        </g>
                    </svg>
                </div>
                <div class="project-info">
                    <span class="project-category">GitHub Repository</span>
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-desc">${desc}</p>
                    <div class="project-tags">
                        ${langTag}
                        <span>★ ${repo.stargazers_count}</span>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link" aria-label="View Github repository">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" class="project-link" aria-label="View live application">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
        });
        
        if (typeof renderGitHubStats === 'function') {
            renderGitHubStats(validRepos);
        }
        
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
    }
}

/* ==========================================================================
   Creative Additions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initTypingEffect();
    initTerminalEasterEgg();
});

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const addHover = () => cursor.classList.add('hovering');
    const removeHover = () => cursor.classList.remove('hovering');

    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, input, textarea, .project-card, .terminal-window, .filter-btn, .theme-btn');
        if (target) addHover();
    });
    
    document.body.addEventListener('mouseout', (e) => {
        const target = e.target.closest('a, button, input, textarea, .project-card, .terminal-window, .filter-btn, .theme-btn');
        if (target) removeHover();
    });
}

function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const words = ['Experiences', 'Web Applications', 'Database Architectures', 'GTM Strategies'];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let isDeleting = true;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 2000);
}

function initTerminalEasterEgg() {
    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    
    if (!terminalOverlay) return;

    document.addEventListener('keydown', (e) => {
        if (e.key === '\`' || (e.ctrlKey && e.key === '~')) {
            e.preventDefault();
            terminalOverlay.classList.toggle('active');
            if (terminalOverlay.classList.contains('active')) {
                setTimeout(() => terminalInput.focus(), 100);
            }
        }
    });

    terminalClose.addEventListener('click', () => terminalOverlay.classList.remove('active'));
    
    terminalOverlay.addEventListener('click', (e) => {
        if (e.target === terminalOverlay) terminalOverlay.classList.remove('active');
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            
            printLine(\`user@guest:~$ \${command}\`, '#cdd6f4');

            if (command === 'help') {
                printLine('Available commands: whoami, skills, projects, clear, exit', '#a6e3a1');
            } else if (command === 'whoami') {
                printLine('Imasha Karunathilaka\\nSoftware Engineer & Strategist\\nBuilding digital experiences that drive impact.', '#89b4fa');
            } else if (command === 'skills') {
                printLine('[JS, React, Node, Python, MySQL, Firebase, Figma, Strategy]', '#f9e2af');
            } else if (command === 'projects') {
                printLine('Loading projects from matrix... Done.\\n- TMS (Task Management System)\\n- AquaGrow\\n- SL Delivery Analytics', '#cba6f7');
            } else if (command === 'clear') {
                terminalBody.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">user@guest:~$</span> <span class="terminal-text">Terminal cleared.</span></div>';
            } else if (command === 'exit') {
                terminalOverlay.classList.remove('active');
            } else if (command !== '') {
                printLine(\`Command not found: \${command}. Type 'help' for available commands.\`, '#f38ba8');
            }
            
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    function printLine(text, color) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.style.color = color;
        line.textContent = text;
        terminalBody.appendChild(line);
    }
}

function renderGitHubStats(repos) {
    const container = document.getElementById('github-stats-container');
    const ctx = document.getElementById('githubStatsChart');
    if (!container || !ctx || typeof Chart === 'undefined') return;

    const langCounts = {};
    repos.forEach(repo => {
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
    });

    const labels = Object.keys(langCounts);
    const data = Object.values(langCounts);
    
    if (labels.length === 0) return;

    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'var(--text-secondary)',
                        font: { family: "'Inter', sans-serif" }
                    }
                }
            },
            cutout: '70%'
        }
    });
}
