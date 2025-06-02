document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio script loaded.");
    
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
            
            // Update active state
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Time travel easter egg
    const timeTravelElement = document.querySelector('.time-travel');
    if (timeTravelElement) {
        timeTravelElement.addEventListener('click', () => {
            // You could add a fun animation or redirect to an older version
            alert('Time travel initiated! Unfortunately, the TARDIS is currently in maintenance.');
        });
    }
    
    // Hover effects for project cards removed
    
    // Mouse tracking glow effect
    const createGlowEffect = () => {
        // Create the glow element
        const glow = document.createElement('div');
        glow.classList.add('glow-effect');
        document.body.appendChild(glow);
        
        // Mouse movement handler
        document.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
        
        // Add special effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .experience-item, .writing-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                glow.classList.add('glow-active');
            });
            
            element.addEventListener('mouseleave', () => {
                glow.classList.remove('glow-active');
            });
        });
    };
    
    // Initialize the glow effect if not on mobile
    if (window.innerWidth > 768) {
        createGlowEffect();
    }
});