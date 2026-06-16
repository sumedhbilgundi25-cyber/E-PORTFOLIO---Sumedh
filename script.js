/**
 * SUMEDH'S PORTFOLIO JAVASCRIPT
 * Features: Background canvas animation, sticky nav, hamburger, scrollspy, scroll reveal, form validation.
 * Theme: Light / Paper Theme customizations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Menu Toggle
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', toggleMenu);
        
        // Support accessibility trigger
        hamburgerBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    /* ==========================================================================
       2. Sticky Navbar & Navigation Spy (Scroll Active Highlight)
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        // Sticky Navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section ScrollSpy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on startup


    /* ==========================================================================
       3. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Unobserve if animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ==========================================================================
       4. Contact Form Validation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            let isValid = true;

            // Reset statuses
            successMsg.classList.remove('visible');
            errorMsg.classList.remove('visible');
            
            // Validate Name (Min 2 characters)
            if (nameInput.value.trim().length < 2) {
                setInputInvalid(nameInput);
                isValid = false;
            } else {
                setInputValid(nameInput);
            }

            // Validate Email (Regular expression matching)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                setInputInvalid(emailInput);
                isValid = false;
            } else {
                setInputValid(emailInput);
            }

            // Validate Message (Min 10 characters)
            if (messageInput.value.trim().length < 10) {
                setInputInvalid(messageInput);
                isValid = false;
            } else {
                setInputValid(messageInput);
            }

            // Handle submission display
            if (isValid) {
                // Success State
                successMsg.classList.add('visible');
                contactForm.reset();
                
                // Reset styling classes
                [nameInput, emailInput, messageInput].forEach(input => {
                    const group = input.closest('.form-group');
                    if (group) group.classList.remove('valid', 'invalid');
                });

                // Auto-fade success message
                setTimeout(() => {
                    successMsg.classList.remove('visible');
                }, 5000);
            } else {
                // Error state
                errorMsg.classList.add('visible');
            }
        });

        // Add real-time change listener to remove errors
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group && group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });
        });
    }

    function setInputInvalid(input) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.add('invalid');
            group.classList.remove('valid');
        }
    }

    function setInputValid(input) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.remove('invalid');
            group.classList.add('valid');
        }
    }


    /* ==========================================================================
       5. High-Performance HTML5 Background Canvas Animation (Paper Customizations)
       Features: Glowing particles, Animated grid, Moving neural networks, 
                 and floating shapes.
       ========================================================================== */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Particle Configuration
        const particleCount = Math.min(50, Math.floor((width * height) / 24000));
        const particles = [];
        const connectionDistance = 120;
        
        // Colors for Light Theme (Deep Contrast Blues and Purples)
        const colors = [
            'rgba(11, 87, 208, ',   // Deep Royal Blue
            'rgba(98, 0, 238, ',    // Deep Violet
            'rgba(79, 70, 229, '    // Deep Indigo
        ];

        // Grid Animation configuration
        let gridOffset = 0;
        const gridVelocity = 0.2;
        const gridSpacing = 60;

        // Floating geometric shapes configuration
        const shapesCount = 4;
        const shapes = [];

        // Handle Resizing
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Class representing single neural particle
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2.5 + 1.2;
                this.colorIndex = Math.floor(Math.random() * colors.length);
                this.pulseSpeed = 0.02 + Math.random() * 0.03;
                this.pulseOffset = Math.random() * Math.PI;
                this.alphaValue = 0.15 + Math.random() * 0.35; // Lower opacity for white background blend
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off boundaries
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                const pulse = Math.sin(Date.now() * this.pulseSpeed * 0.05 + this.pulseOffset);
                const currentAlpha = Math.max(0.1, this.alphaValue + pulse * 0.1);
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + Math.abs(pulse * 0.3), 0, Math.PI * 2);
                ctx.fillStyle = colors[this.colorIndex] + currentAlpha + ')';
                ctx.fill();
            }
        }

        // Class representing floating geometric tech elements
        class FloatingShape {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 25 + 15;
                this.vx = (Math.random() - 0.5) * 0.25;
                this.vy = (Math.random() - 0.5) * 0.25;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.005;
                this.type = Math.floor(Math.random() * 3); // 0: Triangle, 1: Square, 2: Hexagon
                this.color = colors[Math.floor(Math.random() * colors.length)] + '0.015)'; // Very faint fill
                this.borderColor = colors[Math.floor(Math.random() * colors.length)] + '0.08)'; // Subtle border
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;

                // Loop layout wrap
                if (this.x < -50) this.x = width + 50;
                if (this.x > width + 50) this.x = -50;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.borderColor;
                ctx.lineWidth = 1;

                ctx.beginPath();
                if (this.type === 0) {
                    ctx.moveTo(0, -this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                } else if (this.type === 1) {
                    ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
                } else {
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const hx = Math.cos(angle) * (this.size / 2);
                        const hy = Math.sin(angle) * (this.size / 2);
                        if (i === 0) ctx.moveTo(hx, hy);
                        else ctx.lineTo(hx, hy);
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Initialize geometric shapes
        for (let i = 0; i < shapesCount; i++) {
            shapes.push(new FloatingShape());
        }

        // Animation Loop
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Grid Pattern (Subtle blue-gray grid lines for graph paper style)
            gridOffset = (gridOffset + gridVelocity) % gridSpacing;
            ctx.strokeStyle = 'rgba(11, 87, 208, 0.035)'; 
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = gridOffset; x < width; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            // Horizontal lines
            for (let y = gridOffset; y < height; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // 2. Update and Draw Floating Shapes
            shapes.forEach(shape => {
                shape.update();
                shape.draw();
            });

            // 3. Draw connection lines (neural network)
            ctx.lineWidth = 0.8;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - (dist / connectionDistance)) * 0.12; // Lower connection opacity
                        ctx.strokeStyle = `rgba(11, 87, 208, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // 4. Update and Draw Particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        }

        // Start animating
        animate();
    }
});
