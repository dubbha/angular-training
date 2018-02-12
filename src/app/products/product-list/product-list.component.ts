import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
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

  constructor(
    public productService: ProductService,
    private sortProductsPipe: SortProductsPipe,
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
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
