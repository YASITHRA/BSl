// Smooth scroll with navbar offset
const nav = document.querySelector('.navbar');
const navHeight = () => nav.getBoundingClientRect().height;

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight() - 12;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', id);
  });
});

// Gallery filter (accessible)
const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryImages = document.querySelectorAll('.gallery-grid img');

filterButtons.forEach(button => {
  button.addEventListener('click', () => applyFilter(button));
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyFilter(button);
    }
  });
});

function applyFilter(button) {
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');

  const filter = button.getAttribute('data-filter');
  galleryImages.forEach(img => {
    const category = img.getAttribute('data-category');
    const match = filter === 'all' || category === filter;
    img.classList.toggle('is-hidden', !match);
    img.setAttribute('aria-hidden', (!match).toString());
  });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Keyboard toggle for accessibility
menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navLinks.classList.toggle('active');
  }
});
