import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../+store';
import * as RouterActions from './../../+store/actions/router.actions';

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
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
  ) {}

  clearCart() {
    this.cartService.clear();
  }

  openCheckout() {
    this.store.dispatch(new RouterActions.Go({ path: ['/checkout'] }));
  }
}
