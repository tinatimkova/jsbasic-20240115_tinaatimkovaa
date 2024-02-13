function initCarousel() {

  let carousel = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');

  let slidesCount = slides.length - 1;
  let index = 0;

  index == 0 && (arrowLeft.style.display = 'none');

  let moveRight = function() {
    if (index < slidesCount) carousel.style.transform = `translateX(-${carousel.offsetWidth*(++index)}px)`;

    index != 0 && (arrowLeft.style.display = '');
    index == slidesCount && (arrowRight.style.display = 'none');
  } 
    
  let moveLeft = function() {
    if (index > 0) carousel.style.transform = `translateX(-${carousel.offsetWidth*(--index)}px)`;

    index == 0 && (arrowLeft.style.display = 'none');
    index !== slidesCount && (arrowRight.style.display = '');
  };

  arrowRight.addEventListener('click', moveRight);
  arrowLeft.addEventListener('click', moveLeft);
}

