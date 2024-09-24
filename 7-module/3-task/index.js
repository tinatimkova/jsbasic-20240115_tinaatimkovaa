import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {

  elem = null;
  #steps = null;
  #value = null;

  constructor(steps, value = 1) {
    this.#steps = steps.steps;
    this.#value = value;
    this.elem = this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    let sliderSteps = this.elem.querySelector('.slider__steps');

    console.log(this.#steps);

    for (let step = 0; step < this.#steps; step++) { 
      sliderSteps.insertAdjacentHTML('beforeend', 
      step == this.#value ? '<span class="slider__step-active"></span>' : '<span></span>');
    }

    const initPosition = (this.#value/(this.#steps - 1))*100;

    this.elem.querySelector('.slider__thumb').style = `left: ${initPosition}%`;
    this.elem.querySelector('.slider__progress').style = `width: ${initPosition}%`;

    this.elem.addEventListener('click', this.#onClick);

    return this.elem;
  }

  #onClick = (e) => {
    let slider = this.elem.getBoundingClientRect(); 
    let pointerCoords = Math.round((e.pageX - slider.left)/slider.width*100);

    let { step, leftPercent} = this.#calcClosestStep(pointerCoords);
    this.#value = step;

    this.elem.querySelector('.slider__thumb').style.left = `${leftPercent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPercent}%`;
    this.elem.querySelector('.slider__value').innerText = this.#value;

    this.#moveStepActiveClass();
    
    let event = new CustomEvent('slider-change', {
      detail: this.#value,
      bubble: true
    })

    this.elem.dispatchEvent(event);
  }

  #moveStepActiveClass() {
    let stepActive = this.elem.querySelector('.slider__step-active');

    if (stepActive) stepActive.classList.remove('slider__step-active');
    const spans = Array.from(this.elem.querySelectorAll('.slider__steps span'));
    spans[this.#value].classList.add('slider__step-active');
  }

  #calcClosestStep (pointerCoords) {
    let sliderTrack = [];
    let step;
    let leftPercent;

    for (let i=0; i <= 100; i+=100/(this.#steps-1)) {
        sliderTrack.push(i);
    }

    sliderTrack.forEach((num, index, arr) => {

      if (index + 1 && num <= pointerCoords && arr[index+1] >= pointerCoords) {
        step = Math.abs(num - pointerCoords) < Math.abs(arr[index+1] - pointerCoords) ? index : index + 1; 
        leftPercent = sliderTrack[step];
      }      
    });

    return { step, leftPercent };
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
