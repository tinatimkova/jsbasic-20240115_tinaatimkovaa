import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {

  #initialTopCoord = null;

  constructor() {
    this.render();
    this.#initialTopCoord = this.#initialTopCoord;
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetWidth) {

      let offsetY = window.pageYOffSet || window.scrollY;

      if (!this.#initialTopCoord) this.#initialTopCoord = this.elem.getBoundingClientRect().top + offsetY;

      let leftIndent = Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      )+ 'px';

        if (offsetY > this.#initialTopCoord) {
          Object.assign(this.elem.style, {
            position: 'fixed',
            top: '50px',
            zIndex: 1e3,
            left: leftIndent
          });
        } else {
          Object.assign(this.elem.style, {
            position: '',
            top: '',
            zIndex: '',
            left: ''
          });
        }

        if (document.documentElement.clientWidth <= 767) {
          Object.assign(this.elem.style, {
            position: '',
            top: '',
            zIndex: '',
            left: ''
          });
        }
      }
    }
}
