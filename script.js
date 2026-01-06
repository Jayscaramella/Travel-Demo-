// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonials = document.querySelectorAll('.testimonial-card');

function updateTestimonialSlider() {
    const offset = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonialSlider();
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonialSlider();
}

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        destination: document.getElementById('destination').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // In a real application, this would send data to a server
    console.log('Form submitted:', formData);
    
    showNotification('Thank you for your inquiry! We will contact you shortly.', 'success');
    contactForm.reset();
});

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // In a real application, this would send data to a server
    console.log('Newsletter subscription:', email);
    
    showNotification('Successfully subscribed to our newsletter!', 'success');
    newsletterForm.reset();
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 20px 30px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: 'Montserrat', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Modal functionality
const modal = document.getElementById('destinationModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

const destinationDetails = {
    'Santorini, Greece': {
        title: 'Santorini, Greece',
        description: 'Experience the enchanting beauty of Santorini with its iconic blue-domed churches, stunning caldera views, and world-famous sunsets. Stay in luxury cave hotels carved into the cliffs, enjoy wine tasting at local vineyards, and explore charming villages with cobblestone streets. This 7-day journey includes private yacht excursions, gourmet dining experiences, and exclusive access to hidden gems known only to locals.'
    },
    'Maldives': {
        title: 'Maldives Paradise',
        description: 'Escape to your own private paradise in the Maldives. Stay in an overwater bungalow with direct access to crystal-clear turquoise waters. Enjoy world-class snorkeling and diving, private beach dinners under the stars, spa treatments with ocean views, and complete relaxation in one of the world\'s most exclusive destinations. This 5-day experience is perfect for honeymoons and romantic getaways.'
    },
    'Tokyo, Japan': {
        title: 'Tokyo, Japan',
        description: 'Immerse yourself in the fascinating contrast of ancient tradition and cutting-edge modernity. Stay in luxury ryokans and 5-star hotels, participate in private tea ceremonies, enjoy exclusive sushi master classes, visit ancient temples and shrines, and experience Tokyo\'s vibrant nightlife. This 10-day cultural journey includes visits to Mt. Fuji, traditional onsen experiences, and VIP access to Tokyo\'s best attractions.'
    },
    'Amalfi Coast, Italy': {
        title: 'Amalfi Coast, Italy',
        description: 'Discover the breathtaking beauty of Italy\'s Amalfi Coast with its dramatic cliffs, colorful villages, and Mediterranean charm. Stay in luxury hotels with panoramic sea views, enjoy private boat tours, participate in cooking classes with renowned chefs, and explore the historic towns of Positano, Amalfi, and Ravello. This 8-day Italian escape includes wine tastings, gourmet dining, and exclusive experiences.'
    },
    'Bali, Indonesia': {
        title: 'Bali, Indonesia',
        description: 'Find your zen in the spiritual heart of Indonesia. Experience luxury resorts nestled in lush rice terraces, ancient temple visits, traditional Balinese ceremonies, yoga and wellness retreats, world-class surfing, and rejuvenating spa treatments. This 9-day journey through Bali combines adventure, culture, and relaxation, with private guides ensuring an authentic and personalized experience.'
    },
    'Dubai, UAE': {
        title: 'Dubai, UAE',
        description: 'Experience unparalleled luxury in the city of gold. Stay in the world\'s finest hotels, enjoy private desert safaris, shop in exclusive boutiques, dine at Michelin-starred restaurants, and experience the thrill of indoor skiing and outdoor beaches. This 6-day luxury experience includes helicopter tours, yacht charters, VIP access to attractions, and personalized shopping experiences with dedicated consultants.'
    }
};

function openDestinationModal(destination) {
    const details = destinationDetails[destination];
    if (details) {
        modalTitle.textContent = details.title;
        modalDescription.textContent = details.description;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDestinationModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function scrollToContact() {
    closeDestinationModal();
    const contactSection = document.getElementById('contact');
    const offsetTop = contactSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeDestinationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeDestinationModal();
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.destination-card, .experience-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization - Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add current year to footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

console.log('Luxe Voyages website loaded successfully!');
