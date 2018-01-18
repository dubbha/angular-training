import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;

  constructor(
    public productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

}
