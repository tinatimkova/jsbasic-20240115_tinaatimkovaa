export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    let total = 0;
    this.cartItems.forEach(item => total += item.product.price * item.count);
    return total;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

