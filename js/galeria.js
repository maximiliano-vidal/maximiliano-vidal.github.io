const carousel = document.querySelector('.carousel');
const slides = Array.from(carousel.children);
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let slideWidth = slides[0].getBoundingClientRect().width;
let currentIndex = 0;

// Ajustar el ancho de cada slide al tamaño de la ventana
slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

// Función para mover el carrusel al slide actual
const moveToSlide = (carousel, currentSlide, targetSlide) => {
  carousel.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('active');
  targetSlide.classList.add('active');
};

// Función para actualizar el ancho de los slides al redimensionar la ventana
const updateSlideWidth = () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
  });
  moveToSlide(carousel, slides[currentIndex], slides[currentIndex]);
};

// Evento click para el botón "Anterior"
prevButton.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex--;
  }
  moveToSlide(carousel, slides[(currentIndex + 1) % slides.length], slides[currentIndex]);
});

// Evento click para el botón "Siguiente"
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(carousel, slides[currentIndex - 1], slides[currentIndex]);
});

// Evento para redimensionar la ventana
window.addEventListener('resize', updateSlideWidth);

// Mostrar el primer slide como activo al cargar la página
slides[currentIndex].classList.add('active');
