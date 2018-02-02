import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';

import { Product } from './product.model';
import { Category } from './product.enum';
import { ProductService } from './product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
  ) {}

  ngOnInit() {}

  buyProduct() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
    });
  }

  getAlternative(id) {
    return this.productService.getProductById(id);
  }
}
