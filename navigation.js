// Enhanced navigation script for smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    console.log("Navigation script loaded");
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active state
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                  // Get position and apply proper offset
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 20 : 150; // Increased desktop offset to ensure previous section is not visible
                
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle mobile section title clicks
    const mobileTitles = document.querySelectorAll('.mobile-section-title');
    mobileTitles.forEach(title => {
        title.addEventListener('click', function() {
            const section = this.closest('section');
            if (section) {
                // Visual feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Find corresponding nav link and update active state
                const sectionId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Smooth scroll to the section
                const y = section.getBoundingClientRect().top + window.pageYOffset - 20;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, `#${sectionId}`);
            }
        });
    });
    
    // Handle scroll to update active nav link
    function updateActiveNavOnScroll() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop - 250) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    // Execute once on load to set the initial active state
    updateActiveNavOnScroll();
});
