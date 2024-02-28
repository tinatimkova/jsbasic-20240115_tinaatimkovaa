import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal = null;

  constructor() {
    this.#modal = createElement(this.#template());
  }

  setTitle(title) {
    this.#modal.querySelector('.modal__title').innerText = title;
  }

  setBody(body) {
    this.#modal.querySelector('.modal__body').appendChild(body);
  }

  open() {
    document.body.appendChild(this.#modal);
    document.body.classList.add('is-modal-open');

    let closeButton = this.#modal.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);
    document.body.addEventListener('keydown', this.#checkKey);
  }

  close = () => {
    const modal = document.body.querySelector('.modal');
    if (modal) modal.remove();
    document.body.classList.remove('is-modal-open');
    document.body.removeEventListener('keydown', this.#checkKey);
  }

  #checkKey = (event) => {
    if (event.code === 'Escape') this.close();
  }

  #template() {
    return `<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  </div>`;
  } 
}
