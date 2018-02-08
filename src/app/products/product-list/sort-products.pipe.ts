import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product/product.model';

@Pipe({
  name: 'sortProducts',
  pure: true,
})
export class SortProductsPipe implements PipeTransform {
  transform(productsArr: Array<Product>, key: string, order = 'desc'): Array<Product> {
    const arr = [...productsArr]; // keep it pure

    return arr.sort((a, b) => {
      switch (typeof a[key]) {
        case 'number':
          return order === 'asc' ? a[key] - b[key] : b[key] - a[key];

        case 'string':
          return order === 'asc' ? (a[key] >= b[key] ? 1 : -1) : (a[key] >= b[key] ? -1 : 1);

        case 'boolean':
          return order === 'asc' ? (a[key] ? 1 : -1) : (a[key] ? -1 : 1);

        default:  // do not attempt to sort complex types
          return 0;
      }
    });
  }
}

