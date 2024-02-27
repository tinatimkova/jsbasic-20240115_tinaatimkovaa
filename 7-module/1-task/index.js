import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  elem = null;
  #categories = null;
  #ribbonInner = null;
  #arrowRight = null;
  #arrowLeft = null;

  constructor(categories) {
    this.#categories = categories;
    this.elem = this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    this.#ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.#arrowRight = this.elem.querySelector('.ribbon__arrow_right')
    this.#arrowLeft = this.elem.querySelector('.ribbon__arrow_left')

    this.#arrowRight.addEventListener('click', this.#scroll);
    this.#arrowLeft.addEventListener('click', this.#scroll);

    const ribbonItems = this.elem.querySelectorAll('.ribbon__item');
    ribbonItems.forEach(item => item.addEventListener('click', this.#selectCategory));

    return this.elem;
  }

  #scrollState = () => {
    let scrollLeft = this.#ribbonInner.scrollLeft;
    let scrollWidth = this.#ribbonInner.scrollWidth;
    let clientWidth = this.#ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.#arrowRight.classList.toggle('ribbon__arrow_visible', scrollRight > 1);
   
    this.#arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
     
  }

  #scroll = (event) => {
    let isArrowLeft = [...event.target.closest('button').classList].includes('ribbon__arrow_left');
    let isArrowRight = [...event.target.closest('button').classList].includes('ribbon__arrow_right');

    if (isArrowRight) this.#ribbonInner.scrollBy(350, 0);  
    if (isArrowLeft) this.#ribbonInner.scrollBy(-350, 0);
  
    this.#ribbonInner.addEventListener('scroll', this.#scrollState);
  }

  #selectCategory = (e) => {
    e.preventDefault();
    let selectedItem = this.elem.getElementsByClassName('ribbon__item_active')[0];
    if (selectedItem) selectedItem.classList.remove('ribbon__item_active');

    e.target.classList.add('ribbon__item_active');

    let event = new CustomEvent('ribbon-select', {
      detail: e.target.dataset.id, 
      bubbles: true
    })

    this.elem.dispatchEvent(event);
  }

  #template() {
    return `<div class="ribbon">

    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    ${this.#categories.map(category => 
      `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`).join('')}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`
  }
}
