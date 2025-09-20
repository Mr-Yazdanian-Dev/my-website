// Preloader Animation
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// Initialize AOS Animation
AOS.init({
  duration: 800,
  easing: 'ease-in-out-quart',
  once: true,
  mirror: false
});

// Typed.js Initialization
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: ['برنامه‌نویس', 'توسعه‌دهنده وب', 'فریلنسر'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }
});

// Theme Toggle Functionality
const setupThemeToggle = () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
  }

  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    if (isLight) {
      themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
      localStorage.setItem('theme', 'dark');
    }
  });
};

// Portfolio Filtering
const setupPortfolioFilter = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.dataset.filter;
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// Smooth Scrolling
const setupSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active nav item
        document.querySelectorAll('.sidebar a').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
};

// Mobile Menu Toggle
const setupMobileMenu = () => {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.sidebar');

  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      this.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (!sidebar.contains(e.target) && e.target !== mobileMenuToggle) {
        sidebar.classList.remove('active');
        mobileMenuToggle.classList.remove('open');
      }
    });
  }
};

// Back to Top Button
const setupBackToTop = () => {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;

  window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

// Skills Animation
const setupSkillsAnimation = () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const animateSkillBars = () => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const percent = bar.closest('.skill-item').querySelector('.skill-percent').textContent.replace('%', '');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = `${percent}%`;
      }, 100);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkillBars();
      observer.unobserve(skillsSection);
    }
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
};

// Contact Form Validation
const setupContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });

    // Validate fields
    const validateField = (fieldId, errorId, message) => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        document.getElementById(errorId).textContent = message;
        isValid = false;
      }
    };

    validateField('name', 'nameError', 'لطفاً نام خود را وارد کنید');
    validateField('lastname', 'lastnameError', 'لطفاً نام خانوادگی خود را وارد کنید');
    
    const email = document.getElementById('email');
    if (!email.value.trim()) {
      document.getElementById('emailError').textContent = 'لطفاً ایمیل خود را وارد کنید';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      document.getElementById('emailError').textContent = 'لطفاً یک ایمیل معتبر وارد کنید';
      isValid = false;
    }

    validateField('message', 'messageError', 'لطفاً پیام خود را وارد کنید');

    if (isValid) {
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> در حال ارسال...';
      
      // Simulate form submission
      setTimeout(() => {
        alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهم گرفت.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    }
  });
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
  setupThemeToggle();
  setupPortfolioFilter();
  setupSmoothScrolling();
  setupMobileMenu();
  setupBackToTop();
  setupSkillsAnimation();
  setupContactForm();
});