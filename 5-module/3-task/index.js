function initCarousel() {

  let carousel = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');

  let slidesCount = slides.length - 1;
  let index = 0;

  let moveRight = function() { 
    if (index < slidesCount) {
      carousel.style.transform = `translateX(-${carousel.offsetWidth*(++index)}px)`;
    }
  } 
    
  let moveLeft = function() {
    if (index > 0) { 
      carousel.style.transform = `translateX(-${carousel.offsetWidth*(--index)}px)`;
    }
    console.log(index);
  };

  document.querySelector('.carousel__arrow_right').addEventListener('click', moveRight);
  document.querySelector('.carousel__arrow_left').addEventListener('click', moveLeft);
}

