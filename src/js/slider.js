document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.simple-carousel');
  if (carousel) simpleCarousel(carousel, 5000);
});

function simpleCarousel(carousel, intervalTime = 5000) {
  const slides = Array.from(carousel.querySelectorAll('ul li.slide'));
  if (!slides.length) return;

  let activeSlide = 0;

  function showSlide() {
    slides.forEach((slide, index) => {
      if (index === activeSlide) {
        slide.style.display = 'block';
        slide.style.opacity = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { slide.style.opacity = '1'; });
        });
      } else {
        slide.style.opacity = '0';
        setTimeout(() => { slide.style.display = 'none'; }, 400);
      }
    });
  }

  function moveRight() {
    activeSlide = (activeSlide + 1) % slides.length;
    showSlide();
  }

  function moveLeft() {
    activeSlide = (activeSlide - 1 + slides.length) % slides.length;
    showSlide();
  }

  showSlide();
  setInterval(moveRight, intervalTime);

  const prevBtn = carousel.querySelector('a.control_prev');
  const nextBtn = carousel.querySelector('a.control_next');

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); moveLeft(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); moveRight(); });
}
