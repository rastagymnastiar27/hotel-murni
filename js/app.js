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

    // Flatpickr initialization
    const jakartaNow = getJakartaTime();

    flatpickr("#check-in-date", {
        dateFormat: "d M",
        defaultDate: jakartaNow,
    });
    flatpickr("#check-out-date", {
        dateFormat: "d M",
        defaultDate: new Date(jakartaNow.getTime() + 86400000),
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

// Guests counter logic
let guests = 0;
function increaseGuests() {
    guests++;
    document.getElementById("guest-count").innerText = guests;
}
function decreaseGuests() {
    if (guests > 1) {
        guests--;
        document.getElementById("guest-count").innerText = guests;
    }
}

function getJakartaTime() {
    const jakartaTimezone = 'Asia/Jakarta';
    const date = new Date();
    return new Date(date.toLocaleString('en-US', { timeZone: jakartaTimezone }));
}

const submitA = document.querySelector('#submitA')

submitA.addEventListener('click', function() {
    if (guests >= 1 && guests <= 4){
        Swal.fire({
            icon: 'success',
            title: 'Room Available',
            text: 'Hi, welcome to Hotel Murni!',
            timer: 10000,
        })
    } else if (guests > 4) {
        Swal.fire({
            icon: 'error',
            title: 'Room Not Available',
            text: 'Hi, sorry but our room is max for 4 guests!',
            timer: 10000,
        })
    } else if (guests === 0){
        Swal.fire({
            icon: 'error',
            title: 'Room Not Available',
            text: 'Hi, please input the correct guests number or choose another date!',
            timer: 10000,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Unknown Error',
            text: 'Hi, please comeback later!',
            timer: 10000,
        })
    }
})