// 1. Initialize AOS Animations strictly ONE TIME
AOS.init({
    once: true, // Only happens once
    offset: 50,
    duration: 800,
    easing: 'ease-out-cubic',
});

// 2. Mobile Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-item');

// Toggle menu on click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times'); // changes to X
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// 3. Navbar Shrink on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 4. FIXED Counter Animation (Will strictly count only once)
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If element is in view AND hasn't been animated yet
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const counter = entry.target;
            counter.classList.add('animated'); // Lock it so it never runs again
            
            const target = +counter.getAttribute('data-target');
            const duration = 2000; 
            const increment = target / (duration / 16); 

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (target > 100 ? '+' : '%');
                }
            };
            updateCounter();
            
            // Stop observing this element entirely
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// 5. Professional Form Submission Effect
document.getElementById('apptForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    // Changing button to loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Slot...';
    btn.style.opacity = '0.8';

    // Simulate Network Request
    setTimeout(() => {
        alert("Success! The appointment request has been securely sent to Krishnabhat Dental Clinic.");
        this.reset();
        
        // Success state
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Booking Confirmed';
        btn.style.background = '#25D366'; // WhatsApp Green for success
        btn.style.opacity = '1';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ''; // Resets to CSS default
        }, 3000);
    }, 1500);
});
