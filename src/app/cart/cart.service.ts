import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  products: Array<any> = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor() { }

  addToCart(
    product: { id: number, name: string, price: number },
    quantity = 1,
  ) {
    this.products.find(item => item.id === product.id)
      ? this.updateQuantity(product.id, '+', quantity)
      : this.products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        });
    this.updateTotals();
  }

  updateQuantity(id, way, delta = 1) {
    switch (way) {
      case '-':
        this.products = this.products.map(item => {
          if (item.id === id && item.quantity > 1) {
            item.quantity -= delta;
          }
          return item;
        });
        break;
      case '+':
        this.products = this.products.map(item => {
          if (item.id === id) {
            item.quantity += delta;
          }
          return item;
        });
    }
    this.updateTotals();
  }

  removeProduct(id) {
    this.products = this.products.filter(item => item.id !== id);
    this.updateTotals();
  }

  updateTotalPrice() {
    this.totalPrice =  this.products.reduce((acc, cur) => acc += cur.price * cur.quantity, 0);
  }

  updateTotalQuantity() {
    this.totalQuantity = this.products.reduce((acc, cur) => acc += cur.quantity, 0);
  }

  updateTotals() {
    this.updateTotalPrice();
    this.updateTotalQuantity();
  }

  clear() {
    this.products = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
  }

  notifyServerOnInit(product) {
    console.log(`Product with ID ${product.id} added to cart`);
  }

  notifyServerOnDestroy(product) {
    console.log(`Product with ID ${product.id} removed from cart`);
  }
}
