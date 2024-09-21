document.addEventListener("DOMContentLoaded", () => {
    // 1. Hover effect for nav links and buttons
    const buttons = document.querySelectorAll('button, .resume-btn');
  
    buttons.forEach(button => {
        button.style.transition = 'background-color 0.3s ease, transform 0.3s ease-in-out';
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#E6C9A8'; 
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '';
            button.style.transform = 'scale(1)';
        });
    });

    

    // 2. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
  
    // 3. Scroll-triggered animations (fade-in effect)
    const sections = document.querySelectorAll('header, footer, container, home-content, section, .about-section, .work-section, .contact-section');
    const fadeInElements = Array.from(sections);
  
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
  
    fadeInElements.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 3s ease-out, transform 3s ease-out';
        observer.observe(section);
    });
  
    let header = document.querySelector('header');
  
    header.classList.toggle('sticky', window.scrollY > 100);
    
    document.getElementById("increase").addEventListener("click", function() {
        let guestInput = document.getElementById("guests");
        let guestCount = parseInt(guestInput.value, 10);
        guestInput.value = guestCount + 1;
      });
      
      document.getElementById("decrease").addEventListener("click", function() {
        let guestInput = document.getElementById("guests");
        let guestCount = parseInt(guestInput.value, 10);
        if (guestCount > 1) {
            guestInput.value = guestCount - 1;
        }
      });
      
  
    let footer = document.querySelector('footer');
  
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
    
  
    
  });
  