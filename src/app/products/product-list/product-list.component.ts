import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, ProductsState } from './../../+store';

import { Product } from '../product/product.model';
import { ProductService } from '../products.service';
import { SortProductsPipe } from './sort-products.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
  providers: [SortProductsPipe]
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  key: string;
  order = 'desc';
  productsState$: Store<ProductsState>;

  constructor(
    private store: Store<AppState>,
    public productService: ProductService,
    private sortProductsPipe: SortProductsPipe,
  ) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.productsState$ = this.store.select('products');

    this.productService.getProducts()
      .then(products => this.products = products);
  }

  sortProducts(key) {
    if (this.key === key) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.key = key;       // save key
      this.order = 'desc';  // reset order
    }

    this.products = this.sortProductsPipe.transform(this.products, key, this.order);
  }
}
