import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {

  elem = null;
  #steps = null;
  #value = null;

  constructor({ steps, value = 3 }) {
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

    this.elem.querySelector('.slider__thumb').style = `left: ${(this.#value/(this.#steps - 1))*100}%`;
    this.elem.querySelector('.slider__progress').style = `width: ${(this.#value/(this.#steps - 1))*100}%`;

    this.elem.addEventListener('click', this.#moveSlider);

    return this.elem;
  }

  #moveSlider = (e) => {
    let sliderWidth = e.currentTarget.clientWidth;
    let pointerLeft = e.clientX - e.currentTarget.getBoundingClientRect().left;
    let pointerPosition = Math.round(pointerLeft/sliderWidth*100);

    let step = this.#calcClosestStep(pointerPosition).step;
    let leftPercent = this.#calcClosestStep(pointerPosition).leftPercent;

    this.elem.querySelector('.slider__thumb').style = `left: ${leftPercent}%`;
    this.elem.querySelector('.slider__progress').style = `width: ${leftPercent}%`;
    this.elem.querySelector('.slider__value').innerText = step;

    let event = new CustomEvent('slider-change', {
      detail: step,
      bubble: true
    })

    this.elem.dispatchEvent(event);
  }

  #calcClosestStep (pointerPosition) {
    let sliderScale = [];
    let step;
    let leftPercent;

    for (let step=0; step <= 100; step+=100/(this.#steps-1)) {
        sliderScale.push(step);
    }

    sliderScale.forEach((num, i, arr) => {
      if (i + 1 && num <= pointerPosition && arr[i+1] >= pointerPosition) {
      step = Math.abs(num - pointerPosition) < Math.abs(arr[i+1] - pointerPosition) ? i: i+1; 
      leftPercent = sliderScale[step];
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
