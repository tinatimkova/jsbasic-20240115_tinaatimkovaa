import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  elem = null;
  #products = null;
  #filteredItems = null;
  filters = null;

  constructor(products) {
    this.#products = products;
    this.#filteredItems = this.#filteredItems;
    this.filters = {};
    this.elem = this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    this.#displayCards(this.#products);

    return this.elem;
  }

  #displayCards(products) {
    console.log(products.length);
    products.map(product => {
      let card = new ProductCard(product).elem;
      this.elem.querySelector('.products-grid__inner').append(card);
    })
  }


  #template() {
    return `<div class="products-grid">
              <div class="products-grid__inner">
              </div>
            </div>`
  }

  updateFilter(filters) {
      Object.assign(this.filters, filters);

      let activeFilters = {};
      let keyCount = 0;
  
      for (let key in this.filters) {
        if (this.filters[key]) {
          activeFilters[key] = this.filters[key];
          keyCount++;
        };
      }
  
      this.#filteredItems = this.#products.filter(function(product) {
        let matches = 0;
        for (let filter in activeFilters) {
          switch(filter) {
            case 'noNuts':
              activeFilters.noNuts == !product.nuts && matches++
              break;
            case 'vegeterianOnly':
              activeFilters.vegeterianOnly == product.vegeterian && matches++
              break;
            case 'maxSpiciness':
              activeFilters.maxSpiciness >= product.spiciness && matches++
              break;
            case 'category':
              activeFilters.category == product.category && matches ++
              break;
        }   
      }
        return keyCount == matches;
      })

      if (this.#products.length != this.#filteredItems.length) {
        this.elem.querySelector('.products-grid__inner').innerHTML = '';
        this.#displayCards(this.#filteredItems);
      }
    } 

  }
