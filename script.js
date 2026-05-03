// 1. Initialize AOS Animations (Professional Settings)
AOS.init({
    once: true, // Animates only once
    offset: 50, // Triggers earlier
    easing: 'ease-out-cubic', // Super smooth easing
});

// 2. Sticky Navbar Effect (Shrinks on scroll)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 3. Smart Counter Animation Logic
const counters = document.querySelectorAll('.counter');
const observerOptions = {
    root: null,
    threshold: 0.5,
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            // Depending on the number, adjust speed
            const duration = 2000; // 2 seconds total animation
            const increment = target / (duration / 16); // 60fps

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
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// 4. Form Submission Simulation (Business CTA)
document.getElementById('apptForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    // UI Feedback
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Slot...';
    btn.style.opacity = '0.8';

    setTimeout(() => {
        alert("Success! The appointment request has been securely sent to Krishnabhat Dental Clinic in Puttur.");
        this.reset();
        btn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed';
        btn.style.background = '#25D366'; // Turn green
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ''; // Reset
            btn.style.opacity = '1';
        }, 3000);
    }, 1500);
});
