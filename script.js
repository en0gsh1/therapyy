// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-bottom, .zoom-in').forEach(el => {
        observer.observe(el);
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Show the first testimonial
        testimonials[currentIndex].classList.add('active');
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        }, 5000);
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
    
    // Add animation to service cards on hover
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon').style.transform = 'scale(1.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-icon').style.transform = 'scale(1)';
        });
    });
});
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create theme toggle button
    createThemeToggle();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-bottom, .zoom-in').forEach(el => {
        observer.observe(el);
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Show the first testimonial
        testimonials[currentIndex].classList.add('active');
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        }, 5000);
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }
    
    // Add animation to service cards on hover
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) icon.style.transform = 'scale(1.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) icon.style.transform = 'scale(1)';
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});

// Function to create theme toggle button
function createThemeToggle() {
    // Create the toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    
    // Get current theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial icon based on current theme
    const icon = document.createElement('i');
    icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.appendChild(icon);
    
    // Add click event to toggle theme
    themeToggle.addEventListener('click', function() {
        // Get current theme and toggle it
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme attribute
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
    
    // Add to the body
    document.body.appendChild(themeToggle);
}
