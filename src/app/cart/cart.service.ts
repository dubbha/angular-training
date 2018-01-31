import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  products: Array<any> = [];

  constructor() { }

  addToCart(product: { id: number, name: string, price: number }) {
    this.products.find(item => item.id === product.id)
      ? this.updateQuantity(product.id)
      : this.products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
  }

  updateQuantity(id, way?) {
    switch (way) {
      case '-':
        this.products = this.products.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1
              }
            : item
        );
        break;
      case '+':
      default:
        this.products = this.products.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
    }
  }

  removeProduct(id) {
    this.products = this.products.filter(item => item.id !== id);
  }

  totalPrice() {
    return this.products.reduce((acc, cur) => acc += cur.price * cur.quantity, 0);
  }

  notifyServerOnInit(product) {
    console.log(`Product with ID ${product.id} added to cart`);
  }

  notifyServerOnDestroy(product) {
    console.log(`Product with ID ${product.id} removed from cart`);
  }
}
