import { Component, OnInit, Input } from '@angular/core';

import { Product } from './product.model';
import { Category } from './product.enum';
import { ProductService } from './product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  // name: string;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
  ) {}

  ngOnInit() {}

  buyProduct() {
    this.cartService.addToCart(this.product);
  }

  getAlternative(id) {
    return this.productService.getProductById(id);
  }
}
