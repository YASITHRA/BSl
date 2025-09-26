// Smooth scroll for nav links
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetSelector = this.getAttribute('href');
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Gallery filter
const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryImages = document.querySelectorAll('.gallery-grid img');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    galleryImages.forEach(img => {
      const category = img.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
