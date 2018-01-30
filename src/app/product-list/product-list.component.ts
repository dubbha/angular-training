import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;

  constructor(
    public productsService: ProductService,
  ) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

}
