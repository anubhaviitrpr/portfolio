document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio script loaded.");
    
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const mobileSectionTitles = document.querySelectorAll('.mobile-section-title');
      // Add Intersection Observer for tech stack animations
    const techLists = document.querySelectorAll('.tech-list');
    const techObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.1}s`;
                        item.style.animationPlayState = 'running';
                    });
                    techObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    
    techLists.forEach(list => {
        techObserver.observe(list);
    });
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust detection threshold based on screen size
            const threshold = window.innerWidth <= 768 ? 100 : 200;
            
            if (window.scrollY >= (sectionTop - threshold)) {
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
            
            if (targetSection) {
                // Get section's position
                const rect = targetSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Adjust offset based on screen size
                // On mobile: ensure section header is fully visible at the top
                // On desktop: position section at the top of the viewport with just a slight margin
                const headerHeight = window.innerWidth <= 768 ? 10 : 50;
                
                window.scrollTo({
                    top: rect.top + scrollTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
                
                // Update active state
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // For mobile, close mobile navigation if it exists (future-proofing)
                if (window.innerWidth <= 768) {
                    // This will help if a mobile menu toggle is added later
                    const mobileNav = document.querySelector('.mobile-navigation');
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                    }
                }
            }
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
    
    // Make section titles clickable on mobile
    mobileSectionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const sectionId = title.parentElement.getAttribute('id');
            const section = document.getElementById(sectionId);
            
            // Add a small visual feedback on click
            title.style.transform = 'scale(0.98)';
            setTimeout(() => {
                title.style.transform = 'scale(1)';
            }, 150);
            
            if (section) {
                // Get section's position
                const rect = section.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Scroll to section with offset for the header
                window.scrollTo({
                    top: rect.top + scrollTop - (window.innerWidth <= 768 ? 10 : 50), // Consistent with nav links
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, `#${sectionId}`);
            }
            
            // Update active state in nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    });
    
    // Hover effects for project cards removed
    
    // Mouse tracking glow effect
    const createGlowEffect = () => {
        // Create the glow element
        const glow = document.createElement('div');
        glow.classList.add('glow-effect');
        document.body.appendChild(glow);
        
        // Mouse movement handler - simple implementation
        document.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
        
        // Add special effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .experience-item, .writing-item, .skill-category, h3, .inline-link, .highlight');
        
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
    
    // Add IntersectionObserver for section titles on mobile
    if (window.innerWidth <= 768) {
        const sectionTitleObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        // Observe all mobile section titles
        mobileSectionTitles.forEach(title => {
            // Initially set them invisible
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
            title.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            sectionTitleObserver.observe(title);
        });
    }
});