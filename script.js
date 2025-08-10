document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');

    // Check for user's OS preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    let currentTheme;
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDark) {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }

    // Apply the initial theme
    applyTheme(currentTheme);

    // Add event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Listen for changes in OS preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only apply if user hasn't set a preference
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });
});
