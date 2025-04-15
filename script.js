document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark');
  }
  
  themeToggle.addEventListener('click', function() {
    // Add transition flash effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = body.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(overlay);
    
    // Flash effect
    setTimeout(() => {
      overlay.style.opacity = '0.5';
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 300);
      }, 100);
    }, 0);
    
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });
  
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.add('open');
  });
  
  closeMobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });
  
  // Close mobile menu when navigation link is clicked
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });
  
  // Active section highlighting for navigation
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navDots = document.querySelectorAll('.nav-dot');
  
  function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    navDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('href') === `#${current}`) {
        dot.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Set initial active link
  
  // Typing effect for hero section
  const typedTextElement = document.getElementById('typed-text');
  const textArray = ['Web Developer', 'MCA Student', 'UI/UX Enthusiast'];
  let textIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textIndex].length) {
      typedTextElement.textContent = textArray[textIndex].substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      typedTextElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }
  
  setTimeout(type, 1000);
  
  // Animate progress bars when in viewport
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = `${progress}%`;
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
  
  // Add scroll animations to elements
  const animateElements = () => {
    // Configuration for different sections
    const animations = [
      { selector: '.card', animation: 'animate-scale-up' },
      { selector: '.section-title', animation: 'animate-fade-in' },
      { selector: '.section-divider', animation: 'animate-slide-up', delay: 'delay-100' },
      { selector: '.hero-greeting', animation: 'animate-slide-left', delay: 'delay-100' },
      { selector: '.hero-name', animation: 'animate-slide-left', delay: 'delay-200' },
      { selector: '.hero-description', animation: 'animate-slide-left', delay: 'delay-300' },
      { selector: '.hero-buttons', animation: 'animate-slide-left', delay: 'delay-400' },
      { selector: '.hero-image', animation: 'animate-slide-right' },
      { selector: '.timeline-item', animation: 'animate-fade-in' },
      { selector: '.education-item', animation: 'animate-slide-left' },
      { selector: '.tech-icon', animation: 'animate-scale-up' },
      { selector: '.personality-tags .tag', animation: 'animate-fade-in' },
      { selector: '.project-card', animation: 'animate-scale-up' },
      { selector: '.contact-item', animation: 'animate-slide-up' },
      { selector: '.social-link', animation: 'animate-fade-in' },
    ];
    
    // Create Intersection Observer for animation
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find the correct animation for this element
          for (const config of animations) {
            if (entry.target.matches(config.selector)) {
              entry.target.classList.add(config.animation);
              if (config.delay) {
                entry.target.classList.add(config.delay);
              }
              // Unobserve after animating
              animationObserver.unobserve(entry.target);
              break;
            }
          }
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all elements that need animations
    animations.forEach(config => {
      document.querySelectorAll(config.selector).forEach(el => {
        animationObserver.observe(el);
      });
    });
  };
  
  // Initialize animations
  animateElements();
  
  // Contact form submission handling
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    
    // Simulate form submission (in a real app, you'd send data to a server here)
    setTimeout(() => {
      // Show success message
      alert('Message sent successfully!');
      
      // Reset form
      contactForm.reset();
      
      // Restore button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }, 1500);
  });
});
