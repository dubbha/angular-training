import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { Category } from '../models/product.enum';

@Injectable()
export class ProductsService {

  constructor() {}

  getProducts(): Array<Product> {
    return [
      new Product(1, 'Liebherr Fridge', 'Cools your food', 800, true, Category.Household, ['metal', 'cooler'], [2]),
      new Product(2, 'Siemens Fridge', 'Cools your food', 750, true, Category.Household, ['metal', 'cooler'], [1]),
      new Product(3, 'TV 40 inches', 'Washes your brain', 300, true, Category.Electonics, ['plastic', 'glass'], [4, 5]),
      new Product(4, 'TV 50 inches', 'Washes your brain', 320, true, Category.Electonics, ['plastic', 'glass'], [3, 5]),
      new Product(5, 'TV 55 inches', 'Washes your brain', 320, false, Category.Electonics, ['plastic', 'glass'], [3, 4]),
    ];
  }

  getProductById(id) {
    return this.getProducts().filter(el => el.id === id)[0];
  }

}
