import { Injectable } from '@angular/core';

import { Product } from './product/product.model';
import { Category } from './product/product.enum';

const initProducts = [
  new Product(1, 'Liebherr Fridge', 'Cools your food', 800, true, Category.Household, ['metal', 'cooler'], [2]),
  new Product(2, 'Siemens Fridge', 'Cools your food', 750, true, Category.Household, ['metal', 'cooler'], [1]),
  new Product(3, 'TV 40 inches', 'Washes your brain', 300, true, Category.Electonics, ['plastic', 'glass'], [4, 5]),
  new Product(4, 'TV 50 inches', 'Washes your brain', 320, true, Category.Electonics, ['plastic', 'glass'], [3, 5]),
  new Product(5, 'TV 55 inches', 'Washes your brain', 320, false, Category.Electonics, ['plastic', 'glass'], [3, 4]),
];

@Injectable()
export class ProductService {
  products: Array<Product>;

  constructor() {
    this.products = initProducts;
  }

  getProducts(): Array<Product> {
    return this.products;
  }

  getProductById(id) {
    return this.getProducts().find(el => el.id === id);
  }

  removeProductMaterial(id, material) {
    if (!material) {
      return;
    }

    this.getProducts().map(product => {
      if (product.id === id) {
        product.materials = product.materials.filter(curMaterial => curMaterial !== material);
      } else {
        return product;
      }
    });
  }

  addProductMaterial(id, material) {
    if (!material) {
      return;
    }

    this.getProducts().map(product => {
      if (product.id === id && !product.materials.includes(material)) {
        product.materials.push(material);
      } else {
        return product;
      }
    });
  }

  addProduct(product) {
    if (!product.id) {
      product.id = this.getNextId();
    }
    this.products.push(product);
  }

  getNextId() {
    const arr = [...this.products];   // sort() would sort in place, make a copy
    arr.sort((a, b) => a.id - b.id);
    return arr.pop().id + 1;// next free ID
  }
}
