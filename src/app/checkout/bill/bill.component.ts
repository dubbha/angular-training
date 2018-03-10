import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../+store';
import * as RouterActions from './../../+store/actions/router.actions';

import { CartService } from '../../cart/cart.service';

@Component({
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.sass']
})
export class BillComponent implements OnInit {
  constructor(
    public cartService: CartService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  nextStep() {
    this.store.dispatch(new RouterActions.Go({ path: ['/checkout/address'] }));
  }
}
