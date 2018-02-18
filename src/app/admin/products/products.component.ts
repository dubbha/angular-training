import { Component, OnInit } from '@angular/core';

import { Product } from '../../products/product/product.model';
import { ProductService } from '../../products/products.service';
import { SortProductsPipe } from '../../products/product-list/sort-products.pipe';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  providers: [SortProductsPipe],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  key: string;
  order = 'desc';

  constructor(
    public productService: ProductService,
    private sortProductsPipe: SortProductsPipe,
  ) { }

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