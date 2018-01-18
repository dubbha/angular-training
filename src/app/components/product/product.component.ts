import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../models/product.model';
import { Category } from '../../models/product.enum';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

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
    public productsService: ProductsService,
  ) {}

  ngOnInit() {}

  buyProduct() {
    this.cartService.addToCart(this.product);
  }

  getAlternative(id) {
    return this.productsService.getProductById(id);
  }
}
