/* ==========================================================================
   Portfolio JavaScript - Interactive Motion, Case Study Modals, Terminal, Tabs
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMouseSpotlight();
    initScrollReveal();
    initNavScroll();
    initMobileMenu();
    initSkillsTabs();
    initProjectFilters();
    initProjectModal();
    init3DTilt();
    initRoleSwitcher();
    initParallaxOrbs();
    initContactForm();
    initTerminal();
});

/* --- Ambient Mouse Spotlight & Parallax Orbs --- */
function initMouseSpotlight() {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
}

function initParallaxOrbs() {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    if (!orb1 || !orb2 || !orb3) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        orb1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
        orb2.style.transform = `translate(${-x * 1.2}px, ${-y * 1.2}px)`;
        orb3.style.transform = `translate(${x * 0.5}px, ${-y * 0.5}px)`;
    }, { passive: true });
}

/* --- Animated Hero Role Switcher --- */
function initRoleSwitcher() {
    const el = document.getElementById('role-switcher');
    if (!el) return;

    const roles = [
        'Data Science & AI/ML Enthusiast',
        'Business Analyst',
        'Project Manager & Agile Lead',
        'Full-Stack Developer',
        'Time Series & Predictive Analytics'
    ];
    let index = 0;

    setInterval(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(6px)';
        setTimeout(() => {
            index = (index + 1) % roles.length;
            el.textContent = roles[index];
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300);
    }, 2800);
}

/* --- Bulletproof Scroll Reveal --- */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    // Immediately reveal elements already near or within the viewport
    const checkAndReveal = () => {
        const thresholdY = window.innerHeight * 1.1;
        els.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= thresholdY) {
                el.classList.add('revealed');
            }
        });
    };

    checkAndReveal();
    window.addEventListener('scroll', checkAndReveal, { passive: true });
    window.addEventListener('resize', checkAndReveal, { passive: true });

    // Safety fallback: ensure all content becomes visible without getting stuck
    setTimeout(() => {
        els.forEach(el => el.classList.add('revealed'));
    }, 800);

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '60px 0px 60px 0px' });
        els.forEach(el => obs.observe(el));
    }
}

/* --- Nav Scroll Effect --- */
function initNavScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 15);
    }, { passive: true });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('nav-drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
        const open = drawer.classList.toggle('open');
        toggle.classList.toggle('open', open);
    });
    drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            drawer.classList.remove('open');
            toggle.classList.remove('open');
        });
    });
}

/* --- Skills Tabs Navigation --- */
function initSkillsTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    if (!tabs.length) return;

    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            contents.forEach(c => {
                if (c.id === target) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
        });
    });
}

/* --- Project Filtering --- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const cats = card.getAttribute('data-category') || '';
                const visible = filter === 'all' || cats.split(' ').includes(filter);
                if (visible) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(16px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* --- 3D Card Tilt Effect --- */
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.hero-photo-card, .project-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* --- Interactive Project Modal (Case Study Detail Drawer) --- */
const PROJECT_CASE_STUDIES = {
    'nexora-carbonpulse': {
        badge: 'Merit Award · CodeFest Finals 2026',
        title: 'Nexora CarbonPulse — Enterprise Climate Risk Intelligence & Decision Suite',
        role: 'Data Science & Business Analysis Lead (Team Nexora)',
        body: `
            <p class="about-p">Nexora CarbonPulse is an award-winning enterprise climate analytics and decision intelligence platform developed for the National Finals of SLIIT CodeFest Datathon 2026, earning the prestigious Merit Award.</p>
            <h4 class="modal-section-h4">Key Architecture & Analytical Modules</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li><strong>Carbon Market Forecasting:</strong> 30-day forward price curve prediction across 5 compliance carbon markets (EU ETS, UK ETS, California, China ETS, RGGI) using autoregressive LightGBM regressor pipelines with zero data leakage.</li>
                <li><strong>Sovereign Transition Velocity Index:</strong> Multi-dimensional scoring (Score A) evaluating 27 years of sovereign energy transition and emissions intensity across 50 nations (2000-2026).</li>
                <li><strong>EU CBAM Regulatory Financial Engine:</strong> Real-time cross-border carbon border tax liability calculator and supply chain tariff hedging simulator.</li>
                <li><strong>Production Deployment:</strong> Full-stack Streamlit decision application with interactive digital twin policy simulations ($R^2 = 0.967$).</li>
            </ul>
        `,
        tags: ['Data Science', 'Machine Learning', 'LightGBM', 'EU CBAM', 'Streamlit', 'Merit Award'],
        github: 'https://github.com/praveen-madawalage/nexora-final-challenge',
        live: 'https://nexora-final-challenge-eklrszup3jypkheffvchph.streamlit.app/'
    },
    'nexora-forecaster': {
        badge: 'Time Series ML Benchmark',
        title: 'Nexora Carbon Price Forecaster (Autoregressive ML)',
        role: 'Time Series ML & Econometric Modeler',
        body: `
            <p class="about-p">Autoregressive time-series predictive modeling engine analyzing 15,866 daily carbon trading observations to forecast 30-day forward compliance prices across 5 major global carbon exchanges.</p>
            <h4 class="modal-section-h4">Machine Learning Methodology</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Engineered strict 1-day shifted rolling statistics (7-day, 30-day volatility standard deviations) and cyclical calendar signals.</li>
                <li>Rigorous evaluation comparing classical ARIMA baselines against tuned LightGBM regressor pipelines on held-out test horizons.</li>
                <li>Quantified market volatility shocks and predictive MAPE/RMSE benchmarks across multiple geographical compliance zones.</li>
            </ul>
        `,
        tags: ['Python', 'Time Series', 'LightGBM', 'ARIMA', 'Zero-Leakage ML'],
        github: 'https://github.com/praveen-madawalage/nexora-final-challenge'
    },
    'nexora-cbam': {
        badge: 'Regulatory FinTech & BA',
        title: 'Nexora EU CBAM Border Carbon Liability & Tariff Engine',
        role: 'Business Analyst & Quantitative Risk Modeler',
        body: `
            <p class="about-p">Quantitative compliance decision model designed for corporate supply chain leaders and procurement desks navigating European Union Carbon Border Adjustment Mechanism (EU CBAM) regulations.</p>
            <h4 class="modal-section-h4">Business Analysis & Risk Mechanics</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Formulated mathematical models for import carbon certificate requirements across industrial sectors (steel, aluminum, cement, fertilizers).</li>
                <li>Computed sovereign electricity grid decarbonization transition velocity metrics across 50 exporting partner economies.</li>
                <li>Designed an intuitive interactive decision layer allowing enterprise risk managers to stress-test tariff liabilities against forward carbon price swings.</li>
            </ul>
        `,
        tags: ['Business Analysis', 'EU CBAM', 'Financial Risk', 'Python', 'Streamlit'],
        github: 'https://github.com/praveen-madawalage/nexora-final-challenge'
    },
    'sales-forecasting': {
        badge: 'Machine Learning Case Study',
        title: 'Time Series Retail Sales Forecasting',
        role: 'Solo Data Scientist & Developer (4-Month Project)',
        body: `
            <p class="about-p">This 4-month self-directed data science initiative tackled complex sales demand forecasting on the Kaggle M5 Walmart dataset containing thousands of retail SKUs across multiple product categories.</p>
            <h4 class="modal-section-h4">Key Architecture & Solution</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Engineered lag features (7-day, 28-day rolling window means & standard deviations).</li>
                <li>Benchmarked statistical models against LightGBM and XGBoost regressor pipelines.</li>
                <li>Optimized Hyperparameters to reduce WMSAPE (Weighted Mean Absolute Scaled Error) evaluation metrics.</li>
            </ul>
        `,
        tags: ['Python', 'Time Series', 'LightGBM', 'Pandas', 'Kaggle M5'],
        github: 'https://github.com/Imashaidk/sales-forecasting-project'
    },
    'machine-repair': {
        badge: 'Business Analysis Case Study',
        title: 'Industrial Machine Repairing Management System',
        role: 'Requirements Analyst & System Modeler',
        body: `
            <p class="about-p">Designed an enterprise web system for an industrial machinery workshop in Kurunegala, converting error-prone paper logs into a real-time job tracking system.</p>
            <h4 class="modal-section-h4">Business Analysis Highlights</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Mapped As-Is to To-Be workflow diagrams, uncovering a 35% time reduction in job intake.</li>
                <li>Constructed detailed DFDs, Sequence Diagrams, and ER schemas in MySQL.</li>
                <li>Created automated labor cost and spare part pricing estimation modules.</li>
            </ul>
        `,
        tags: ['Business Analysis', 'UML', 'As-Is/To-Be', 'MySQL'],
        github: 'https://github.com/Imashaidk'
    },
    'taskify': {
        badge: 'Full-Stack Web App',
        title: 'Taskify — Real-Time Task Management System',
        role: 'Frontend Lead (Member 4 of 5 Team Project)',
        body: `
            <p class="about-p">Taskify is a high-performance web platform featuring real-time state synchronization, granular role-based permissions, and responsive user dashboards.</p>
            <h4 class="modal-section-h4">Engineering Contributions</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Redesigned all 8 user interface pages with React 19, Vite, and Tailwind CSS.</li>
                <li>Integrated Socket.IO for live assignment alerts and activity feed updates.</li>
                <li>Configured FastAPI backend routes with JWT stateless auth and MySQL TiDB persistence.</li>
            </ul>
        `,
        tags: ['React 19', 'FastAPI', 'Socket.IO', 'Tailwind CSS', 'Docker'],
        github: 'https://github.com/Imashaidk/task-management-system'
    },
    'aquagrow': {
        badge: 'National Exhibition Showcase',
        title: 'AquaGrow — Smart Indoor Hydroponic System',
        role: 'Design, Branding & Marketing Lead (Team Futurix)',
        body: `
            <p class="about-p">Showcased at INCO 12.0 National Exhibition, AquaGrow combines smart indoor IoT plant cultivation with sleek consumer product presentation.</p>
            <h4 class="modal-section-h4">Brand & Commercial Strategy</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Designed complete product brand identity, brochures, and user quick-start grow guides.</li>
                <li>Engineered the product landing page deployed live on Vercel.</li>
                <li>Formulated market feasibility study and 7Ps marketing launch framework.</li>
            </ul>
        `,
        tags: ['Brand Identity', '7Ps Strategy', 'Vercel', 'Canva', 'INCO 12.0'],
        github: 'https://aqua-grow-taupe.vercel.app'
    },
    'ceylink': {
        badge: 'IdeaSprint 2025 Finalist',
        title: 'Ceylink — Digital Tea Marketplace Platform',
        role: 'IdeaSprint Finalist & Venture Strategist',
        body: `
            <p class="about-p">Advanced as a national Finalist in IdeaSprint 2025 with Team Sprintbusters for Ceylink — a platform disintermediating the Sri Lankan tea supply chain.</p>
            <h4 class="modal-section-h4">Impact Breakdown</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Empowers smallholder tea factory owners and estate workers with direct pricing data.</li>
                <li>Eliminated middleman price margins while providing verifiable tea origin certifications.</li>
            </ul>
        `,
        tags: ['Marketplace', 'Supply Chain', 'Venture Strategy', 'IdeaSprint 2025'],
        github: 'https://github.com/Imashaidk'
    },
    'employee-attrition': {
        badge: 'HR Predictive Analytics',
        title: 'Employee Attrition Analytics & Retention Model',
        role: 'Data Analyst & Machine Learning Developer',
        body: `
            <p class="about-p">Developed a predictive machine learning model analyzing corporate HR metrics to flag employees at risk of departure before resignation.</p>
            <h4 class="modal-section-h4">Analytical Method</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Identified correlation between overtime hours, tenure, and resignation probability.</li>
                <li>Trained Random Forest and Logistic Regression classifiers on HR survey attributes.</li>
            </ul>
        `,
        tags: ['Python', 'Pandas', 'Classification', 'HR Analytics'],
        github: 'https://github.com/Imashaidk/employee-attrition-analytics'
    },
    'laptop-absa': {
        badge: 'NLP & AI Research',
        title: 'TrustSense — Aspect-Based Sentiment Analysis',
        role: 'NLP Developer & Dataset Curator',
        body: `
            <p class="about-p">Built an NLP pipeline performing aspect-level sentiment classification on 24,113 laptop hardware reviews across 365 laptop models.</p>
            <h4 class="modal-section-h4">Key Features</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Extracted targeted aspects like battery life, thermal noise, screen brightness, and hinge durability.</li>
                <li>Applied fine-grained polarity scoring to isolate specific customer pain points.</li>
            </ul>
        `,
        tags: ['Python', 'NLP', 'Pandas', 'Aspect Extraction'],
        github: 'https://github.com/Imashaidk/laptop-absa-project'
    },
    'sl-delivery': {
        badge: 'Logistics Operations',
        title: 'Sri Lanka Delivery & Logistics Analytics',
        role: 'Operations Data Analyst',
        body: `
            <p class="about-p">Analyzed regional courier fulfillment networks across Sri Lanka to isolate transit bottlenecks and route delays.</p>
            <h4 class="modal-section-h4">Deliverables</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Mapped district-level package dispatch latency across Western and North Western provinces.</li>
                <li>Recommended operational vehicle routing adjustments to improve on-time delivery.</li>
            </ul>
        `,
        tags: ['Python', 'Pandas', 'Operations Research', 'Logistics'],
        github: 'https://github.com/Imashaidk/SL-delivery-analytics'
    },
    'ecommerce': {
        badge: 'Full-Stack E-Commerce',
        title: 'NexGen Store — Full-Stack E-Commerce Platform',
        role: 'Full-Stack Developer (Phases 1-10 Complete)',
        body: `
            <p class="about-p">Built an e-commerce platform with dynamic product browsing, category filtering, cart management, and checkout workflow.</p>
            <h4 class="modal-section-h4">Tech Stack Highlights</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Express.js REST controllers connected to a MySQL database schema.</li>
                <li>React components handling shopping cart persistent state.</li>
            </ul>
        `,
        tags: ['React', 'Node.js', 'Express', 'MySQL'],
        github: 'https://github.com/Imashaidk/ecommerce-app'
    },
    'ai-support-triage': {
        badge: 'Machine Learning & Operations',
        title: 'AI Support Ticket Triage & SLA Breach Prevention Engine',
        role: 'Agile PM & Machine Learning Engineer',
        body: `
            <p class="about-p">Designed and engineered an automated ticket triage and SLA breach prevention engine combining natural language processing, priority scoring, and Agile process management.</p>
            <h4 class="modal-section-h4">System Capabilities</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Classified multi-lingual and high-volume customer inquiries into priority tiers using NLP feature vectors.</li>
                <li>Predicted probability of SLA deadline breaches based on team capacity and issue severity.</li>
                <li>Aligned engineering execution with Agile backlog management and sprint workflows.</li>
            </ul>
        `,
        tags: ['Python', 'NLP', 'Agile PM', 'SLA Analytics', 'Scikit-Learn'],
        github: 'https://github.com/Imashaidk/ai-support-triage-analytics'
    },
    'weather-app': {
        badge: 'Native Mobile Development',
        title: 'WeatherNow — Native Android Weather Application',
        role: 'Android Developer (Kotlin & Android Studio)',
        body: `
            <p class="about-p">Engineered a native Android weather application following modern Android development practices, clean architecture, and Material Design 3 guidelines.</p>
            <h4 class="modal-section-h4">Engineering Details</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Built using Kotlin with Kotlin Coroutines for non-blocking asynchronous REST API requests.</li>
                <li>Integrated OpenWeather API for real-time weather conditions, 5-day forecasts, humidity, and atmospheric metrics.</li>
                <li>Implemented dynamic background state changes matching real-time ambient weather conditions.</li>
            </ul>
        `,
        tags: ['Kotlin', 'Android Studio', 'Coroutines', 'REST API', 'Material 3'],
        github: 'https://github.com/Imashaidk/weather-app'
    },
    'eventhub': {
        badge: 'Cross-Platform Mobile App',
        title: 'EventHub — Campus & Tech Community Event Platform',
        role: 'Mobile Developer (Flutter & Dart)',
        body: `
            <p class="about-p">Developed a cross-platform mobile application providing seamless discovery, RSVP tracking, and schedule management for university workshops and hackathons.</p>
            <h4 class="modal-section-h4">Core Features</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Responsive mobile layout engineered in Flutter with reusable Dart widget components.</li>
                <li>Client-side state management handling saved bookmarks, filters by event category, and calendar sync.</li>
                <li>Modern interactive UI with smooth screen transitions and push notification placeholders.</li>
            </ul>
        `,
        tags: ['Flutter', 'Dart', 'Mobile App', 'State Management', 'UI/UX'],
        github: 'https://github.com/Imashaidk/EventHub'
    },
    'quantedge': {
        badge: 'FinTech Challenge Semifinalist',
        title: 'QuantEdge 1.0 — Quantitative Financial Analytics',
        role: 'Quantitative Data Analyst & Semifinalist',
        body: `
            <p class="about-p">Ongoing competition entry proudly advanced to the Semifinals. QuantEdge 1.0 is an analytical toolkit evaluating equity and market asset performance using statistical momentum and volatility indicators.</p>
            <h4 class="modal-section-h4">Analytical Capabilities & Competition Focus</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Computed Exponential Moving Averages (EMA), Bollinger Bands, and Sharpe Ratios.</li>
                <li>Modeled drawdown distributions and risk-reward profile visualizations using Python & Pandas.</li>
                <li>Advanced to the Semifinals for algorithmic rigor and quantitative financial architecture.</li>
            </ul>
        `,
        tags: ['Python', 'Pandas', 'Quantitative Finance', 'Time Series', 'Semifinalist'],
        github: 'https://github.com/Imashaidk/QuantEdge1.0'
    },
    'quickbite': {
        badge: 'Frontend Web App',
        title: 'QuickBite — Food Ordering Web Platform',
        role: 'Frontend & TypeScript Developer',
        body: `
            <p class="about-p">Interactive digital restaurant ordering application with dynamic product catalogs, real-time cart calculations, and responsive checkout flows.</p>
            <h4 class="modal-section-h4">Frontend Architecture</h4>
            <ul style="margin-left: 20px; list-style-type: disc;">
                <li>Strict TypeScript type interfaces for product models, order line-items, and cart state.</li>
                <li>Clean component architecture with responsive mobile-first navigation and micro-animations.</li>
            </ul>
        `,
        tags: ['TypeScript', 'React', 'Frontend UI', 'State Management'],
        github: 'https://github.com/Imashaidk/quickbite_app'
    }
};

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalRole  = document.getElementById('modal-role');
    const modalBody  = document.getElementById('modal-body');
    const modalTags  = document.getElementById('modal-tags');
    const modalActions = document.getElementById('modal-actions');

    if (!modal) return;

    const closeModal = () => modal.classList.add('hidden');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.querySelectorAll('.project-view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.project-card');
            if (!card) return;
            const projectId = card.getAttribute('data-project-id');
            const data = PROJECT_CASE_STUDIES[projectId];

            if (data) {
                if (modalBadge) modalBadge.textContent = data.badge;
                if (modalTitle) modalTitle.textContent = data.title;
                if (modalRole)  modalRole.textContent  = data.role;
                if (modalBody)  modalBody.innerHTML    = data.body;
                
                if (modalTags) {
                    modalTags.innerHTML = data.tags.map(t => `<span class="project-tags"><span>${t}</span></span>`).join('');
                }

                if (modalActions) {
                    let actionHtml = `<a href="${data.github}" target="_blank" rel="noopener" class="btn btn-outline" style="padding:8px 18px;font-size:13px;">View Source on GitHub</a>`;
                    if (data.live) {
                        actionHtml = `<a href="${data.live}" target="_blank" rel="noopener" class="btn btn-primary" style="padding:8px 18px;font-size:13px;display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>View Live Application</a> ` + actionHtml;
                    }
                    modalActions.innerHTML = actionHtml;
                }

                modal.classList.remove('hidden');
            }
        });
    });
}

/* --- Contact Form --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput   = document.getElementById('form-name');
    const emailInput  = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const msgInput    = document.getElementById('form-message');
    const submitBtn   = document.getElementById('submit-btn');

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const setErr = (id, show) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('visible', show);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const validName    = nameInput?.value.trim().length > 0;
        const validEmail   = emailRe.test(emailInput?.value.trim());
        const validSubject = subjectInput?.value.trim().length > 0;
        const validMsg     = msgInput?.value.trim().length > 0;

        setErr('name-error',    !validName);
        setErr('email-error',   !validEmail);
        setErr('subject-error', !validSubject);
        setErr('message-error', !validMsg);

        if (validName && validEmail && validSubject && validMsg) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';
            setTimeout(() => {
                submitBtn.textContent = '✓ Message Sent Successfully!';
                form.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 3500);
            }, 1200);
        }
    });
}

/* --- Terminal Easter Egg --- */
function initTerminal() {
    const trigger  = document.getElementById('terminal-trigger');
    const overlay  = document.getElementById('terminal-overlay');
    const closeBtn = document.getElementById('terminal-close');
    const input    = document.getElementById('terminal-input');
    const body     = document.getElementById('terminal-body');
    if (!overlay) return;

    const open  = () => { overlay.classList.remove('hidden'); setTimeout(() => input?.focus(), 80); };
    const close = () => overlay.classList.add('hidden');

    if (trigger) trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === '`') { e.preventDefault(); overlay.classList.contains('hidden') ? open() : close(); }
        if (e.key === 'Escape') close();
    });

    if (!input) return;
    input.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        const cmd = input.value.trim().toLowerCase();
        input.value = '';

        const print = (text, color = '#d0d0d0') => {
            const line = document.createElement('div');
            line.style.color = color;
            line.style.marginTop = '4px';
            line.innerHTML = text;
            body.appendChild(line);
            body.scrollTop = body.scrollHeight;
        };

        print(`<span style="color:#34c759">guest@portfolio:~$</span> ${cmd}`);

        switch(cmd) {
            case 'help':
                print('Available commands:<br>&nbsp;&nbsp;<b style="color:#fff">about</b> &mdash; Brief introduction<br>&nbsp;&nbsp;<b style="color:#fff">skills</b> &mdash; Technical stack summary<br>&nbsp;&nbsp;<b style="color:#fff">projects</b> &mdash; List of key projects<br>&nbsp;&nbsp;<b style="color:#fff">education</b> &mdash; Academic background<br>&nbsp;&nbsp;<b style="color:#fff">contact</b> &mdash; Reach out info<br>&nbsp;&nbsp;<b style="color:#fff">cv</b> &mdash; Download PDF resume<br>&nbsp;&nbsp;<b style="color:#fff">clear</b> &mdash; Clear console screen');
                break;
            case 'about':
                print('<b>Imasha Karunathilaka</b> &mdash; 2nd Year BSc (Hons) MIT Undergraduate, University of Kelaniya. Full-Stack Developer & Business Analyst.');
                break;
            case 'skills':
                print('• Languages: Python, JavaScript, Java, Kotlin, C++, SQL<br>• Stack: React 19, FastAPI, Node.js, MySQL, Docker, Tailwind CSS<br>• Domain: Business Analysis (UML/DFD), Time Series ML, n8n Automation');
                break;
            case 'projects':
                print('1. Time Series Sales Forecasting (ML)<br>2. Industrial Machine Repairing System (BA)<br>3. Taskify Task Management (Full-Stack)<br>4. AquaGrow Smart Hydroponics (INCO 12.0)<br>5. Ceylink Tea Marketplace (IdeaSprint Finalist)');
                break;
            case 'education':
                print('• BSc (Hons) MIT &mdash; University of Kelaniya (Faculty of Science)<br>• G.C.E. A/L Biological Science &mdash; Maliyadeva Balika Vidyalaya');
                break;
            case 'contact':
                print('• Email: karunat-im23099@stu.kln.ac.lk<br>• Phone: +94 77 485 2074<br>• LinkedIn: linkedin.com/in/imasha-karunathilaka');
                break;
            case 'cv':
                print('Downloading CV...', '#34c759');
                window.open('assets/Imasha_Karunathilaka_CV.pdf', '_blank');
                break;
            case 'sudo':
                print('Access granted: Welcome root admin.', '#ffcc00');
                break;
            case 'clear':
                body.innerHTML = '';
                break;
            default:
                if (cmd !== '') print(`Command not found: '${cmd}'. Type 'help' for available commands.`, '#ff3b30');
        }
    });
}
