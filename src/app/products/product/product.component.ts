import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './product.model';
import { ProductService } from '../products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  quantity = 1;

  @Input() product: Product;

  @HostBinding('class')
  className = 'basic';

  @HostListener('mouseenter')
  onMouseEnter() { this.className = 'highlighted'; }

  @HostListener('mouseleave')
  onMouseLeave() { this.className = 'basic'; }

  @HostListener('click')
  onClick() { this.openProductCard(); }

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {}

  buyProduct(event) {
    event.stopPropagation();    // prevent the host click listener from firing
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
    },
    this.quantity);
  }

  stopPropagation(event) {
    event.stopPropagation();
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

  openProductCard() {
    this.router.navigate([`/product/${this.product.id}`]);
  }
}
