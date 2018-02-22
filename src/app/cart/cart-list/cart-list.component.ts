import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../cart.service';
import { LocalStorageService } from '../../core/services';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.sass']
})
export class CartListComponent {

  constructor(
    public cartService: CartService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  clearCart() {
    this.cartService.clear();
  }

  openCheckout() {
    this.router.navigate(['/checkout']);
  }
}
