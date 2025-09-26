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

// Gallery filter (simple like first version)
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

menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navLinks.classList.toggle('active');
  }
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;
let visibleImages = [];

// open lightbox
galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    visibleImages = Array.from(galleryImages).filter(img => !img.classList.contains('hidden'));
    currentIndex = visibleImages.indexOf(img);
    showImage();
    lightbox.style.display = 'flex';
  });
});

// close
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.style.display = 'none';
});

// next/prev
function showImage() {
  lightboxImg.src = visibleImages[currentIndex].src;
  lightboxImg.alt = visibleImages[currentIndex].alt;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage();
});

// keyboard arrows
window.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % visibleImages.length;
      showImage();
    }
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
      showImage();
    }
  }
});
