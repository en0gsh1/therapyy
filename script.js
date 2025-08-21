// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on menu button
            this.classList.toggle('active');
            
            // Toggle active class on navigation links
            navLinks.classList.toggle('active');
            
            // Toggle body class to prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

    
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

// Therapy Chat Assistant Functionality - Isolated from other scripts
(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get elements
        const chatIcon = document.getElementById('therapyChatIcon');
        const chatWindow = document.getElementById('therapyChatWindow');
        const minimizeChat = document.getElementById('therapyMinimizeChat');
        const closeChat = document.getElementById('therapyCloseChat');
        const userMessageInput = document.getElementById('therapyUserMessage');
        const sendMessageBtn = document.getElementById('therapySendMessage');
        const chatMessages = document.getElementById('therapyChatMessages');
        const suggestionBtns = document.querySelectorAll('.therapy-suggestion-btn');
        
        // Sample responses for the assistant
        const responses = {
            'hello': 'Hello! How can I help you with your physiotherapy needs today?',
            'hi': 'Hi there! How can I assist you with your therapy questions?',
            'appointment': 'You can book an appointment by clicking the "Book Appointment" button in the navigation bar, or I can help you schedule one now.',
            'pain': 'I\'m sorry to hear you\'re experiencing pain. Could you tell me more about where you\'re feeling discomfort?',
            'exercise': 'Regular exercises are important for recovery. I can suggest some specific exercises based on your condition.',
            'book': 'To book an appointment, please click on the "Book Appointment" button at the top of the page, or I can help you schedule one now.',
            'help': 'I\'m here to help! You can ask me about physiotherapy services, exercises, pain management, or booking appointments.',
            'thanks': 'You\'re welcome! Is there anything else I can help you with?',
            'thank you': 'You\'re welcome! Is there anything else I can help you with?',
            'bye': 'Thank you for chatting with me! If you need more help later, I\'ll be here.',
            'default': 'I\'m here to help with your physiotherapy questions. Could you provide more details so I can assist you better?'
        };
        
        // Show chat window with animation
        function openChat() {
            if (chatWindow) {
                chatWindow.classList.add('active');
                const notification = document.querySelector('.therapy-chat-notification');
                if (notification) {
                    notification.style.display = 'none';
                }
                if (userMessageInput) {
                    userMessageInput.focus();
                }
            }
        }
        
        // Hide chat window with animation
        function minimizeOrCloseChat() {
            if (chatWindow) {
                chatWindow.classList.remove('active');
            }
        }
        
        // Add a message to the chat
        function addMessage(content, isUser = false) {
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = isUser ? 'therapy-message therapy-user' : 'therapy-message therapy-assistant';
            
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            
            messageDiv.innerHTML = `
                <div class="therapy-message-content">
                    <p>${content}</p>
                </div>
                <span class="therapy-message-time">${timeString}</span>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Get response based on user input
        function getResponse(userInput) {
            userInput = userInput.toLowerCase().trim();
            
            // Check for keywords in the user's message
            for (const [keyword, response] of Object.entries(responses)) {
                if (userInput.includes(keyword)) {
                    return response;
                }
            }
            
            // Default response if no keywords match
            return responses.default;
        }
        
        // Process user message and get response
        function processUserMessage() {
            if (!userMessageInput || !chatMessages) return;
            
            const userMessage = userMessageInput.value.trim();
            
            if (userMessage) {
                // Add user message to chat
                addMessage(userMessage, true);
                
                // Clear input field
                userMessageInput.value = '';
                
                // Simulate typing delay before assistant responds
                setTimeout(() => {
                    const response = getResponse(userMessage);
                    addMessage(response);
                }, 1000);
            }
        }
        
        // Set up event listeners if elements exist
        if (chatIcon) {
            chatIcon.addEventListener('click', openChat);
        }
        
        if (minimizeChat) {
            minimizeChat.addEventListener('click', minimizeOrCloseChat);
        }
        
        if (closeChat) {
            closeChat.addEventListener('click', minimizeOrCloseChat);
        }
        
        if (sendMessageBtn) {
            sendMessageBtn.addEventListener('click', processUserMessage);
        }
        
        if (userMessageInput) {
            userMessageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    processUserMessage();
                }
            });
        }
        
        // Handle suggestion buttons
        if (suggestionBtns) {
            suggestionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const suggestionText = this.textContent;
                    addMessage(suggestionText, true);
                    
                    setTimeout(() => {
                        let response;
                        if (suggestionText.includes('appointment')) {
                            response = responses.appointment;
                        } else if (suggestionText.includes('exercises')) {
                            response = responses.exercise;
                        } else if (suggestionText.includes('pain')) {
                            response = responses.pain;
                        } else {
                            response = responses.default;
                        }
                        addMessage(response);
                    }, 1000);
                });
            });
        }
        
        // Show notification after a delay to attract attention
        setTimeout(() => {
            const notification = document.querySelector('.therapy-chat-notification');
            if (notification && chatWindow && !chatWindow.classList.contains('active')) {
                notification.style.display = 'flex';
            }
        }, 3000);
    });
})();
// Gallery Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('gallerySlider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to update slider position
    function updateSlider() {
        // Update slider transform
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active class on slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update active class on dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Event listener for next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // Event listener for previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Initialize slider
    updateSlider();
});
// Fade-in animation for services
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Add fade-in class to all service items
    serviceItems.forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the item is visible
    });
    
    // Observe each service item
    serviceItems.forEach(item => {
        observer.observe(item);
    });
});
