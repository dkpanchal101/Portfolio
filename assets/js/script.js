'use strict';

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navLinks = document.querySelectorAll('.navbar-link');
const themeToggleBtn = document.getElementById('theme-toggle');

navToggleBtn.addEventListener("click", function () {
  const isActive = header.classList.toggle("nav-active");
  this.classList.toggle("active");
  this.setAttribute('aria-expanded', String(isActive));
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.remove("nav-active");
    navToggleBtn.classList.remove("active");
    navToggleBtn.setAttribute('aria-expanded', 'false');
  });
}

/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Animate skill bars when in view
const skillSection = document.querySelector("#skills");
const skillBars = document.querySelectorAll(".skills-progress");

const animateSkills = () => {
  skillBars.forEach((bar) => {
    const targetWidth = bar.getAttribute("style").match(/(\d+)%/)[1];
    bar.style.width = "0%"; // Reset to 0

    setTimeout(() => {
      bar.style.width = targetWidth + "%"; // Animate to target width
    }, 100); // Small delay for smooth start
  });
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target); // Only run once
      }
    });
  },
  {
    threshold: 0.4,
  }
);

observer.observe(skillSection);

// Scrollspy: highlight active nav link based on visible section
const sections = document.querySelectorAll('section[id]');
const scrollSpy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      const link = document.querySelector(`.navbar-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((sec) => scrollSpy.observe(sec));

// Theme toggle with persistence
const applyTheme = (theme) => {
  const isLight = theme === 'light';
  document.documentElement.classList.toggle('light-theme', isLight);
  document.body.classList.toggle('light-theme', isLight);
  if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', String(isLight));
};

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggleBtn?.addEventListener('click', () => {
  const next = document.documentElement.classList.contains('light-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Project filters with smooth animations
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    
    const filter = btn.getAttribute('data-filter');
    const visibleCards = Array.from(projectCards).filter(card => {
      const category = card.getAttribute('data-category');
      return filter === 'all' || category === filter;
    });
    
    projectCards.forEach((card, index) => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      
      if (show) {
        const visibleIndex = visibleCards.indexOf(card);
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = '';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        }, visibleIndex * 100);
      } else {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Reveal on scroll with stagger effect
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach((el, index) => {
  el.style.setProperty('--delay', index);
  revealObserver.observe(el);
});
