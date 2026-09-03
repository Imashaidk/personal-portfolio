/* ==========================================================================
   Apple Design System - Personal Portfolio Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSkillsTabs();
    initProjectFilters();
    initContactForm();
    initTerminalEasterEgg();
    initMobileMenu();
    initChart();
});

/**
 * Configurator Option Chips: Skills Tab Switcher
 */
function initSkillsTabs() {
    const chipBtns = document.querySelectorAll('#skills .configurator-chip');
    const skillsContainer = document.getElementById('skills-container');
    if (!chipBtns.length || !skillsContainer) return;

    const skillsData = {
        frontend: [
            { name: 'React.js & React Ecosystem', val: '88%' },
            { name: 'HTML5 / CSS3 / Vanilla JS', val: '95%' },
            { name: 'Responsive Web Design', val: '92%' },
            { name: 'Chart.js & Data Visualization', val: '85%' }
        ],
        backend: [
            { name: 'MySQL & Relational DBs', val: '85%' },
            { name: 'Stored Procedures & Queries', val: '80%' },
            { name: 'Firebase Realtime Database', val: '80%' },
            { name: 'Database Modeling (ER/UML)', val: '85%' }
        ],
        tools: [
            { name: 'Marketing & GTM Strategy', val: '90%' },
            { name: 'Figma / UI Mockups', val: '80%' },
            { name: 'Git & Version Control', val: '85%' },
            { name: 'UML System Mapping', val: '85%' }
        ]
    };

    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            chipBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            const items = skillsData[target] || skillsData.frontend;
            skillsContainer.innerHTML = items.map(item => `
                <div class="store-utility-card">
                    <div class="skill-card-header">
                        <span class="skill-name">${item.name}</span>
                        <span class="skill-val">${item.val}</span>
                    </div>
                    <div class="skill-bar-track">
                        <div class="skill-bar-fill" style="width: ${item.val}"></div>
                    </div>
                </div>
            `).join('');
        });
    });
}

/**
 * Configurator Option Chips: Projects Filter System
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('#projects .configurator-chip');
    const projectCards = document.querySelectorAll('#projects .project-tile-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/**
 * Contact Form Validation & Submission Handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setError = (inputId, errorId, show) => {
        const errEl = document.getElementById(errorId);
        if (errEl) {
            if (show) errEl.classList.add('visible');
            else errEl.classList.remove('visible');
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = nameInput.value.trim().length > 0;
        const isEmailValid = emailRegex.test(emailInput.value.trim());
        const isSubjectValid = subjectInput.value.trim().length > 0;
        const isMessageValid = messageInput.value.trim().length > 0;

        setError('form-name', 'name-error', !isNameValid);
        setError('form-email', 'email-error', !isEmailValid);
        setError('form-subject', 'subject-error', !isSubjectValid);
        setError('form-message', 'message-error', !isMessageValid);

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Message Sent Successfully!';
                form.reset();

                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                }, 3000);
            }, 1200);
        }
    });
}

/**
 * Terminal Easter Egg Controls
 */
function initTerminalEasterEgg() {
    const trigger = document.getElementById('terminal-trigger');
    const overlay = document.getElementById('terminal-overlay');
    const closeBtn = document.getElementById('terminal-close');
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');

    if (!overlay || !input) return;

    const openTerminal = () => {
        overlay.classList.remove('hidden');
        setTimeout(() => input.focus(), 100);
    };

    const closeTerminal = () => {
        overlay.classList.add('hidden');
    };

    if (trigger) trigger.addEventListener('click', openTerminal);
    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

    document.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            if (overlay.classList.contains('hidden')) openTerminal();
            else closeTerminal();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            const printLine = (text, color = '#2997ff') => {
                const line = document.createElement('div');
                line.style.color = color;
                line.style.marginTop = '4px';
                line.textContent = text;
                body.appendChild(line);
                body.scrollTop = body.scrollHeight;
            };

            printLine(`guest@portfolio:~$ ${cmd}`, '#ffffff');

            if (cmd === 'help') {
                printLine('Available commands: whoami, skills, projects, clear, exit', '#34c759');
            } else if (cmd === 'whoami') {
                printLine('Imasha Karunathilaka — Software Engineer & Strategist.', '#2997ff');
            } else if (cmd === 'skills') {
                printLine('React, Vanilla JS, MySQL, Firebase, UML Modeling, GTM Strategy.', '#ff9f0a');
            } else if (cmd === 'projects') {
                printLine('1. Task Management System\n2. AquaGrow Hydroponics\n3. Marketing Analytics Dashboard\n4. Attendance Management', '#af52de');
            } else if (cmd === 'clear') {
                body.innerHTML = '<div><span class="terminal-prompt">guest@portfolio:~$</span> Terminal cleared.</div>';
            } else if (cmd === 'exit') {
                closeTerminal();
            } else if (cmd !== '') {
                printLine(`Command not found: '${cmd}'. Type 'help' for options.`, '#ff453a');
            }
        }
    });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navList = document.querySelector('.global-nav-list');
    if (!toggle || !navList) return;

    toggle.addEventListener('click', () => {
        if (navList.style.display === 'flex') {
            navList.style.display = 'none';
        } else {
            navList.style.display = 'flex';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '44px';
            navList.style.left = '0';
            navList.style.width = '100%';
            navList.style.background = '#000000';
            navList.style.padding = '16px 24px';
            navList.style.gap = '16px';
        }
    });
}

/**
 * Render GitHub Doughnut Chart
 */
function initChart() {
    const ctx = document.getElementById('githubStatsChart');
    if (!ctx || typeof Chart === 'undefined') return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['JavaScript', 'HTML/CSS', 'MySQL/SQL', 'React', 'Strategy'],
            datasets: [{
                data: [40, 25, 15, 12, 8],
                backgroundColor: [
                    '#0066cc',
                    '#2997ff',
                    '#5ac8fa',
                    '#34c759',
                    '#ff9f0a'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#cccccc',
                        font: { family: "'Inter', sans-serif", size: 12 }
                    }
                }
            },
            cutout: '70%'
        }
    });
}
