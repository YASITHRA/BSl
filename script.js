document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const galleryImages = document.querySelectorAll(".gallery-grid img");

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      galleryImages.forEach(img => {
        const cat = img.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          img.classList.remove("hidden");
        } else {
          img.classList.add("hidden");
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".close");
  const nextBtn = lightbox.querySelector(".next");
  const prevBtn = lightbox.querySelector(".prev");

  let images = Array.from(galleryImages);
  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (img.classList.contains("hidden")) return;
      currentIndex = index;
      showImage();
      lightbox.classList.add("open");
    });
  });

  function showImage() {
    const current = images[currentIndex];
    const full = current.dataset.full || current.src;
    lightboxImg.src = full;
    lightboxImg.alt = current.alt;
  }

  closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
  nextBtn.addEventListener("click", () => {
    do { currentIndex = (currentIndex + 1) % images.length; }
    while (images[currentIndex].classList.contains("hidden"));
    showImage();
  });
  prevBtn.addEventListener("click", () => {
    do { currentIndex = (currentIndex - 1 + images.length) % images.length; }
    while (images[currentIndex].classList.contains("hidden"));
    showImage();
  });

  window.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") lightbox.classList.remove("open");
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
});
