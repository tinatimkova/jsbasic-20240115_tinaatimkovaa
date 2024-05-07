import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return; 

    let index = this.cartItems.findIndex(item => item.product.id == product.id);
    let cartItem = this.cartItems[index];
    index == -1 ? this.cartItems.push({ product: product, count: 1 }) : cartItem.count++;

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let index = this.cartItems.findIndex(item => item.product.id == productId);
    if (index == -1) return;
    let cartItem = this.cartItems[index];
    cartItem.count += amount;
    if (cartItem.count < 1) this.cartItems.splice(index, 1);

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length ? false : true;
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => count += item.count);
    return count;
  }

  getTotalPrice() {
    let cartTotal = 0;
    this.cartItems.forEach(item => cartTotal += item.product.price * item.count);
    return cartTotal;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price*count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");
    let body = document.createElement('div');
    this.cartItems.map((item, index) => { 
      body.insertAdjacentElement('beforeend', this.renderProduct(item.product, item.count));
      body.querySelectorAll('.cart-counter')[index].addEventListener('click', this.onCartCounterChange);
    });
    body.appendChild(this.renderOrderForm());
    body.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
    modal.setBody(body);
    modal.open();
  }

  onCartCounterChange = event => {
    let productId = event.target.closest('.cart-product').dataset.productId;
    let amount = event.target.getAttribute("alt") == 'plus' ? 1 : -1;
    this.updateProductCount(productId, amount);
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');

      let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count < 1) { 
        product.innerHTML = ''; 
      } 
      productCount.innerHTML = cartItem.count;
      productPrice.textContent = `€${(cartItem.product.price*cartItem.count).toFixed(2)}`;
      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    };

    if (this.cartItems.length == 0) { 
      document.querySelector('.modal').remove();
      document.body.classList.remove('is-modal-open');
    }
    this.cartIcon.update(this);
  }

  onSubmit = async(event) => {
   event.preventDefault();
   const submitButton = document.querySelector('button[type="submit"]');
   submitButton.classList.add('is-loading');
   const form = document.querySelector('.cart-form');
   let response = await fetch('https://httpbin.org/post', {
    method: "POST",
    body: new FormData(form)
    });

   let result = await response;

   if (result.ok) { // if request is successful
    document.querySelector('.modal__title').innerHTML = 'Success!'; // change title of the modal
    this.cartItems = []; // empty the cart
    this.cartIcon.update(this); // update cart icon
    // change body of the modal
    document.querySelector('.modal__body').innerHTML = `<div class="modal__body-inner"> 
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
  </div>`
   } else {
    // add an error handler later
    console.log("Error!!!");
   }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

