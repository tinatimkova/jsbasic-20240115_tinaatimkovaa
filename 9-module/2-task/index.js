import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.productsGrid = this.productsGrid;
    this.stepSlider = this.stepSlider;
    this.ribbonMenu = this.ribbonMenu;
    this.cartIcon = this.cartIcon;
    this.cart = this.cart;
  }

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider(5);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);


    let cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    this.cart = new Cart(cartIcon);

    let response = await fetch('products.json');
    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    let grid = document.querySelector('[data-products-grid-holder]');
    grid.firstElementChild.remove();
    grid.append(this.productsGrid.elem);

    let nutsInput = document.getElementById('nuts-checkbox');
    let vegeterianInput = document.getElementById('vegeterian-checkbox');

    this.productsGrid.updateFilter({
      noNuts: nutsInput.checked,
      vegeterianOnly: vegeterianInput.checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', event => {
      let productToAdd = products.find(product => product.id == event.detail);
      this.cart.addProduct(productToAdd);
    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => this.productsGrid.updateFilter({ category: event.detail }));

    nutsInput.addEventListener('change', () => this.productsGrid.updateFilter({
      noNuts: nutsInput.checked,
    }));

    vegeterianInput.addEventListener('change', () => this.productsGrid.updateFilter({
      vegeterianOnly: vegeterianInput.checked,
    }));
  }
}
