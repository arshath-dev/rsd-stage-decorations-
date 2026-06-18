import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Select all elements with animation classes
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right, .hero-content h1');
  animatedElements.forEach(el => observer.observe(el));
  
  // Smooth scrolling for anchor links (fallback for same page links)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navbarHeight = navbar?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Also close mobile menu if an anchor link is clicked
          const mobileMenuBtn = document.getElementById('mobile-menu-btn');
          const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
          if (mobileMenuBtn && mobileNavOverlay) {
             mobileMenuBtn.classList.remove('open');
             mobileNavOverlay.classList.remove('active');
             document.body.classList.remove('no-scroll');
          }
        }
      }
    });
  });

  // Custom Cursor
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      // Add slight delay to outline for smooth effect
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Add hover state to interactive elements
    const interactives = document.querySelectorAll('a, button, .glass-card, .masonry-item, .mobile-menu-btn');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // Parallax Effect for Hero Background & Images
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Hero Parallax
    const heroBg = document.getElementById('hero-bg');
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
    
    // Asymmetric Images Parallax
    const parallaxImgs = document.querySelectorAll<HTMLElement>('.parallax-img img');
    parallaxImgs.forEach(img => {
      const rect = img.parentElement?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = 0.15;
        const yPos = (window.innerHeight - rect.top) * speed;
        img.style.transform = `translateY(${yPos}px) scale(1.05)`;
      }
    });
  });

  // Magnetic Button Effect (WhatsApp)
  const magneticBtn = document.querySelector<HTMLElement>('.magnetic');
  if (magneticBtn && window.matchMedia("(pointer: fine)").matches) {
    magneticBtn.addEventListener('mousemove', (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    magneticBtn.addEventListener('mouseleave', () => {
      magneticBtn.style.transform = `translate(0px, 0px)`;
    });
  }

  // Mobile Menu Toggle Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  if (mobileMenuBtn && mobileNavOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('open');
      mobileNavOverlay.classList.toggle('active');
      const isMenuOpen = mobileNavOverlay.classList.contains('active');
      document.body.classList.toggle('no-scroll', isMenuOpen);
    });
  }

  // Trigger initial animations on load
  setTimeout(() => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) heroTitle.classList.add('visible');
  }, 100);
});
