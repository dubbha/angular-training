import { Injectable } from '@angular/core';
import { Product } from '../product/product.model';

@Injectable()
export class CartService {
  products: Array<Product> = [];

  constructor() { }

  addToCart(product: Product) {
    this.products.push(product);
  }
}
