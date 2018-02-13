import { Component, OnDestroy } from '@angular/core';

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
  ) { }

  clearCart() {
    this.cartService.clear();
    this.localStorageService.removeItem('lastAddedProduct');
  }
}
