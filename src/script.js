//
// Alan Elliott Merschen Personal Site - Vanilla JavaScript
//
// Key Responsibilities:
// 1. Smooth Scrolling for all internal links.
// 2. Overlay Menu Toggle (Hamburger/ESC key).
// 3. Hero Panels Animation Trigger via IntersectionObserver.
// 4. Basic Contact Form Validation.
//

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Smooth Scrolling Implementation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only handle internal anchor links
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // If this click came from the overlay menu, close it
                if (this.hasAttribute('data-nav-link')) {
                    closeMenu();
                }
            }
        });
    });

    // --- 2. Overlay Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const overlayMenu = document.getElementById('overlay-menu');
    const body = document.body;

    // Helper function to open the menu
    const openMenu = () => {
        overlayMenu.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        overlayMenu.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Helper function to close the menu
    const closeMenu = () => {
        overlayMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        overlayMenu.setAttribute('aria-hidden', 'true');
        body.style.overflow = ''; // Restore background scrolling
        // Ensure focus returns to the toggle button
        menuToggle.focus();
    };

    // Toggle logic on click
    menuToggle.addEventListener('click', () => {
        if (overlayMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlayMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });


    // --- 3. Hero Panels Animation Trigger (IntersectionObserver) ---
    const heroPanels = document.getElementById('hero-panels');
    
    // Function to run the animation
    const animatePanels = () => {
        heroPanels.classList.add('is-animated');
    };

    if ('IntersectionObserver' in window) {
        // Create an observer instance
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation when hero section enters viewport
                    animatePanels();
                    // Stop observing after the animation is triggered
                    obs.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the section is visible
        });

        // Start observing the hero panels element
        observer.observe(heroPanels);
    } else {
        // Fallback: Run animation on page load if IntersectionObserver isn't supported
        console.warn('IntersectionObserver not supported, running hero animation on load.');
        animatePanels();
    }


    // --- 4. Basic Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop default form submission

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation checks
        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Please fill in all required fields (Name, Email, Message).';
            formMessage.classList.remove('success');
            return;
        }

        if (!isValidEmail(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.remove('success');
            return;
        }

        // Simulate successful submission (as no backend is available)
        formMessage.textContent = 'Thank you for your message! Alan will be in touch soon.';
        formMessage.classList.add('success');
        
        // Clear the form fields
        contactForm.reset();

        // In a real application, you would make an AJAX call here (fetch or XMLHttpRequest)
        // Example:
        /*
        fetch('your-api-endpoint', {
            method: 'POST',
            body: new FormData(contactForm)
        })
        .then(response => response.json())
        .then(data => {
            // Handle success
        })
        .catch(error => {
            // Handle error
        });
        */
    });
    
    // Simple email validation regex
    function isValidEmail(email) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    }

});