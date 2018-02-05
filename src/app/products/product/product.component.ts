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
  quantity = 1;

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
    },
    this.quantity);
  }

  onChangeQuantity(event) {
    const num = Number(event.target.value);

    if (!Number.isNaN(num) && num > 0 && num < 10) {
      this.quantity = num;
    }
  }

  onBlurQuantity(event) {
    const num = Number(event.target.value);
    if (Number.isNaN(num) || num < 1 || num > 9) {
      this.quantity = 1;
      event.target.value = this.quantity;
    }
  }

  getAlternative(id) {
    return this.productService.getProductById(id);
  }
}
