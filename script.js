document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const animateElements = document.querySelectorAll('[data-animate]');

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mainNav = document.getElementById('mainNav');
    const navLinks = mainNav.querySelectorAll('a');

    const toggleMenu = () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    };

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scrolling for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats Counter Animation
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    const startCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.innerText;
                const count = +counter.getAttribute('data-count') || 0;
                const speed = 200;
                const inc = target / speed;

                if (count < target) {
                    const nextCount = Math.ceil(count + inc);
                    counter.innerText = nextCount;
                    counter.setAttribute('data-count', nextCount);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            // Store target and reset
            const targetValue = counter.innerText;
            counter.setAttribute('data-target', targetValue);
            counter.innerText = '0';

            const update = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 100;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(update, 20);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            startCounter();
            started = true;
        }
    }, { threshold: 0.5 });

    if (statsSection) statsObserver.observe(statsSection);
});
