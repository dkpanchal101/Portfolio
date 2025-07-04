'use strict';

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
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
