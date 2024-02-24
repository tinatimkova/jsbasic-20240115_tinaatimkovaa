import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  #elem = null; 
  #slides = null;
  #slideIndex = 0;
  #rightArrow = null;
  #leftArrow = null;
  #carousel = null;

  constructor(slides) {
    this.#slides = slides;
    this.#elem = this.#render();
  }

  get elem() {
    return this.#elem;
  }

  #onButtonClick = (e) => {

    const event = new CustomEvent('product-add', {
      detail: e.target.closest('.carousel__slide').dataset.id,
      bubbles: true
    });

    this.#elem.dispatchEvent(event);
  }

  #onMoveRight = () => {
    if (this.#slideIndex < this.#slides.length - 1) this.#carousel.style.transform = `translateX(-${this.#carousel.offsetWidth*(++this.#slideIndex)}px)`;

    this.#slideIndex != 0 && (this.#leftArrow.style.display = '');
    this.#slideIndex == (this.#slides.length - 1) && (this.#rightArrow.style.display = 'none');
  } 
    
  #onMoveLeft = () => {
    if (this.#slideIndex > 0) this.#carousel.style.transform = `translateX(-${this.#carousel.offsetWidth*(--this.#slideIndex)}px)`;

    this.#slideIndex == 0 && (this.#leftArrow.style.display = 'none');
    this.#slideIndex !== this.#slides.length && (this.#rightArrow.style.display = '');

  };

  #render() {
    this.#elem = createElement(this.#template());

    this.#rightArrow = this.#elem.querySelector('.carousel__arrow_right');
    this.#leftArrow = this.#elem.querySelector('.carousel__arrow_left');
    this.#carousel = this.#elem.querySelector('.carousel__inner');

    this.#leftArrow.style.display = 'none';

    const buttons = this.#elem.querySelectorAll('.carousel__button');
    for (let button of buttons) {
      button.addEventListener('click', this.#onButtonClick);
    }

    this.#rightArrow.addEventListener('click', this.#onMoveRight);
    this.#leftArrow.addEventListener('click', this.#onMoveLeft);

    return this.#elem;
  }

  #template() {
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

    <div class="carousel__inner">
    ${this.#slides.map(slide =>
      `<div class="carousel__slide" data-id=${slide.id}>
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`).join('')}
    </div>
    </div>`
  }
}
