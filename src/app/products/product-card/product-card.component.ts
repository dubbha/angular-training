import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../product/product.model';
import { ProductService } from '../products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit {
  product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService.getProductById(+params.id)
        .then(data => this.product = data);
    });
  }

  openProductCard(id) {
    this.router.navigate([`/product/${id}`]);
  }

  backToProducts() {
    this.router.navigate([`/shop`]);
  }

  buyProduct() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
    },
    1);
  }
}
