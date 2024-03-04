import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  #steps = null;
  #value = null;

  constructor({ steps, value = 1 }) {
    this.#steps = steps;
    this.#value = value;
    this.elem = this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    let sliderSteps = this.elem.querySelector('.slider__steps');

    for (let step = 0; step < this.#steps; step++) { 
      sliderSteps.insertAdjacentHTML('beforeend', 
      step == this.#value ? '<span class="slider__step-active"></span>' : '<span></span>');
    }

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = `${this.#value/(this.#steps-1)*100}%`;
    thumb.addEventListener('pointerdown', this.#onDown);
    thumb.ondragstart = () => false;

    this.elem.querySelector('.slider__progress').style.width = `${(this.#value/(this.#steps - 1))*100}%`;

    this.elem.addEventListener('click', this.#onClick);

    return this.elem;
  }

  #onClick = (e) => {
    let positionLeft = Math.round((e.pageX - e.currentTarget.getBoundingClientRect().left)/e.currentTarget.getBoundingClientRect().width*100);

    let { step, leftPercent} = this.#calcClosestStep(positionLeft);
    this.#value = step;
    this.elem.querySelector('.slider__thumb').style.left = `${leftPercent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPercent}%`;

    this.elem.querySelector('.slider__value').innerHTML = this.#value;

    this.#moveStepActiveClass();

    let event = new CustomEvent('slider-change', {
      detail: this.#value,
      bubble: true
    })

    this.elem.dispatchEvent(event);
  }

  #onDown = () => {
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, { once: true });
  }

  #onMove = (event) => {
    event.preventDefault();
    const thumb = this.elem.querySelector('.slider__thumb');
    let { left, width, right } = this.elem.getBoundingClientRect();
    let positionLeft = Math.round((event.pageX - left)/width*100);
    let { step } = this.#calcClosestStep(positionLeft);

    if (left <= event.pageX && right >= event.pageX) {
      thumb.style.left = `${positionLeft}%`;
      this.elem.querySelector('.slider__progress').style.width = `${positionLeft}%`;
      this.#value = step;
      this.elem.querySelector('.slider__value').innerHTML = this.#value;
    }
  }

  #onUp = (e) => {
    e.preventDefault();
    this.#moveStepActiveClass();
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.#onMove);

    let event = new CustomEvent('slider-change', { 
      detail: this.#value,
      bubbles: true
    })

    this.elem.dispatchEvent(event);
  }

  #calcClosestStep (pointerCoords) {
    let sliderPercentScale = [];
    let step;
    let leftPercent;

    for (let i=0; i <= 100; i+=100/(this.#steps-1)) {
        sliderPercentScale.push(i);
    }

    sliderPercentScale.forEach((num, index, arr) => {

      if (index + 1 && num <= pointerCoords && arr[index+1] >= pointerCoords) {
        step = Math.abs(num - pointerCoords) < Math.abs(arr[index+1] - pointerCoords) ? index : index + 1; 
        leftPercent = sliderPercentScale[step];
      }      
    });

    return { step, leftPercent };
  }

  #moveStepActiveClass() {
    let stepActive = this.elem.querySelector('.slider__step-active');

    if (stepActive) stepActive.classList.remove('slider__step-active');
    const spans = Array.from(this.elem.querySelectorAll('.slider__steps span'));
    spans[this.#value].classList.add('slider__step-active');
  }

  #template() {
    return `<div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.#value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps"></div>  
      </div>`
  }
}
